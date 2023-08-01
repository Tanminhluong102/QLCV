
module.exports = function () {
    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }
    function getUserByToken(req,token) {
        var jwt = require('jsonwebtoken');
        var key = 'secretKey';
        if (token) {
            try {
                var decoded = jwt.verify(token, key);
                delete decoded.iat;
                delete decoded.exp;
                req.session.key = key;
                var token = jwt.sign(decoded, key, {
                    expiresIn: '86400000'
                });
                var result = {
                    Error: 0,
                    User: decoded,
                    Token: token
                };
                return result;
            } catch (err) {
                var result = {
                    Error: -1,
                    Message: 'Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại!'
                };
                return result;
            }
        } else {
            var result = {
                Error: -2,
                Message: 'Không có token'
            };
            return result;
        }
    }
    var methods = {
        isNumeric: isNumeric,
        getUserByToken: getUserByToken
    }
    return methods;
};