const express = require("express")
const app = express()
const cors = require('cors')
const { ToDoListController } = require("./Controllers/ToDoListController");
require('./models')

app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.post("/add-ToDoList", ToDoListController.addToDoList)
app.get("/get-toDoList", ToDoListController.getToDoList)
app.delete("/delete-toDoList/:id", ToDoListController.deleteList)
app.get("/get-sorted-by-date-list", ToDoListController.getSortedByDateList)
app.get("/get-sorted-alphabetically-list", ToDoListController.getSortedAlphabeticallyList)

app.listen(5000, () => {
    console.log("Started...");
})
