import os
import jwt
from datetime import datetime, timedelta
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from fastapi import FastAPI, Depends, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext

import models
from database import engine, Base, get_db, SessionLocal

# Create declarative database tables if they do not exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="BiteDash End-to-End API Backend")

# Setup CORS Policies to allow cross-origin requests from our React development client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- SECURITY & AUTHENTICATION UTILS -----------------

# Password Hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# JWT Parameters
JWT_SECRET = os.getenv("JWT_SECRET", "bitedash-super-secret-key-123456789")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 360 # 6 hours duration

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_access_token(token: str) -> Optional[dict]:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        return None

# Dependency helper to acquire current authenticated user
def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access token is missing or malformed. Please log in."
        )
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session has expired or token is invalid. Please log in again."
        )
    email = payload.get("email")
    db_user = db.query(models.User).filter(models.User.email == email).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authenticated user profile not found."
        )
    return db_user

# ----------------- PYDANTIC VALIDATION SCHEMAS -----------------

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str # 'customer' or 'restaurant'

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    token: str
    name: str
    email: str
    role: str

class MenuItemCreate(BaseModel):
    name: str
    description: str
    price: float
    image: Optional[str] = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"

class OrderItemInput(BaseModel):
    menu_item_id: int
    quantity: int
    price: float

class OrderCreateInput(BaseModel):
    user_email: str
    address: str
    total_price: float
    items: List[OrderItemInput]

class StatusUpdateInput(BaseModel):
    status: str

# ----------------- AUTH ROUTERS -----------------

@app.post("/api/auth/register", status_code=201)
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    # Check if email is already taken
    existing = db.query(models.User).filter(models.User.email == user.email.lower()).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail="An account with this email address already exists."
        )
    
    # Hash password securely
    hashed_pwd = hash_password(user.password)
    
    # Insert new user record
    new_user = models.User(
        name=user.name,
        email=user.email.lower(),
        password_hash=hashed_pwd,
        role=user.role.lower()
    )
    db.add(new_user)
    db.commit()
    return {"message": "Account created successfully."}

@app.post("/api/auth/login", response_model=TokenResponse)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email.lower()).first()
    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Invalid email credentials or password."
        )
    
    # Generate signed JWT
    token_payload = {
        "email": db_user.email,
        "name": db_user.name,
        "role": db_user.role
    }
    jwt_token = create_access_token(token_payload)
    
    return {
        "token": jwt_token,
        "name": db_user.name,
        "email": db_user.email,
        "role": db_user.role
    }

# ----------------- RESTAURANT & CRUD MENU ROUTERS -----------------

@app.get("/api/restaurants")
def get_restaurants(db: Session = Depends(get_db)):
    restaurants = db.query(models.Restaurant).all()
    # Serialize decimal objects to float for JSON output compatibility
    return [
        {
            "id": r.id,
            "name": r.name,
            "category": r.category,
            "rating": float(r.rating),
            "reviews": r.reviews,
            "time": r.time,
            "image": r.image,
            "tag": r.tag
        }
        for r in restaurants
    ]

@app.get("/api/restaurants/{id}/menu")
def get_menu_items(id: int, db: Session = Depends(get_db)):
    menu_items = db.query(models.MenuItem).filter(models.MenuItem.restaurant_id == id).all()
    return [
        {
            "id": item.id,
            "name": item.name,
            "description": item.description,
            "price": float(item.price),
            "image": item.image
        }
        for item in menu_items
    ]

@app.post("/api/restaurants/{id}/menu", status_code=201)
def add_menu_item(id: int, item: MenuItemCreate, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=403,
            detail="Permission denied. Only Restaurant Partners can list menu items."
        )
    
    # Create menu item
    db_item = models.MenuItem(
        restaurant_id=id,
        name=item.name,
        description=item.description,
        price=Decimal(str(item.price)),
        image=item.image
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    
    return {
        "id": db_item.id,
        "name": db_item.name,
        "description": db_item.description,
        "price": float(db_item.price),
        "image": db_item.image
    }

@app.put("/api/menu-items/{item_id}")
def update_menu_item(item_id: int, item: MenuItemCreate, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=403,
            detail="Permission denied. Only Restaurant Partners can modify menu items."
        )
    
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Menu item not found.")
        
    db_item.name = item.name
    db_item.description = item.description
    db_item.price = Decimal(str(item.price))
    if item.image:
        db_item.image = item.image
        
    db.commit()
    return {
        "id": db_item.id,
        "name": db_item.name,
        "description": db_item.description,
        "price": float(db_item.price),
        "image": db_item.image
    }

@app.delete("/api/menu-items/{item_id}")
def delete_menu_item(item_id: int, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=403,
            detail="Permission denied. Only Restaurant Partners can delete menu items."
        )
        
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Menu item not found.")
        
    db.delete(db_item)
    db.commit()
    return {"message": "Menu item deleted successfully."}

# ----------------- TRANSACTING ORDERS ROUTERS -----------------

@app.post("/api/orders", status_code=201)
def place_order(order_input: OrderCreateInput, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "customer":
        raise HTTPException(
            status_code=403,
            detail="Permission denied. Only Customers can submit checkouts."
        )
    
    if not order_input.items:
        raise HTTPException(status_code=400, detail="Cannot place empty order.")

    try:
        # Create master Order record inside transaction
        db_order = models.Order(
            user_email=order_input.user_email.lower(),
            total_price=Decimal(str(order_input.total_price)),
            address=order_input.address,
            status="Pending"
        )
        db.add(db_order)
        db.flush() # Flushes order to get auto-incremented order ID
        
        # Add all individual purchased dishes
        for item in order_input.items:
            db_item = models.OrderItem(
                order_id=db_order.id,
                menu_item_id=item.menu_item_id,
                quantity=item.quantity,
                price=Decimal(str(item.price))
            )
            db.add(db_item)
            
        db.commit()
        return {
            "order_id": db_order.id,
            "status": db_order.status,
            "message": "Order processed successfully."
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while placing order: {str(e)}"
        )

@app.get("/api/orders/{order_id}")
def get_order_details(order_id: int, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found.")
        
    # Authorization checks: customers see their own, merchants see all
    if current_user.role == "customer" and db_order.user_email.lower() != current_user.email.lower():
        raise HTTPException(status_code=403, detail="Access denied.")
        
    items = []
    for item in db_order.order_items:
        m_item = db.query(models.MenuItem).filter(models.MenuItem.id == item.menu_item_id).first()
        items.append({
            "name": m_item.name if m_item else "Unknown Dish",
            "quantity": item.quantity,
            "price": float(item.price)
        })
        
    return {
        "id": db_order.id,
        "user_email": db_order.user_email,
        "total_price": float(db_order.total_price),
        "address": db_order.address,
        "status": db_order.status,
        "created_at": db_order.created_at.isoformat(),
        "items": items
    }

@app.get("/api/restaurants/{id}/orders")
def get_restaurant_orders(id: int, status_filter: Optional[str] = "Pending", current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=403,
            detail="Permission denied. Only Restaurant Partners can fetch fulfillment requests."
        )

    # Performance relational query: joins Order, OrderItem, and MenuItem to gather orders that match store id
    query = db.query(models.Order).join(models.OrderItem).join(models.MenuItem).filter(
        models.MenuItem.restaurant_id == id
    )
    
    if status_filter:
        query = query.filter(models.Order.status == status_filter)
        
    orders = query.distinct().all()
    
    result = []
    for order in orders:
        items = []
        for o_item in order.order_items:
            # Filter item rows belonging to THIS restaurant ID
            m_item = db.query(models.MenuItem).filter(
                models.MenuItem.id == o_item.menu_item_id, 
                models.MenuItem.restaurant_id == id
            ).first()
            if m_item:
                items.append({
                    "name": m_item.name,
                    "quantity": o_item.quantity,
                    "price": float(o_item.price)
                })
        
        result.append({
            "id": order.id,
            "user_email": order.user_email,
            "total_price": float(order.total_price),
            "address": order.address,
            "status": order.status,
            "created_at": order.created_at.isoformat(),
            "items": items
        })
        
    return result

@app.put("/api/orders/{order_id}/status")
def update_order_status(order_id: int, status_input: StatusUpdateInput, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=403,
            detail="Permission denied. Only Restaurant Partners can update order fulfillment states."
        )
        
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order ticket not found.")
        
    # Set status
    db_order.status = status_input.status
    db.commit()
    
    return {
        "order_id": db_order.id,
        "status": db_order.status,
        "message": "Fulfillment status updated."
    }

# ----------------- DB AUTO SEEDING ROUTINE -----------------

@app.on_event("startup")
def seed_initial_data():
    db = SessionLocal()
    try:
        # 1. Seed default users
        user_count = db.query(models.User).count()
        if user_count == 0:
            default_customer = models.User(
                name="Jane Customer",
                email="customer@bitedash.com",
                password_hash=hash_password("password123"),
                role="customer"
            )
            default_restaurant = models.User(
                name="Chef Napoli Partner",
                email="partner@bitedash.com",
                password_hash=hash_password("password123"),
                role="restaurant"
            )
            db.add(default_customer)
            db.add(default_restaurant)
            db.commit()
            print("✓ Default auth users seeded: customer@bitedash.com / partner@bitedash.com")

        # 2. Seed Restaurants
        rest_count = db.query(models.Restaurant).count()
        if rest_count == 0:
            restaurants_data = [
                {
                    "name": "Pizzeria Napoli",
                    "category": "Pizza & Italian",
                    "rating": 4.9,
                    "reviews": 142,
                    "time": "15-20 min",
                    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
                    "tag": "Trending"
                },
                {
                    "name": "Sushi Sakura",
                    "category": "Japanese & Sushi",
                    "rating": 4.8,
                    "reviews": 118,
                    "time": "25-30 min",
                    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
                    "tag": "Chef Choice"
                },
                {
                    "name": "Burger & Co.",
                    "category": "Burgers & Fast Food",
                    "rating": 4.7,
                    "reviews": 198,
                    "time": "20-25 min",
                    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
                    "tag": "Popular"
                },
                {
                    "name": "Green Garden",
                    "category": "Healthy & Salads",
                    "rating": 4.6,
                    "reviews": 82,
                    "time": "10-15 min",
                    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
                    "tag": "Diet Friendly"
                },
                {
                    "name": "Taco Fiesta",
                    "category": "Mexican & Taco",
                    "rating": 4.7,
                    "reviews": 64,
                    "time": "15-25 min",
                    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
                    "tag": "New Store"
                },
                {
                    "name": "La Pâtisserie",
                    "category": "Desserts & Pastry",
                    "rating": 4.9,
                    "reviews": 210,
                    "time": "10-20 min",
                    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
                    "tag": "Sweet Delight"
                }
            ]
            for rest in restaurants_data:
                db_rest = models.Restaurant(
                    name=rest["name"],
                    category=rest["category"],
                    rating=Decimal(str(rest["rating"])),
                    reviews=rest["reviews"],
                    time=rest["time"],
                    image=rest["image"],
                    tag=rest["tag"]
                )
                db.add(db_rest)
            db.commit()
            print("✓ Default stores seeded in table.")

            # 3. Seed Menu Items for each Restaurant
            menu_items_data = {
                1: [
                    {"name": "Gourmet Margherita Pizza", "description": "Hand-stretched crust, premium local mozzarella, fresh organic basil leaves, and a drizzle of olive oil.", "price": 12.99, "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"},
                    {"name": "Pepperoni Feast Pizza", "description": "Thickly sliced pepperoni, smoky salami, mozzarella, and dynamic tomato reduction sauce.", "price": 14.50, "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"},
                    {"name": "White Truffle & Mushroom", "description": "Wild portobello mushrooms, garlic ricotta cream base, fresh rosemary, and premium white truffle oil drizzle.", "price": 16.99, "image": "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=600&q=80"}
                ],
                2: [
                    {"name": "Dragon Sushi Roll", "description": "Tempura shrimp and crab stick, topped with premium avocado, unagi eel sauce, and spicy kewpie mayo.", "price": 18.50, "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"},
                    {"name": "Salmon Nigiri Deluxe", "description": "6 pieces of premium sashimi-grade Atlantic salmon over seasoned sushi rice with wasabi paste.", "price": 15.00, "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80"}
                ],
                3: [
                    {"name": "Gourmet Truffle Burger", "description": "Wagyu beef patty, fontina cheese, caramelized onions, wild mushrooms, and truffle aioli on a brioche bun.", "price": 14.99, "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"},
                    {"name": "Crispy Bacon Cheeseburger", "description": "Flame-grilled beef patty, double cheddar, applewood smoked bacon, lettuce, tomato, and secret burger sauce.", "price": 15.50, "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"}
                ],
                4: [
                    {"name": "Avocado Crunch Salad", "description": "Shredded kale, baby spinach, roasted chickpeas, Hass avocado slices, and honey dijon mustard vinaigrette.", "price": 11.25, "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"},
                    {"name": "Quinoa Energy Bowl", "description": "Organic red quinoa, cucumber, cherry tomatoes, black beans, sweet potatoes, and tahini lime drizzle.", "price": 12.99, "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"}
                ],
                5: [
                    {"name": "Beef Birria Tacos", "description": "Three slow-braised beef tacos in corn shells, toasted with cheese, onion, cilantro, and warm consommé dip.", "price": 12.50, "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"},
                    {"name": "Chicken Fajita Taco", "description": "Sautéed chicken breast, bell peppers, onions, shredded cheddar, and fresh avocado salsa on soft flour tortilla.", "price": 10.99, "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80"}
                ],
                6: [
                    {"name": "Chocolate Fudge Dream Cake", "description": "Rich layers of dark chocolate sponge cake filled and iced with smooth, premium Belgian chocolate fudge.", "price": 8.99, "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"},
                    {"name": "French Vanilla Macarons", "description": "Box of 6 vanilla-bean cream filled almond shell macarons dusted with premium powdered sugar.", "price": 11.50, "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"}
                ]
            }
            
            for rest_id, items in menu_items_data.items():
                for item in items:
                    db_item = models.MenuItem(
                        restaurant_id=rest_id,
                        name=item["name"],
                        description=item["description"],
                        price=Decimal(str(item["price"])),
                        image=item["image"]
                    )
                    db.add(db_item)
            db.commit()
            print("✓ Default menu items seeded successfully.")
            
    except Exception as e:
        print(f"Error seeding database: {e}")
    finally:
        db.close()
