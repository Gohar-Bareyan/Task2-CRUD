const config = require("../config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    port: 3306,
    dialect: config.DIALECT
});

const ToDoList = require("./ToDoList")(sequelize, Sequelize);

(async () => {
    await sequelize.sync()
})()

module.exports = {
    ToDoList
}