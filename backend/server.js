import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Task from './models/task.js';
import { mongoose } from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

app.post('/api/tasks', async (req, res) => {
    const task = req.body;

    if (!task.sprint || !task.description || !task.learned || !task.priority) {
        return res.status(400).json({ success: false, message: 'Task data is required for all fields' });
    }

    const newTask = new Task(task);

    try {
        await newTask.save();
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        console.error("Error in creating task:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    // console.log("id", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid task id' });
    }

    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Task deleted' });
    } catch (error) {
        console.error("Error in deleting task:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        console.error("Error in fetching tasks:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const task = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid task id' });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true });
        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        console.error("Error in updating task:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on at http://localhost:' + PORT);
});
