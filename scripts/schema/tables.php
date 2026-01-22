<?php
// scripts/schema/tables.php

if (!defined('APP_INIT')) {
    http_response_code(403);
    exit('Forbidden');
}

return [

    'branches' => "
        CREATE TABLE IF NOT EXISTS branches (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            location VARCHAR(150),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ",

    'users' => "
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,

            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            phone VARCHAR(20) UNIQUE NOT NULL,

            password VARCHAR(255) NOT NULL,
            pin VARCHAR(255) NOT NULL,

            status ENUM('inactive','active','suspended') DEFAULT 'inactive',
            role ENUM('admin','cashier','manager','stockist','pending','superadmin') DEFAULT 'pending',

            profile_url VARCHAR(255) DEFAULT NULL,
            branch_id INT DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            UNIQUE KEY uq_username (username),
            UNIQUE KEY uq_phone (phone),

            FOREIGN KEY (branch_id) REFERENCES branches(id)
                ON DELETE SET NULL
                ON UPDATE CASCADE
        )
    ",

    'company' => "
        CREATE TABLE IF NOT EXISTS company (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150),
            phone VARCHAR(30),
            email VARCHAR(100),
            address TEXT,
            receipt_footer TEXT
        )
    ",

    'products' => "
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            branch_id INT NOT NULL,
            name VARCHAR(150) NOT NULL,
            sku VARCHAR(50) UNIQUE,
            cost_price DECIMAL(10,2),
            selling_price DECIMAL(10,2),
            stock INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (branch_id) REFERENCES branches(id)
        )
    ",

    'sales' => "
        CREATE TABLE IF NOT EXISTS sales (
            id INT AUTO_INCREMENT PRIMARY KEY,
            branch_id INT,
            user_id INT,
            total DECIMAL(10,2),
            payment_method VARCHAR(30),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (branch_id) REFERENCES branches(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    ",

    'sale_items' => "
        CREATE TABLE IF NOT EXISTS sale_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            sale_id INT,
            product_id INT,
            quantity INT,
            price DECIMAL(10,2),
            FOREIGN KEY (sale_id) REFERENCES sales(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    ",

    'coupons' => "
        CREATE TABLE IF NOT EXISTS coupons (
            id INT AUTO_INCREMENT PRIMARY KEY,
            code VARCHAR(50) UNIQUE,
            discount DECIMAL(5,2),
            expires_at DATE
        )
    ",

    'daily_revenue' => "
        CREATE TABLE IF NOT EXISTS daily_revenue (
            id INT AUTO_INCREMENT PRIMARY KEY,
            branch_id INT,
            date DATE,
            total DECIMAL(10,2),
            UNIQUE(branch_id, date),
            FOREIGN KEY (branch_id) REFERENCES branches(id)
        )
    ",

    'orders' => "
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            supplier VARCHAR(150),
            total DECIMAL(10,2),
            status ENUM('pending','received') DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    "
];
