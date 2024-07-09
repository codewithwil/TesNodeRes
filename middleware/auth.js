var connection = require('../koneksi');
var mysql      = require('mysql');
var md5        = require('md5');
var response   = require('../res');
var jwt        = require('jsonwebtoken');
var config     = require('../config/secret');
var ip         = require('ip');

//controller untuk register
exports.register = function(req, res){
    var post = {
        username:       req.body.username,
        email:          req.body.email,
        password:       md5(req.body.password),
        role:           req.body.role,
        tanggal_daftar: new Date()
    }

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];
    query     = mysql.format(query, table);
    connection.query(query, function(error, rows){
        if (error) {
            console.log(error);
        }else{
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query     = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if (error) {
                        console.log(error);
                    }else{
                        response.ok("add data user success", res);
                    }
                });
            }else{
                response.ok("Email sudah terdaftar!", res); 
            }
        }
    })
}

//controller untuk login
exports.login = function(req, res){
    var post = {
        email: req.body.email,
        password: req.body.password,
    };

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user", "email", post.email, "password", md5(post.password)];
    query = mysql.format(query, table);

    connection.query(query, function(error, rows){
        if (error) {
            console.log(error);
            res.status(500).json({"Error": true, "Message": "Database error"});
        } else {
            if (rows.length == 1) {
                var token = jwt.sign({ id: rows[0].id }, config.secret, {
                    expiresIn: 1440 // Expires in 24 hours
                });

                var id_user = rows[0].id;
                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                };

                var insertQuery = "INSERT INTO ?? SET ?";
                var insertTable = ["akses_token"];
                var formattedInsertQuery = mysql.format(insertQuery, insertTable);

                connection.query(formattedInsertQuery, data, function(error){
                    if (error) {
                        console.log(error);
                        res.status(500).json({"Error": true, "Message": "Database error"});
                    } else {
                        res.json({
                            success: 200,
                            message: "JWT token generated successfully",
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            } else {
                res.status(401).json({"Error": true, "Message": "Invalid email or password"});
            }
        }
    });
}

exports.secretPage  = function(req,res){
    response.ok("halaman ini hanya untuk user dengan role = 1", res);
}