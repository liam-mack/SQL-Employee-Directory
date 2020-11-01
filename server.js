const mysql = require("mysql");
const inquirer = require("inquirer");
require('dotenv').config();

const {home, newEmployee, newRole, newDepartment} = require("./prompts")

let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_Pass,
        database: "employee_trackerDB"
    })
}


connection.connect((err) => {
    if (err) throw err;

    init();
})

init = () => {
    inquirer.
    prompt(home)
    .then((ans) => {
        console.log(ans.home)
        switch (ans.home) {
            case "View Departments":
                viewDepartments();
                break;
            
            case "View Employees":
                viewEmployees();
                break;

            case "View Roles":
                viewRoles();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Employee":
                addEmployee();
                break;
            
            case "Add Role":
                addRole();
                break;

            case "Update Roles":
                updateRole();
                break;

            case "End Program":
                console.log("Thank you for using MySQL Employee Tracker!")
                connection.end();
                break;
        }
    });
}

viewDepartments = () => {
    let query = "SELECT * FROM department"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

viewEmployees = () => {
    console.log("commence");
    let query = "SELECT employee.id, first_name, last_name, role.title, role.salary, department.name, manager_id from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

viewRoles = () => {
    let query = "SELECT * FROM role"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

addDepartment = () => {
    inquirer.prompt(newDepartment).then(
        (input) => {
            connection.query("INSERT INTO department set ?",
            {name: input.title},
            (err, res) => {
                if (err) throw err;
                console.log(res);
                console.log(`${input.name} department successfully added.`);
                init();
            });
        }
    );
}

addEmployee = () => {
    inquirer.prompt(newEmployee).then((input) => {
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: input.firstName,
            last_name: input.lastName,
            role_id: input.role,
            manager_id: input.manager
        },
        (err,res) => {
            if (err) throw err;
            console.log(res);
            console.log(`Entry for ${input.firstName} successfully added.`);
            init();
        });
    })
}

addRole = () => {
    inquirer.prompt(newRole).then((input) => {
        connection.query("INSERT INTO role SET ?",
        {
            title: input.title,
            salary: input.salary,
            department_id: input.department
        },
        (err, res) => {
            if (err) throw err
            console.log(res);
            console.log(`${input.title} role successfully added.`)
        })
    })
}

updateRole = () => {
    connection.query("SELECT * FROM employee", (err, res) => {
        // console.log(res)
        if (err) throw err;
        employees = [];
        res.forEach(element => employees.push(element.first_name))
        inquirer.prompt([
            {
                name: "name",
                type: "list",
                message: "Which employee needs to have their role changed?",
                choices: employees
            },
            {
                name: "newRole",
                type: "input",
                message: "Please enter their new role ID#: "
            }
        ]).then((input) => {
            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: input.newRole
                    },
                    {
                        first_name: input.name
                    }
                ],
                (err) => {
                    if (err) throw err;
                    console.log(`${input.name}'s role was update successfully.`);
                    init();
                }
            )
        });
    });
}
