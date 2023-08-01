var router = require('express').Router();
var database = require('../database');
var jwt = require('jsonwebtoken');
var Helper = require('./../util/helper')();

router.get('/tasks', function (req, res) {
    let query = `SELECT * FROM tasks`;
    database.query(query, function (error, data) {
        res.send(data);
    });
});

router.get('/users', function (req, res) {
    let query = `SELECT * FROM users`;
    database.query(query, function (error, data) {
        res.send(data);
    });
});



router.post('/createtaskassignments', (req, res) => {
    const {title, description, deadline, priority, status, assigned_to, createDate, updateDate } = req.body;
    const query = `INSERT INTO taskassignments (title, description, deadline, priority, status, assigned_to, createDate, updateDate) VALUES ("${title}", "${description}", "${deadline}" ,"${priority}", "${status}", "${assigned_to}", "${createDate}", "${updateDate}")`;
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
// router.post('/editTasks/:id', (req, res) => {
//     let id = req.params.id;
//     const { assigned_to } = req.body;
//     const assigned_to_id = assigned_to.id; // Giả sử assigned_to có trường "id" chứa giá trị số nguyên

//     // Lấy tên người thực hiện từ bảng "users" dựa trên ID người thực hiện
//     const getAssigneeNameQuery = `SELECT name FROM users WHERE id = ${assigned_to_id}`;
    
//     database.query(getAssigneeNameQuery, function (error, result) {
//         if (error) {
//             console.log(error);
//             res.send({ Error: -1, Mesage: 'Lỗi' + error });
//         } else {
//             const assignee_name = result[0].name;
//             // Thực hiện câu truy vấn UPDATE với thông tin tên người thực hiện
//             const updateQuery = `UPDATE tasks 
//                                  SET            
//                                  assigned_to = "${assignee_name}"
//                                  WHERE id = ${id}`;
//             database.query(updateQuery, function (error, data) {
//                 if (error) {
//                     console.log(error);
//                     res.send({ Error: -1, Mesage: 'Lỗi' + error });
//                 } else {
//                     res.send({ Error: 0, Mesage: 'Thành công' });
//                 }
//             });
//         }
//     });
// });

router.post('/editTasks/:id', (req, res) => {
    let id = req.params.id;
    const { assigned_to } = req.body;
    const assigned_to_id = assigned_to.id; // Giả sử assigned_to có trường "id" chứa giá trị số nguyên

    // Lấy thông tin công việc từ bảng "tasks" dựa trên ID công việc
    const getTaskInfoQuery = `SELECT title FROM tasks WHERE id = ${id}`;

    database.query(getTaskInfoQuery, function (error, taskResult) {
        if (error) {
            console.log(error);
            res.send({ Error: -1, Mesage: 'Lỗi' + error });
        } else {
            const task_title = result[0].task_title;
            const assignee_name = result[0].assignee_name;

            // Lấy tên người thực hiện từ bảng "users" dựa trên ID người thực hiện
            const getAssigneeNameQuery = `SELECT name FROM users WHERE id = ${assigned_to_id}`;

            database.query(getAssigneeNameQuery, function (error, assigneeResult) {
                if (error) {
                    console.log(error);
                    res.send({ Error: -1, Mesage: 'Lỗi' + error });
                } else {
                    const assignee_name = assigneeResult[0].name;
                    
                    const updateTaskQuery = `UPDATE tasks 
                                            SET            
                                            assigned_to = "${assignee_name}"
                                            WHERE id = ${id}`;
                    // Thực hiện câu truy vấn UPDATE vào bảng taskassignments với thông tin công việc và người thực hiện
                    const updateQuery = `UPDATE taskassignments 
                                         SET            
                                         task_id = "${task_title}",
                                         assigned_to = "${assignee_name}"
                                         WHERE id = ${id}`;
                    database.query(updateQuery, function (error, data) {
                        if (error) {
                            console.log(error);
                            res.send({ Error: -1, Mesage: 'Lỗi' + error });
                        } else {
                            res.send({ Error: 0, Mesage: 'Thành công' });
                        }
                    });
                }
            });
        }
    });
});





// router.post('/editTasks/:id', (req, res) => {
//     let id = req.params.id;
//     const { assigned_to } = req.body;
//     const assigned_to_id = assigned_to.id; // Giả sử assigned_to có trường "id" chứa giá trị số nguyên
//     const query =`UPDATE tasks 
//                   SET            
//                   assigned_to = ${assigned_to_id}
//                   WHERE id = ${id}`;
//     database.query(query, function (error, data) {
//         if (error) {
//             console.log(error);
//             res.send({ Error: -1, Mesage: 'Lỗi' + error });
//         }
//         else {
//             res.send({ Error: 0, Mesage: 'Thành công' });
//         }
//     }
//     );
// });

router.post('/editTaskAssignments/:id', (req, res) => {
    let id = req.params.id;
    const { title, description, deadline, priority, status, assigned_to, createDate, updateDate } = req.body;
    const query =`UPDATE taskassignments 
                    SET 
                    title = "${title}",
                    description = "${description}",
                    deadline = "${deadline}",
                    priority = "${priority}",
                    status = "${status}",
                    assigned_to = "${assigned_to}",
                    createDate = "${createDate}",
                    updateDate = "${updateDate}"
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
    let query = `DELETE FROM taskassignments WHERE id = ${id}`;
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