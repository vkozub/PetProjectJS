-- Query #1:

SELECT id, name, surname FROM users WHERE country='MT';

-- expected result: 
-- id, name, surname
-- 3   Jane  Smith
-- 12  John  Jones


-- Query #2:

SELECT id, name, surname FROM users WHERE country NOT IN ('PT', 'FR');

-- expected result: 
-- id,  name,   surname
-- 1	John	Doe
-- 2	Mary	Fraser
-- 3	Jane	Smith
-- 12	John	Jones
-- 13	Peter	Williams
-- 21	Kate	Davies
-- 35	Joe	    Thames
-- 37	Michael	Wilson

-- Query #3:

-- using Inner Join
SELECT users.id, name, surname FROM users INNER JOIN users_creds ON users.id=users_creds.id;

-- or using Right Join
SELECT users.id, name, surname FROM users RIGHT JOIN users_creds ON users.id=users_creds.id;

-- expected result: 
-- id,  name,   surname
-- 1	John	Doe
-- 12	John	Jones
-- 13	Peter	Williams
-- 35	Joe	    Thames

-- Query #4:

-- using Inner Join
SELECT name, surname, email FROM users INNER JOIN users_creds ON users.id=users_creds.id WHERE required_reset_password>0;

-- or using Right Join
SELECT name, surname, email FROM users RIGHT JOIN users_creds ON users.id=users_creds.id WHERE required_reset_password>0;

-- expected result: 
-- name	    surname	    email
-- Peter	Williams	p.w@vs.com
-- Joe	    Thames	    j.t@vs.com
