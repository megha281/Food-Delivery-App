from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(30), nullable=False, default="customer") # 'customer' or 'restaurant'
    created_at = Column(DateTime, default=datetime.utcnow)

class Restaurant(Base):
    __tablename__ = "restaurants"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    category = Column(String(100), nullable=False)
    rating = Column(Numeric(3, 2), nullable=False, default=5.00)
    reviews = Column(Integer, nullable=False, default=0)
    time = Column(String(50), nullable=False)
    image = Column(Text, nullable=False)
    tag = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Establish dynamic list relations to MenuItems
    items = relationship("MenuItem", back_populates="restaurant", cascade="all, delete-orphan")

class MenuItem(Base):
    __tablename__ = "menu_items"
    
    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    image = Column(Text, nullable=False)
    
    # Back-populates configuration to the parent store
    restaurant = relationship("Restaurant", back_populates="items")

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String(150), nullable=False)
    total_price = Column(Numeric(10, 2), nullable=False)
    address = Column(Text, nullable=False)
    status = Column(String(50), nullable=False, default="Pending") # 'Pending', 'Preparing', 'Delivering', 'Delivered', 'Rejected'
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # List relations to OrderItems
    order_items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    menu_item_id = Column(Integer, ForeignKey("menu_items.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    price = Column(Numeric(10, 2), nullable=False)
    
    # Relationship links
    order = relationship("Order", back_populates="order_items")
    menu_item = relationship("MenuItem")
