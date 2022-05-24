module.exports = (sequelize, Sequelize) => {
    const ToDoList = sequelize.define("toDoList", {
        deadline: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    },
        {
            timestamps: false,
            freezeTableName: true
        });
    return ToDoList
}