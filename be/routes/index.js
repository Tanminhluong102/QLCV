var labels = require('./labels');
var users = require('./users');
var tasks = require('./tasks');
var assignments = require('./assignments');
const routers = (app) => {
    app.use("/labels", labels);
    app.use("/users", users);
    app.use("/tasks",tasks);
    app.use("/assignments",assignments);
}

module.exports = routers;
