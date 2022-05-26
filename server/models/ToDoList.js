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
        },
        createdAt: {
            type: Sequelize.STRING
        },
        progress: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        }
    },
        {
            timestamps: false,
            freezeTableName: true
        });
    return ToDoList
}