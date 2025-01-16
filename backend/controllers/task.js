import mongoose from "mongoose";
import Task from "../models/task.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        console.error("Error in Get tasks:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createTask = async (req, res) => {
    const task = req.body;

    if (!task.sprint || !task.description || !task.learned || !task.priority) {
        return res.status(400).json({ success:false, message: "Provide all fields" });
    }

    const newTask = new Task(task)

    try {
        await newTask.save();
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        console.error("Error in Create task:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid task ID" });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true });
        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        console.error("Error in Update task:", error.message);
        res.status(404).json({ success: false, message: "Task not found" });
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid task ID" });
    }
    
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Task deleted" });
    } catch (error) {
        console.error("Error in Delete task:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}