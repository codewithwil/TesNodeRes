'use strict';

var response    = require('./res');
var connection  = require('./koneksi');

exports.index   = function(req, res){
    response.ok("Restapi success", res);
}

//menampilkan semua data mahasiswa
exports.selectMahasiswa = function(req, res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            console.log(error); 
            response.ok("Error while querying database", res);
        }else{
            response.ok(rows, res);
        }
    }); 
}

exports.selectMahasiswaById = function(req, res){
    let id  = req.params.id;
    connection.query("SELECT * FROM mahasiswa WHERE id_mahasiswa = ?", [id],
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
                response.ok(rows, res);
            }
        });
}