// validate: (value) => {
//     if (isNaN(value) === false && value.isInteger === true ){
//         return true;
//     } return false;
// }

const home = [
    {
        name: "home",
        type: "list",
        message: "Please select an action: ",
        choices: [
            "View Departments",
            "View Employees",
            "View Roles",
            "Add Department",
            "Add Employee",
            "Add Role",
            "Update Roles",
            "End Program"
        ]
    }
]

const newEmployee = [
    {
        name: "firstName",
        type: "input",
        message: "Enter employee's first name: ",

    },
    {
        name: "lastName",
        type: "input",
        message: "Enter employee's last name: ",
    },
    {
        name: "role",
        type: "input",
        message: "Enter employee's role ID#: "
    },
    {
        name: "manager",
        type: "input",
        message: "If they have a manager, enter their ID#"
    }
]

const newRole = [
    {
        name: "title",
        type: "input",
        message: "What is the name of the new position?"
    },
    {
        name: "salary",
        type: "input",
        message: "What is the position's respective salary?"
    },
    {
        name: "department",
        type: "input",
        message: "What is the position's department ID?"

    }
]

const newDepartment = [
    {
        name: "title",
        type: "input",
        message: "What is the name of the new department?"
    }
]


module.exports = {home, newEmployee, newRole, newDepartment}