DROP DATABASE IF EXISTS autDB;
CREATE DATABASE IF NOT EXISTS autDB;
USE autDB;

CREATE USER IF NOT EXISTS 'autUser'@'localhost' IDENTIFIED BY 'maninthemoon';
GRANT ALL PRIVILEGES ON autDB.* TO 'autUser'@'localhost';
FLUSH PRIVILEGES;


/* ---- AUT DB #1----- */
/*events - click, mouse, hover, tab, resize, scroll*//* add -- target */
CREATE TABLE IF NOT EXISTS click_table (
	logID INT AUTO_INCREMENT,	
    href TEXT,
	x INT,
	y INT,
	xscroll INT,
	yscroll INT,
	TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (logID)
);

CREATE TABLE IF NOT EXISTS mousemove_table (
	logID INT AUTO_INCREMENT,
	href TEXT,
	mouseX INT,
	mouseY INT,
	TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (logID)
);