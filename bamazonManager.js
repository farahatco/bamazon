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

connection.connect(function(err) {
  if (err) throw err;
inquirer.prompt([
    {
        name: "option",
        type: "list",
        message: "List a set of menu options:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        
      }
    
]).then (function(options){
    var option = options.option;
    switch (option)
    {
        case "View Products for Sale":
        connection.query("SELECT * FROM products", function(err, results) {
            if (err) throw err;
            console.log(consoleTable.print(results));
               
                    connection.end();
                })    
        break;
        case "View Low Inventory":
        connection.query("SELECT * FROM products where stock_quantity < 5 ", function(err, results) {
            if (err) throw err;
                   
                    if(productArray.length===0){
                      console.log("We are good No need more inventry...");
                      connection.end();
                    }
                    else{
                      console.log(consoleTable.print(results))
                      connection.end();
                    }
                })    
    
        break;
        case "Add to Inventory":
        inquirer.prompt([
          {
              name: "item_id",
              type: "input",
              message: "Please enter Item ID:"
            },
            {
              name: "stock_quantity",
              type: "input",
              message: "Please Enter product quantity"
            }
           ]) .then(function(answer) {
            connection.query("SELECT * FROM products where item_id = ? ",[answer.item_id],
            function(err,result)
            {
             if(err) throw err;
             var newQuantity = parseInt(result[0].stock_quantity) + parseInt(answer.stock_quantity);
            
              connection.query(
               "update products set  ?  where ? ",[
                  
                  {stock_quantity : newQuantity},
                  {item_id : answer.item_id}
                ]),
                function(err) {
                  if (err) throw err;
                              
                }
                console.log("Your product Quantity was Updated successfully!");   
                connection.end();
              })
            });
 
        break;
        case "Add New Product":
        inquirer.prompt([
          {
              name: "product_name",
              type: "input",
              message: "Please enter product name:"
            },
            {
              name: "department_id",
              type: "input",
              message: "Please enter product depart ID:"
            },
            {
              name: "price",
              type: "input",
              message: "Please Enter product price:"
            },
            {
              name: "stock_quantity",
              type: "input",
              message: "Please Enter product quantity"
            }
           ]).then(function(answer) {

              connection.query(
                "INSERT INTO products SET ?",
                {
                  product_name: answer.product_name,
                  department_id: answer.department_id,
                  price: answer.price,
                  stock_quantity: answer.stock_quantity,
                  product_sales:0
                },
                function(err) {
                  if (err) throw err;
                  console.log("Your product Information was Added successfully!");
                  connection.end();
                  
                }
              )
            });
            
        break;
        
    }
    
})
  
});

