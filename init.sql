CREATE DATABASE test;

\c test;

CREATE TABLE my_table (
	id SERIAL PRIMARY KEY,
	name VARCHAR(256)
);

INSERT INTO my_table (name) VALUES ('Felipe');


