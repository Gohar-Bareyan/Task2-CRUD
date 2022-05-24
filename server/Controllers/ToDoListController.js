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

    static async getToDoList(req, res) {
        const allToDoList = await ToDoList.findAll()
        res.send(allToDoList)
    }

    static async deleteList(req, res) {
        await ToDoList.destroy({
            where: { id: req.params.id }
        })
        res.send({ status: "Ok" })
    }

    static async getSortedByDateList(req, res) {
        const sortedByDateList = await ToDoList.findAll({ order: [['deadline', 'DESC']] })
        res.send(sortedByDateList)
    }

    static async getSortedAlphabeticallyList(req, res) {
        const sortedAlphabeticallyList = await ToDoList.findAll({ order: [['title', 'ASC']] })
        res.send(sortedAlphabeticallyList)
    }

    static async getListInfo(req, res) {
        // console.log(req.body.data);
    //     const listInfo = await ToDoList.findAll({
    //         where: { id: req.body.data.id }
    //     })
    //     console.log(listInfo);
    }
}

module.exports = { ToDoListController }