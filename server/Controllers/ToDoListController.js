const { ToDoList } = require("../models");
const moment = require("moment")

class ToDoListController {
    static async addToDoList(req, res) {
        const createdDay = moment().format("YYYY-MM-DD");

        const newToDoList = await ToDoList.create({
            deadline: req.body.data.deadline,
            title: req.body.data.title,
            description: req.body.data.description,
            createdAt: createdDay,
            orderId: req.body.toDoList.length
        })
        res.send(newToDoList)
    }

    static async getToDoList(req, res) {
        const allToDoList = await ToDoList.findAll(
            {
                order: [
                    ['orderId', 'ASC']
                ]
            }
        )
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

    static async addProgress(req, res) {
        const progress = req.body.data.progress
        const toDoId = req.body.data.toDoId
        const addedProgress = await ToDoList.upsert({
            id: toDoId,
            progress: progress
        })
        res.send(addedProgress[0])
    }

    static async getProgress(req, res) {
        const newToDoList = await ToDoList.findAll({})
        res.send(newToDoList)
    }

    static async updateToDo(req, res) {
        const createdDay = moment().format("YYYY-MM-DD");

        await ToDoList.update({
            deadline: req.body.data.data.deadline,
            title: req.body.data.data.title,
            description: req.body.data.data.description,
            createdAt: createdDay,
            progress: req.body.data.data.progress
        },
            { where: { id: req.body.data.id } })

        const toDoList = await ToDoList.findAll({})
        res.send(toDoList)
    }

    static async reOrderToDo(req, res) {
        const destinationIndex = req.body.data.destinationIndex
        const sourceIndex = req.body.data.sourceIndex
        // const draggableTodos = req.body.data.draggableTodos
       
        // await draggableTodos.map(async (toDo) => {
        //     return (
                await ToDoList.update({
                    orderId: destinationIndex
                },
                    { where: { orderId: sourceIndex } }
                )
        //     )
        // })
    }

}

module.exports = { ToDoListController }