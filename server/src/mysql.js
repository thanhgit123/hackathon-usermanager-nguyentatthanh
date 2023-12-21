const e = require('express');
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usermanager22'
})

function  getTask() {
    return new Promise((resolve,reject)=>{
    connection.query('SELECT * FROM users', (err, rows, ) => {
        if (err) {
             console.log("1111 err");
             return
        }
        resolve(rows)
      })
    })
};
// aadd task
function  addTask(data) {
    var sql = `INSERT INTO users (nameTask,status) VALUES ('${data.nameTask}','${data.status}')`
    connection.query(sql, function (err, record,){
        if(err) throw err;
        console.log("add sucess");
      });
};

function deleteTask (id){
    var deleteSomething = `DELETE FROM users WHERE id = '${id}'`
    connection.query(deleteSomething,function(err,result){
        if(err) throw err;
        console.log(result);
    })
};
function update(id,data){
    var updateTask = `UPDATE users SET nameTask = '${data.nameTask}' WHERE id = '${id}'`;
    connection.query(updateTask,function(err,result){
        if(err) throw err;
        console.log(result)
    })
}

function changStatus(id,data){
    var updateTask = `UPDATE users SET status = '${data.status}' WHERE id = '${id}'`;
    connection.query(updateTask,function(err,result){
        if(err) throw err;
        console.log(result)
    })
}

module.exports = {
    getTask,
    addTask,
    deleteTask,
    update,
    changStatus
}