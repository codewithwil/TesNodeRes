var express = require('express');
var auth    = require('./auth');
const verifikasi = require('./verifikasi');
var router  = express.Router();

//daftarkan menu registerasi
router.post('/api/register', auth.register);
router.post('/api/login', auth.login);

//alamat yang perlu diotorisasi
router.get('/api/secret', verifikasi(1), auth.secretPage);
module.exports = router;