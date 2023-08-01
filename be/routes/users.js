var router = require('express').Router();
var database = require('../database');
var jwt = require('jsonwebtoken');
var Helper = require('./../util/helper')();

router.get('/', function (req, res) {
    let query = `SELECT * FROM users`;
    database.query(query, function (error, data) {
        res.send(data);
    });
});



router.post('/createUser', (req, res) => {
    const {name, phone, email, address, gender, status, birthday } = req.body;
    const query = `INSERT INTO users (name, phone, email, address, gender, status, birthday) VALUES ("${name}", "${phone}", "${email}", "${address}", "${gender}", "${status}", "${birthday}")`;
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

router.post('/editUser/:id', (req, res) => {
    let id = req.params.id;
    const { name, phone, email, address, gender, status, birthday } = req.body;
    const query =`UPDATE users 
                    SET 
                    name = "${name}", 
                    phone = "${phone}", 
                    email = "${email}", 
                    address = "${address}", 
                    gender = "${gender}", 
                    status = "${status}", 
                    birthday = "${birthday}"
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
    let query = `DELETE FROM users WHERE id = ${id}`;
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

router.post('/login', function (request, response) {

    var username = request.body.username;
    var password = request.body.password;

    console.log(username, password);
    if (username && password) {
        query = `
        SELECT * FROM users_login 
        WHERE username = "${username}"  limit 1
        `;

        database.query(query, function (error, data) {
            console.log(data);
            if (data && data.length > 0) {
                if (data[0].password == password) {
                    request.session.user_id = data[0].user_id;

                    var token = jwt.sign(data[0], 'secretKey', {
                        expiresIn: '86400000'
                    });
                    response.send({ Error: 0, Mesage: 'Thành công', username: username, token: token });
                }
                else {
                    response.send({ Error: -1, Mesage: 'Sai mật khẩu' });
                }
            }
            else {
                response.send({ Error: -1, Mesage: 'Nguoi dung khong ton tai' });
            }
            response.end();
        });
    }
    else {
        response.send({ Error: -1, Mesage: 'Nhập mật khẩu và tài khoản' });
        response.end();
    }

});
// Mot so API co ban
router.post('/register', function (request, response) {
    var user_name = request.body.User;
    var password = request.body.Password;
    var email = request.body.Email;
    console.log(user_name, password);
    if (user_name && password) {
        query = 'INSERT INTO user_login (user_name, password, email, user_session_id) VALUES ("' + user_name + '", "' + password + '", "' + email + '", 1)';
        database.query(query, function (error, data) {
            if (error) {
                console.log(error);
                response.send({ Error: -1, Mesage: 'Lỗi' });
            }
            else {
                response.send({ Error: 0, Mesage: 'Thành công' });
            }
        });
    }
    else {
        response.send({ Mesage: 'Nhap tai khoan va mat khau' });
    }
});

router.post('/changepassword', function (request, response) {
    var user_name = request.body.User;
    var password = request.body.Password;
    var newpassword = request.body.NewPassword;
    if(user_name && password && newpassword){
        query = 'SELECT * FROM user_login WHERE user_name = "' + user_name + '" AND password = "' + password + '"';
        database.query(query, function (error, data) {
            if (error) {
                console.log(error);
                response.send({ Error: -1, Mesage: 'Lỗi' });
            }
            else {
                if(data && data.length > 0){
                    query = 'UPDATE user_login SET password = "' + newpassword + '" WHERE user_name = "' + user_name + '"';
                    database.query(query, function (error, data) {
                        if (error) {
                            console.log(error);
                            response.send({ Error: -1, Mesage: 'Lỗi' });
                        }
                        else {
                            response.send({ Error: 0, Mesage: 'Thành công' });
                        }
                    });
                }
                else{
                    response.send({ Error: -1, Mesage: 'Sai Tài khoản hoặc Mật khẩu' });
                }
            }
        });
    }
    else{
        response.send({ Mesage: 'Nhap tai khoan va mat khau' });
    }
});

router.post('/forgotpassword', function (request, response) {
    var user_name = request.body.User;
    var password = request.body.Password;
    if(user_name && email){
        query = 'SELECT * FROM user_login WHERE user_name = "' + user_name + '" AND email = "' + email + '"';
        database.query(query, function (error, data) {
            if (error) {
                console.log(error);
                response.send({ Error: -1, Mesage: 'Lỗi' });
            }
            else {
                if(data && data.length > 0){
                    response.send({ Error: 0, Mesage: 'Thành công' });
                }
                else{
                    response.send({ Error: -1, Mesage: 'Sai Tài khoản hoặc Email' });
                }
            }
        });
    }
    else{
        response.send({ Mesage: 'Nhap tai khoan va email' });
    }
});

router.get('/logout', function (request, response) {

    request.session.destroy();

    response.redirect("/");

});



router.get('/userinfo', function (request, response) {
    let item = request.body;
    let UserId = 0;
    let Token = item.Token;
    try {
        let data_util = Helper.getUserByToken(request, Token);
        if (data_util.Error == 0) {
            UserId = data_util.User.user_id;
        }
        else {
            response.send({ Error: -1, Message: "Lỗi xác thực!" });
            return;
        }
    } catch (error) {
        UserId = 0;
    }
    query = `
        SELECT user_name FROM user_login 
        WHERE user_id = "${UserId}"  limit 1
        `;

    database.query(query, function (error, data) {
        if (data && data.length > 0) {
            response.send({ Error: 0, Mesage: 'Thành công', user: data[0] });
        }
        else {
            response.send({ Error: -1, Mesage: 'Không dữ liệu' });
        }
        response.end();
    });
});


module.exports = router;