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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ",

    'users' => "
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,

            fname VARCHAR(50),
            sname VARCHAR(50),

            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            phone VARCHAR(20) UNIQUE NOT NULL,

            password VARCHAR(255) NOT NULL,
            pin VARCHAR(255) NOT NULL,

            gender ENUM('female','male','unset') DEFAULT 'unset',

            status ENUM('inactive','active','suspended') DEFAULT 'inactive',
            role ENUM('admin','cashier','manager','stockist','pending','superadmin') DEFAULT 'pending',

            profile_url VARCHAR(255) DEFAULT NULL,
            branch_id INT DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login_at DATETIME DEFAULT NULL,

            UNIQUE KEY uq_username (username),
            UNIQUE KEY uq_phone (phone),

            FOREIGN KEY (branch_id) REFERENCES branches(id)
                ON DELETE SET NULL
                ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ",

    'company' => "
        CREATE TABLE IF NOT EXISTS company (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150),
            phone VARCHAR(30),
            email VARCHAR(100),
            address TEXT,
            receipt_footer TEXT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ",

    'suppliers' => "
        CREATE TABLE IF NOT EXISTS suppliers (
            id              INT AUTO_INCREMENT PRIMARY KEY,
            branch_id       INT NOT NULL,
            name            VARCHAR(150) NOT NULL,
            contact_person  VARCHAR(100) DEFAULT NULL,
            phone           VARCHAR(50) DEFAULT NULL,
            email           VARCHAR(150) DEFAULT NULL,
            address         TEXT DEFAULT NULL,
            tax_id          VARCHAR(50) DEFAULT NULL,
            payment_terms   VARCHAR(100) DEFAULT NULL,
            is_active       TINYINT(1) DEFAULT 1,
            created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            
            UNIQUE KEY uk_name_branch (name, branch_id),
            FOREIGN KEY (branch_id) REFERENCES branches(id)
                ON DELETE RESTRICT
                ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ",

    'products' => "
        CREATE TABLE IF NOT EXISTS products (
            id                  INT AUTO_INCREMENT PRIMARY KEY,
            branch_id           INT NOT NULL,
            category_id         INT DEFAULT NULL,
            code                VARCHAR(50) NOT NULL,
            name                VARCHAR(255) NOT NULL,
            sku                 VARCHAR(50) UNIQUE,
            batch               VARCHAR(100) DEFAULT NULL,
            supplier_id         INT DEFAULT NULL,
            description         TEXT DEFAULT NULL,
            stock               INT DEFAULT 0,
            min_stock           INT DEFAULT 0,
            cost_price          DECIMAL(10,2) NOT NULL DEFAULT 0.00,
            selling_price       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
            unit_price          DECIMAL(10,2) NOT NULL DEFAULT 0.00,
            expiry_date         DATE DEFAULT NULL,
            barcode             VARCHAR(100) DEFAULT NULL,
            qrcode              VARCHAR(255) DEFAULT NULL,
            picture_url         VARCHAR(255) DEFAULT NULL,
            is_active           TINYINT(1) DEFAULT 1,
            created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            
            FOREIGN KEY (branch_id)    REFERENCES branches(id)       ON DELETE RESTRICT ON UPDATE CASCADE,
            -- FOREIGN KEY (category_id)  REFERENCES categories(id)     ON DELETE SET NULL  ON UPDATE CASCADE,  -- commented until categories table is added
            FOREIGN KEY (supplier_id)  REFERENCES suppliers(id)      ON DELETE SET NULL  ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ",

    'sale_items' => "
        CREATE TABLE IF NOT EXISTS sale_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            sale_id INT,
            product_id INT,
            quantity INT,
            price DECIMAL(10,2),
            FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ",

    'coupons' => "
        CREATE TABLE IF NOT EXISTS coupons (
            id INT AUTO_INCREMENT PRIMARY KEY,
            code VARCHAR(50) UNIQUE,
            discount DECIMAL(5,2),
            expires_at DATE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ",

    'daily_revenue' => "
        CREATE TABLE IF NOT EXISTS daily_revenue (
            id INT AUTO_INCREMENT PRIMARY KEY,
            branch_id INT,
            date DATE,
            total DECIMAL(10,2),
            UNIQUE(branch_id, date),
            FOREIGN KEY (branch_id) REFERENCES branches(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ",

    'purchase_orders' => "
        CREATE TABLE IF NOT EXISTS purchase_orders (
            id              INT AUTO_INCREMENT PRIMARY KEY,
            branch_id       INT NOT NULL,
            supplier_id     INT NOT NULL,
            order_date      DATE NOT NULL,
            expected_date   DATE DEFAULT NULL,
            total           DECIMAL(12,2) NOT NULL DEFAULT 0.00,
            status          ENUM('pending', 'ordered', 'received', 'cancelled') DEFAULT 'pending',
            notes           TEXT DEFAULT NULL,
            created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            
            FOREIGN KEY (branch_id)   REFERENCES branches(id)     ON DELETE RESTRICT ON UPDATE CASCADE,
            FOREIGN KEY (supplier_id) REFERENCES suppliers(id)    ON DELETE RESTRICT ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ",

    'purchase_order_items' => "
        CREATE TABLE IF NOT EXISTS purchase_order_items (
            id                  INT AUTO_INCREMENT PRIMARY KEY,
            purchase_order_id   INT NOT NULL,
            product_id          INT NOT NULL,
            quantity_ordered    INT NOT NULL,
            unit_cost           DECIMAL(10,2) NOT NULL,
            subtotal            DECIMAL(12,2) NOT NULL,
            received_quantity   INT DEFAULT 0,
            
            FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id)        REFERENCES products(id)        ON DELETE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    "
];