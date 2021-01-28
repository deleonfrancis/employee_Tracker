const inquirer = require("inquirer");
const connection = require("./db/connection");

require("console.table")

// Require ascii art for the logo in the prompt. 
const logo = require('asciiart-logo');

// const mysql = require("mysql");

begin();

// function that displays the logo and prompts the user for what action they should take
function begin () {
    // displays the logo
    const logoText = logo({ name: "EMS" }).render();
    console.log(logoText);
    
    // prompts the user for what action they should take
    start();

    function start() {
        inquirer
          .prompt({
            name: "action",
            type: "list",
            message: "Would you like to do?",
            choices: [
              "View All Employees",
              "View All Employees By Department",
              "View All Employees By Manager",
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
              case "View All Employees By Department":
                return vEmployeesByDepart();
                break;
              case "View All Employees By Manager":
                return vEmployeesByManager();
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
}

function viewEmployees() {
console.log("view Employees function.");
// this query will select * from employees table.
    
}

function vEmployeesByDepart() {
// will view the department in the data base
    
}

function vEmployeesByManager() {
    
}

function addEmployee() {
    
}

function removeEmployee() {
    
}

function upEmployeeRole () {
    
}

function upManagerRole() {
    
}