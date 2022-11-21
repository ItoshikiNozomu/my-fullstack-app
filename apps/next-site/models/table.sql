SELECT 'CREATE DATABASE my_app' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'my_app')\gexec
CREATE TABLE users (
    user_id varchar(255) primary key,
    user_name varchar(255) unique,
    mobile varchar(255),
    pwd_hash varchar(255),
    pwd_salt varchar(255),
    create_at timestamp
);

CREATE TABLE users (
    user_id varchar(255) primary key,
    user_name varchar(255) unique,
    mobile varchar(255),
    pwd_hash varchar(255),
    pwd_salt varchar(255),
    create_at timestamp
);

CREATE TABLE user_file (
    file_name varchar(255)primary key,
    user_id varchar(255) ,
    file_url varchar(255),
    uploaded_at timestamp,
    file_desc varchar(255)
    
);

create TABLE user_post(
    post_id VARCHAR(255) primary key,
    author_user_id varchar(255),
    create_date timestamp,
    title varchar(100),
    rich_text_content text,
    last_mod_date timestamp,
    visibility smallint
    
);