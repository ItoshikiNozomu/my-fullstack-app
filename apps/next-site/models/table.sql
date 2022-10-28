SELECT 'CREATE DATABASE my_app' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'my_app')\gexec
CREATE TABLE users (
    user_id varchar(255) primary key,
    user_name varchar(255) unique,
    mobile varchar(255),
    pwd_hash varchar(255),
    pwd_salt varchar(255),
    create_at timestamp
);