var router = require('express').Router();
var database = require('../database');
var jwt = require('jsonwebtoken');
var Helper = require('./../util/helper')();

router.get('/', function (req, res) {
    let query = `SELECT tasks.*, users.name as assigned_to_name FROM tasks LEFT JOIN users ON tasks.assigned_to = users.id`;
    database.query(query, function (error, data) {
        res.send(data);
    });
}); 
router.get('/getStatus', function (req, res) {
    let query = `select count(*) as num,
    case
        when completedDate > deadline then 'Overdue'
        when status <> 'Done' and now() > deadline then 'Overdue'
        else status
    end as type
    from tasks
    group by type;`;
    database.query(query, function (error, data) {
        let result = {Overdue:0, Progress:0, Ready:0, Done:0, Review:0};
        data.forEach(element => {
            result[element.type] = element.num;
        });
        res.send(result);
    });
});

router.get('/getPriority', function (req, res) {
    let query = `select count(*) as num,priority from tasks group by priority;`;
    database.query(query, function (error, data) {
        res.send(data);
    });
});
router.get('/completed', function (req, res) {
    let query = `SELECT (SELECT COUNT(*) FROM tasks WHERE tasks.progress = 100) as completed, (SELECT COUNT(*) FROM tasks) as total;`;
    database.query(query, function (error, data) {
        res.send(data[0]);
    }); 
}); 



router.post('/createTasks', (req, res) => {
    const {title, description, deadline, priority,assigned_to} = req.body;
    const query = `INSERT INTO tasks (title, description, deadline, priority, progress, status, assigned_to) 
            VALUES ("${title}", "${description}", "${deadline}" ,"${priority}", 0 , "Ready", "${assigned_to}")`;
    database.query(query, function (error, data) {
        if (error) {
            console.log(error);
            res.send({ Error: -1, Mesage: 'Lỗi' + error });
        }
        else {
            res.send({ Error: 0, Mesage: 'Thành công', Id: data.insertId });
        }
    }
    );
    
});

router.post('/editTasks/:id', (req, res) => {
    let id = req.params.id;
    const { title, description, deadline, priority,progress, status, assigned_to} = req.body;
    const query =`UPDATE tasks 
                    SET 
                    title = "${title}",
                    description = "${description}",
                    deadline = "${deadline}",
                    priority = "${priority}",
                    progress = "${progress}",
                    status = "${status}",
                    assigned_to = "${assigned_to}",
                    updateDate = now()
                    WHERE id = "${id}"`;
    database.query(query, function (error, data) {
        if (error) {
            console.log(error);
            res.send({ Error: -1, Mesage: 'Lỗi' + error });
        }
        else {
            res.send({ Error: 0, Mesage: 'Thành công' });
        }
    }
    );
});

router.post('/delete/:id', function (req, res) {
    let id = req.params.id;
    let query = `DELETE FROM tasks WHERE id = ${id}`;
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


router.get('/:id', function (req, res) {
    let id = req.params.id;
    let query = `SELECT tasks.*, users.name as assigned_to_name FROM tasks LEFT JOIN users ON tasks.assigned_to = users.id WHERE tasks.id = ${id} LIMIT 1`;
    database.query(query, function (error, data) {
        res.send(data[0]);
    });
});



module.exports = router;