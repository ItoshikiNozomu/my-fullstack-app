CREATE TABLE users (
    userId varchar(255) primary key,
    userName varchar(255) unique,
    mobile varchar(255),
    pwdHash varchar(255),
    pwdSalt varchar(255),
    createAt datetime(3)
);