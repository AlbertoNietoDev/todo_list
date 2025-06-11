import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
  attachments: [
    {
      filename: String,
      mimetype: String,
      buffer: Buffer,
    }
  ],
  
});
const Task = mongoose.model("Task", taskSchema, "tasks");

export default Task;