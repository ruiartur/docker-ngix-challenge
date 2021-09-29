const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const drop = "drop table people"
const create = "create table people(id int not null auto_increment, name varchar(255), primary key(id))"
const sql = `INSERT INTO people(name) values('Node'), ('Java'), ('Docker')`
connection.query(drop)
connection.query(create)
connection.query(sql)

let result = undefined;

connection.query(
    'SELECT * FROM people',
    function(err, rows){
      if(err) throw err;
      console.log(rows[0].name);
      result = rows
    }            
  );

connection.end()

app.get('/', (req,res) => {
    res.send('<h1>Full Cycle Rocks!</h1> ' + JSON.stringify(result))
})

app.listen(port, ()=> {
    console.log('Server running...')
})