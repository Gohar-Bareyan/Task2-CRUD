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

app.listen(5000, () => {
    console.log("Started...");
})
