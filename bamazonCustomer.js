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
  display();
});

// display all products

function display(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log(consoleTable.print(results))

    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Please Enter ID of the product You would like to buy"
          },
          {
            name: "quantity",
            type: "input",
            message: "Please Enter quantity You would like to buy"
          }
    ]).then (function(values){
        var id = values.id;
        var quantity = values.quantity;
       
        var query = "select * from products where item_id ="+ id;
        connection.query(query,function(err,results){ 
            if (err) throw err;
       if(quantity <= results[0].stock_quantity){
           var  product_Sales=results[0].product_sales;
           product_Sales +=   results[0].price * quantity;
            quantity = results[0].stock_quantity - quantity;
            

          updateProducts(id,quantity,product_Sales);
       }
       else
       console.log("Insufficient quantity!");
       connection.end();
    })
      
    })
})

}

// function to update stock quantities

function updateProducts(id,quantity,product_Sales){
 
    connection.query("update products set stock_quantity = ?, product_sales = ? where item_id =  ?",[
        quantity, 
        product_Sales,
        id
    ],function(error) {
        if (error) throw err;
        console.log("Quantity updated successfully!");
    })
        
}