var mysql = require('mysql');

//buat koneksi database mysql

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tesrestnode'
})

conn.connect((err)=> {
    if (err) throw err;
    console.log('mysql terkoneksi');
});

module.exports = conn;