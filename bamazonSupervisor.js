var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require('easy-table');
var keys = require("./connectionParam.js");

// Mysql database connection
var connection = mysql.createConnection({
  host: keys.connection.host,
  port: keys.connection.port,
  user: keys.connection.user,
  password: keys.connection.password,
  database: keys.connection.database
});

connection.connect(function (err) {
  if (err) throw err;

  inquirer.prompt([
    {
      name: "option",
      type: "list",
      message: "List a set of menu options:",
      choices: ["View Product Sales by Department", "Create New Department"]

    }

  ]).then(function (options) {
    var option = options.option;
    switch (option) {
      case "View Product Sales by Department":
        var superVisorQuery = " select p.department_id AS department_id,d.department_name AS Department," +
          "d.over_head_costs AS over_head_costs,p.product_sales as product_sales, " +
          "p.product_sales - d.over_head_costs as  total_profit " +
          " from products p , departments d    where p.department_id = d.department_id  group by d.department_id";

        connection.query(superVisorQuery, function (err, results) {
          if (err) throw err;
          console.log(consoleTable.print(results))
          connection.end();
        })
        break;
      case "Create New Department":
        inquirer.prompt([
          {
            name: "department_name",
            type: "input",
            message: "Please enter Department name:"
          },
          {
            name: "over_head_costs",
            type: "input",
            message: "Please enter product over head cost:"
          }

        ]).then(function (answer) {
          connection.query(
            "INSERT INTO departments SET ?",
            {
              department_name: answer.department_name,
              over_head_costs: answer.over_head_costs
            },
            function (err) {
              if (err) throw err;
              console.log("Your Departments Information was Added successfully!");
              connection.end();
            }
          )
        });
        break;
    }
  });
});
