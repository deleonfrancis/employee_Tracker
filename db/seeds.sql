USE employees;
INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineer'),
    ('Finance'),
    ('Legal');
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 60000, 1),
    ('Salesperson', 40000, 1),
    ('Lead Engineer', 120000, 2),
    ('Software Engineer', 70000, 2),
    ('Account Manager', 100000, 3),
    ('Accountant', 60000, 3),
    ('Legal Team Lead', 120000, 4),
    ('Lawyer', 80000, 4);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Mary', 'Cater', 1, NULL),
    ('Mary', 'Jay', 2, 1),
    ('Johnny', 'Cash', 3, NULL),
    ('Mike', 'Green', 4, 3),
    ('Lucas', 'DeBatos', 5, NULL),
    ('Moses', 'Malone', 6, 5),
    ('Kay', 'Lake', 7, NULL),
    ('Lee', 'Waters', 8, 7);