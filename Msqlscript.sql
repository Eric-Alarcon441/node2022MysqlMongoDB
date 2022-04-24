CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name varchar(50),
  email varchar(50),
  password varchar(50),
  role ENUM('user', 'admin'),
  age INT,
  createdAt datetime,
  updatedAt datetime
);
CREATE table tracks(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name varchar(50),
  album varchar(50),
  cover varchar(50),
  artist_name varchar(50),
  artist_nickname varchar(50),
  artist_nationality varchar(50),
  duration_start INT,
  duration_end INT,
  mediaId INT,
  createdAt datetime,
  updatedAt datetime
);
CREATE TABLE storages(
  id INT AUTO_INCREMENT PRIMARY KEY,
  url mediumtext,
  filename mediumtext,
  createdAt datetime,
  updatedAt datetime
);