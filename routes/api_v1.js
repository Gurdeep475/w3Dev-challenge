const router = require("express").Router();
const {isAuthenticated} = require("../controllers/auth");
const taskController = require("../controllers/task");

// Create a Task
router.post("/createtask", taskController.createTask);

// get a single task
router.get("/:id", taskController.getTask);

// update a Task
router.put("/:id", taskController.updateTask);

//delete a Task
router.delete("/:id", taskController.deleteTask);

// fetch all tasks
router.get("/getalltasks", taskController.getAllTasks);

// carry forward a task to next day means incrementing the day by 1
router.put("/carryforward/:id",taskController.carryForwardTask);

module.exports = router;