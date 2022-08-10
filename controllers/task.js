const Task = require("../models/task");
const asyncWrapper = require("../helpers/asyncWrapper");


// get a single task
exports.getTask = asyncWrapper(async (req, res) => {
    const task = await Task.find({ _id: req.params.id, user: req.user._id });
    if(!task){
        throw new Error("Task not Found");
    }
    res.json({ message: "Task Fetched Successfully", task });
});

// get all tasks sorted according to priority and updatedAt
exports.getAllTasks = asyncWrapper(async (req, res) => {
    console.log("Reached Here");
    const tasks = await Task.find({ user: req.user._id }).sort({ priority: 1, updatedAt: -1 });
    res.json({ message: "Tasks Fetched Successfully", tasks });
})

// post a task
exports.createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create({ ...req.body, user: req.user._id });
    res.json({ message: "Task Created Successfully", task });
});

// update a task
exports.updateTask = asyncWrapper(async (req, res) => {
    const task = await Task.findByIdAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    if(!task){
        throw new Error("Task not Found");
    }
    res.json({ message: "Task Updated Successfully", task });
});


// delete a task
exports.deleteTask = asyncWrapper(async (req, res) => {
    const task = await Task.findByIdAndDelete({ _id: req.params.id, user: req.user._id });
    if(!task){
        throw new Error("Task not Found");
    }
    res.json({ message: "Task Deleted Successfully", task });
});

// carry forward a task to next day means incrementing the day by 1
exports.carryForwardTask = asyncWrapper(async (req, res) => {
    const newDate = new Date(new Date().setDate(new Date().getDate() + 1));
    const task = await Task.findByIdAndUpdate({_id: req.params.id, user: req.user._id}, { expireAt: newDate }, { new: true });
    if(!task){
        throw new Error("Task not Found");
    }
    res.json({ message: "Task Carried Forward Successfully to Next Day", task });
});