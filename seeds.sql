INSERT INTO department (name)
VALUES ("Development"), ("Sales"), ("Marketing"), ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Developer", 60000, 1),
-- 1
("Senior Developer", 100000, 1),
-- 2
("Sales Rep", 50000, 2),
-- 3
("Customer Rep", 100000, 2),
-- 4
("Advertising", 70000, 3),
-- 5
("Social Media", 70000, 3),
-- 6
("Lead Dev", 150000, 4),
-- 7
("Sales Lead", 150000, 4),
-- 8
("Marketing Lead", 150000, 4);
-- 9

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jim", "Halpert", 8),
("Michael", "Scott", 7),
("Pam", "Beesly", 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Kevin", "Malone", 1, 7),
("Dwight", "Schrute", 2, 7),
("Angela", "Martin", 3, 8),
("Andy", "Bernard", 4, 8),
("Creed", "NaN", 5, 9),
("Kelly", "Kapoor", 5, 9);


SELECT * from employee;