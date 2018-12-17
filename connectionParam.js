require("dotenv").config();
require("./.env");
var connection = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,

};

module.exports = {
connection: connection
};  