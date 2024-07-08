'use strict';

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/read')
        .get(jsonku.selectMahasiswa);

    app.route('/read/:id')
        .get(jsonku.selectMahasiswaById);   

    app.route('/create')
        .post(jsonku.createMahasiswa);

    app.route('/update')
        .put(jsonku.updateByIdMahasiswa);

    app.route('/delete')
        .delete(jsonku.deleteByIdMahasiswa);
}   