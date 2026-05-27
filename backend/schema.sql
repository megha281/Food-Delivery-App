-- BiteDash Relational MySQL Schema DDL

-- 1. Users Table (Authentication and Role details)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'customer', -- 'customer' or 'restaurant'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Restaurants Table
CREATE TABLE IF NOT EXISTS restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    rating DECIMAL(3, 2) NOT NULL DEFAULT 5.00,
    reviews INT NOT NULL DEFAULT 0,
    time VARCHAR(50) NOT NULL,
    image TEXT NOT NULL,
    tag VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image TEXT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(150) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    address TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- 'Pending', 'Preparing', 'Delivering', 'Delivered', 'Rejected'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Order Items Table (Relational Order-Menu Join)
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);
