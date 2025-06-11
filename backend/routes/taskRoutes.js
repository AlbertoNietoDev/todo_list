import express from "express";
import {
  newTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  getFile,
} from "../controllers/tasksController.js";
import multer from "multer";

const taskRouter = express.Router();

taskRouter.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new task
taskRouter.post("/", upload.array("files"), newTask);

// Get all tasks
taskRouter.get("/", getAllTasks);

// Get a task by ID
taskRouter.get("/:id", getTaskById);

// Update a task by ID
taskRouter.put("/:id", upload.array("files"), updateTaskById);

// Delete a task by ID
taskRouter.delete("/:id", deleteTaskById);

taskRouter.get("/:id/files/:filename", getFile);

export default taskRouter;
