DROP DATABASE IF EXISTS autDB;
CREATE DATABASE IF NOT EXISTS autDB;
USE autDB;

CREATE USER IF NOT EXISTS 'autUser'@'localhost' IDENTIFIED BY 'maninthemoon';
GRANT ALL PRIVILEGES ON autDB.* TO 'autUser'@'localhost';
FLUSH PRIVILEGES;


/* ---- AUT DB #1----- */
CREATE TABLE IF NOT EXISTS browser_table (
	logID BIGINT UNSIGNED AUTO_INCREMENT ,
	href TEXT,
	appCodeName TEXT,
	userAgent TEXT,
    ww SMALLINT UNSIGNED,
	wh SMALLINT UNSIGNED,
    sw SMALLINT UNSIGNED,
	sh SMALLINT UNSIGNED,
	TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (logID)
);

CREATE TABLE IF NOT EXISTS resize_table (
	logID BIGINT UNSIGNED AUTO_INCREMENT,
	href TEXT,
    wwStart SMALLINT UNSIGNED,
	whStart SMALLINT UNSIGNED,
    wwNew SMALLINT UNSIGNED,
	whNew SMALLINT UNSIGNED,
    sw SMALLINT UNSIGNED,
	sh SMALLINT UNSIGNED,
	TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (logID)
);

CREATE TABLE IF NOT EXISTS click_table (		
	logID BIGINT UNSIGNED AUTO_INCREMENT,	
    href TEXT,
	pageX SMALLINT UNSIGNED,
	pageY SMALLINT UNSIGNED,
    id VARCHAR(40),
    target VARCHAR(40),
    ww SMALLINT UNSIGNED,
	wh SMALLINT UNSIGNED,
	TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (logID)
);

CREATE TABLE IF NOT EXISTS tabing_table (
	logID BIGINT UNSIGNED AUTO_INCREMENT,
	href TEXT,
    tabs TINYINT UNSIGNED,
	TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (logID)
);
CREATE TABLE IF NOT EXISTS enter_table (
	logID BIGINT UNSIGNED AUTO_INCREMENT,
	href TEXT,
    enters TINYINT UNSIGNED,
	TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (logID)
);

CREATE TABLE IF NOT EXISTS mousemove_table (
	logID BIGINT UNSIGNED AUTO_INCREMENT,
	href TEXT,
	mouseX SMALLINT UNSIGNED,
	mouseY SMALLINT UNSIGNED,
    ww SMALLINT UNSIGNED,
	wh SMALLINT UNSIGNED,
	TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (logID)
);

CREATE TABLE IF NOT EXISTS hover_table (
	logID BIGINT UNSIGNED AUTO_INCREMENT,
	href TEXT,
	targetID VARCHAR(40),
    targetText VARCHAR(40),
	hoverTime MEDIUMINT UNSIGNED,
	TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (logID)
);

CREATE TABLE IF NOT EXISTS scroll_table (
	logID BIGINT UNSIGNED AUTO_INCREMENT,	
    href TEXT,
	scrollY SMALLINT UNSIGNED,
	scrolls TINYINT UNSIGNED,
	TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (logID)
);
