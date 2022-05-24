const { ToDoList } = require("../models");


class ToDoListController {
    static async addToDoList(req, res) {
        const newToDoList = await ToDoList.create({
            deadline: req.body.data.deadline,
            title: req.body.data.title,
            description: req.body.data.description
        })
        res.send(newToDoList)
    }

    static async getToDoList(req,res) {
        const allToDoList = await ToDoList.findAll()
        res.send(allToDoList)
    }
}

module.exports = { ToDoListController }