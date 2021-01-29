const inquirer = require("inquirer");
const connection = require("./db/connection");
// const addEmployee = require("./functions/addEmp");
// const viewEmployees = require("./functions/viewEmps");

// Require ascii art for the logo in the prompt.
const logo = require("asciiart-logo");

// invoking the function that presents the logo and starts the questions
begin();

function startAction() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit",
      ],
      // default: "Exit",
    })
    .then(function (answer) {
      // Run each function based on answer
      switch (answer.action) {
        case "View All Employees":
          return viewEmployees();
          break;
        case "View All Departments":
          return viewDeparts();
          break;
        case "View All Roles":
          return viewRoles();
          break;
        case "Add Employee":
          return addEmployee();
          break;
        case "Remove Employee":
          return removeEmployee();
          break;
        case "Update Employee Role":
          return upEmployeeRole();
          break;
        case "Update Employee Manager":
          return upManagerRole();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          break;
      }
    });
}

// function that displays the logo and prompts the user for what action they should take
function begin() {
  // displays the logo
  const logoText = logo({ name: "Employee Manager" }).render();
  console.log(logoText);

  // prompts the user for what action they should take
  startAction();
}

// ===================================================================================================================================================================================================
// ===================================================================================================================================================================================================

// Start of create all the functions
// ===================================================================================================================================================================================================
// Function for viewing all the employees
function viewEmployees() {
  connection.query(
    "SELECT * FROM employee",
    function (err, listOfEmployees) {
      if (err) throw err;
      console.table(listOfEmployees);
      // console.log("You are in viewEmployees");
      startAction();
    }
  );
}

// ===================================================================================================================================================================================================
// Function for viewing Department
function viewDeparts() {
  connection.query(
    "SELECT * FROM department",
    function (err, listOfDepartments) {
      if (err) throw err;
      console.table(listOfDepartments);
      // console.log("You are in viewEmployees");
      startAction();
    }
  );
}

// ===================================================================================================================================================================================================
function viewRoles() {
  connection.query(
    "SELECT * FROM role",
    function (err, listOfRoles) {
      if (err) throw err;
      console.table(listOfRoles);
      // console.log("You are in viewEmployees");
      startAction();
    }
  );
}

// ===================================================================================================================================================================================================




// Function for adding an employee
function addEmployee() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "addEmpFirst_Name",
          type: "input",
          message: "What is the First Name of yor new employee?",
          //   Check for an input
          validate: function (name) {
            if (!name) {
              console.log("     ...Please enter a name");
              return false;
            } else {
              return true;
            }
          },
        },
        {
          name: "addEmpLast_Name",
          type: "input",
          message: "What is the new employee's Last Name?",
          //   Check for an input
          validate: function (name) {
            if (!name) {
              console.log("     ...Please enter a name");
              return false;
            } else {
              return true;
            }
          },
        },
        {
          name: "addEmpRole",
          type: "list",
          message: "What is the Employee's role?",
          choices: function () {
            var arrayOfRoles = [];
            for (var i = 0; i < results.length; i++) {
              arrayOfRoles.push(results[i].title);
            }
            return arrayOfRoles;
          },
        },
        {
          name: "addManager",
          type: "input",
          message: "Who is the Manger of this employee?",
        },
      ]).then(function (answer) {
        var roleChoice;
        for (var i = 0; i < results.length; i++) {
          if (results[i].title === answer.addEmpRole) {
            roleChoice = results[i].id;
          }
        }
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.addEmpFirst_Name,
            last_name: answer.addEmpLast_Name,
            role_id: roleChoice,
            manager_id: answer.addManager
          },
          function (err) {
            if (err) throw err;
            console.log("You successfully added an employee!");
            // re-prompt the user to the beginning
            startAction();
          }
        );
      });
  });
}
// ===================================================================================================================================================================================================

// function vEmployeesByManager() {
//   console.log("view Employees by Manager function.");
// }

// function removeEmployee() {
//   console.log("remove Employee function.");
// }

// function upEmployeeRole() {
//   console.log("update Employee role function.");
// }

// function upManagerRole() {
//   console.log("update Manager role function.");
// }

// module.exports = start;
