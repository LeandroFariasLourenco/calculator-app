CREATE TABLE `calculator-app`.operations (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	equation varchar(200) NOT NULL,
	`result` varchar(200) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	CONSTRAINT operations_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=ascii
COLLATE=ascii_general_ci;
