const mysql = require('mysql2');

const connection = mysql.createConnection({
	host : '127.0.0.1',
	database : 'qlcv',
	user : 'root',
	password : 'password'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;