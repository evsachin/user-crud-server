create database userDb;
use userDb;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  mobile VARCHAR(15),
  city VARCHAR(100),
  profession VARCHAR(100),
  photo TEXT
);
