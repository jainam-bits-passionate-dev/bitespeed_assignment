const express = require("express");
const database = require('./sqlConnection');
  
const app = express();
  
app.listen(5000, () => {
  console.log(`Server is up and running on 5000 ...`);
});

let databaseName = "jainam_bitespeed_db";

let tableName = "Contact";

app.get("/createDatabase", (req, res) => {

  let createQuery = `CREATE DATABASE ${databaseName}`;

  // use the query to create a Database.
  database.query(createQuery, (err) => {
      if(err) throw err;

      console.log("Database Created Successfully !");
      
      return res.send(`Created ${databaseName} Database`);
  });
});

app.get("/createContactTable", (req, res) => {
  let useDatabaseQuery = `USE ${databaseName}`;

  database.query(useDatabaseQuery, (err) => {
    if(err) throw err;

    console.log(`Using Database ${databaseName}`);
});

  let createTableQuery = `CREATE TABLE ${tableName}(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    phoneNumber varchar(255), 
    email varchar(255), 
    linkedId int, 
    linkPrecedence varchar(255) DEFAULT "primary", 
    createdAt DateTime DEFAULT CURRENT_TIMESTAMP, 
    updatedAt DateTime DEFAULT CURRENT_TIMESTAMP, 
    deletedAt DateTime
  )`;

  database.query(createTableQuery, (err)=>{
    if(err) throw err;

    console.log(`${tableName} Table Created.`)

    return res.send(`Created ${tableName} Table`);
  })
});

