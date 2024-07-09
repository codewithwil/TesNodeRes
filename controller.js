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

//menampilkan data mahasiswa berdasarkan id
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

//tambah data mahasiswa
exports.createMahasiswa = function(req, res) {
    console.log("Received request to create a new Mahasiswa");
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    console.log("Received data:", req.body);
    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)',
        [nim, nama, jurusan],
        function(error, results, fields) {
            if (error) {
                console.error("Error creating Mahasiswa:", error);
                response.ok("Error while creating data mahasiswa", res);
            } else {
                console.log("Mahasiswa created successfully");
                response.ok("Create data mahasiswa success", res);
            }
        });
};

//update data mahasiswa berdasarkan id 
exports.updateByIdMahasiswa = function(req, res) {
    var id      = req.body.id_mahasiswa;
    var nim     = req.body.nim;
    var nama    = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query("UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?", [nim, nama, jurusan, id],
        function(error, results, fields) {
            if (error) {
                console.log(error);
                response.ok("Error updating data mahasiswa", res); 
            } else {
                console.log("Update successful");
                response.ok("Update data mahasiswa success", res);
            }
        });
};

//menghapus data mahasiswa berdasarkan id
exports.deleteByIdMahasiswa = function(req,res){
    var id = req.body.id_mahasiswa;
    connection.query("DELETE FROM mahasiswa WHERE id_mahasiswa=?", [id],
        function(error, results, fields) {
            if (error) {
                console.log(error);
                response.ok("Error delete data mahasiswa", res); 
            } else {
                console.log("delete successful");
                response.ok("delete data mahasiswa success", res);
            }
        });
}

//menampilkan matakuliah group 
exports.readGroupMatakuliah = function(req, res) {
    connection.query(
        'SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.mata_kuliah, matakuliah.sks FROM krs JOIN matakuliah ON krs.id_matakuliah = matakuliah.id_matakuliah JOIN mahasiswa ON krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
        function(error, results, fields) {
            if (error) {
                console.error(error);
                response.oknested([], res); // Send an empty array to oknested if there's an error
            } else {
                console.log("Get successful");
                response.oknested(results, res); // Pass results array to oknested
            }
        }
    );
};


