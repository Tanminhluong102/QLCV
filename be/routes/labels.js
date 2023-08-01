var router = require('express').Router();
var database = require('../database');

router.get('/', function (req, res) {
    let query = `SELECT * FROM label`;
    database.query(query, function (error, data) {
        res.send(data);
    });
});

router.get('/:id', function (req, res) {
    console.log(req.params);
    let id = req.params.id;
    let query = `SELECT * FROM label WHERE id = ${id} LIMIT 1`;
    database.query(query, function (error, data) {
        res.send(data);
    });
});

router.post('/update/:id', function (req, res) {
    let id = req.params.id;
    let { name } = req.body;
    let query = `UPDATE label SET name = "${name}" WHERE id = ${id}`;
    database.query(query, function (error, data) {
        res.send(data);
    });
});

router.post('/create', function (req, res) {
    console.log(req.body);
    const { name } = req.body;
    const query = `INSERT INTO label (name) VALUES ("${name}")`;
    database.query(query, function (error, data) {
        if (error) {
            console.log(error);
            res.send({ Error: -1, Mesage: 'Lỗi' + error });
        }
        else {
            res.send({ Error: 0, Mesage: 'Thành công' });
        }
    });
});

router.post('/delete/:id', function (req, res) {
    let id = req.params.id;
    let query = `DELETE FROM label WHERE id = ${id}`;
    database.query(query,function (error,data){
        if (error) {
            console.log(error);
            res.send({ Error: -1, Mesage: 'Lỗi' + error });
        }
        else {
            res.send({ Error: 0, Mesage: 'Thành công' });
        }
    });
});

module.exports = router; 