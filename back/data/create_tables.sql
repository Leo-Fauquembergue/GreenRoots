-- Drop tables in the correct order to respect foreign key constraints
DROP TABLE IF EXISTS tracking;
DROP TABLE IF EXISTS planted_tree;
DROP TABLE IF EXISTS order;
DROP TABLE IF EXISTS catalog_tree;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS region;
DROP TABLE IF EXISTS user;

-- Begin transaction
BEGIN;

-- USER table
CREATE TABLE user (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ORDER table
CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    order_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'pending',
    user_id INTEGER REFERENCES "user"(user_id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- REGION table
CREATE TABLE region (
    region_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- CATEGORY table
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- CATALOG_TREE table
CREATE TABLE catalog_tree (
    catalog_tree_id SERIAL PRIMARY KEY,
    common_name TEXT NOT NULL,
    scientific_name TEXT NOT NULL,
    description TEXT,
    adult_height NUMERIC(5,2),
    image TEXT,
    price NUMERIC(10,2),
    category_id INTEGER REFERENCES category(category_id),
    region_id INTEGER REFERENCES region(region_id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- PLANTED_TREE table
CREATE TABLE planted_tree (
    planted_tree_id SERIAL PRIMARY KEY,
    personal_name TEXT,
    planting_date DATE,
    planting_place TEXT,
    catalog_tree_id INTEGER REFERENCES catalog_tree(catalog_tree_id),
    order_id INTEGER REFERENCES order(order_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- TRACKING table
CREATE TABLE tracking (
    tracking_id SERIAL PRIMARY KEY,
    statement_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    condition TEXT,
    current_height NUMERIC(5,2),
    current_picture TEXT,
    planted_tree_id INTEGER REFERENCES planted_tree(planted_tree_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Commit transaction
COMMIT;