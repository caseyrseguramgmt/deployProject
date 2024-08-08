import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        sprint: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        learned: {
            type: String,
            required: true,
            trim: true,
        },
        priority: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
