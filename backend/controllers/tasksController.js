import Task from "../models/tasksSchema.js";

export const newTask = async (req, res) => {
  try {
    const files = req.files.map((file) => {
      return {
      filename: file.originalname,
      mimetype: file.mimetype,
      buffer: file.buffer,
    }
    });

    const taskData = {
      ...req.body,
      status: req.body.status === 'true',
      attachments: files,
    };
    console.log(req.files)
    const task = new Task(taskData);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}, { attachments: { buffer: 0 } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTaskById = async (req, res) => {
  try {
    // Handle file uploads if present
    let updatedData = { ...req.body };
    if (req.files && req.files.length > 0) {
      const files = req.files.map((file) => ({
        filename: file.originalname,
        mimetype: file.mimetype,
        buffer: file.buffer,
      }));
      updatedData.attachments = files;
    }
    if (typeof updatedData.status === 'string') {
      updatedData.status = updatedData.status === 'true';
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTaskById = async (req, res) => {
  try {
    console.log("ENTER TO DELETE");
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFile = async (req, res) => {
  try {
    const { id, filename } = req.params;
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ error: "File not found" });

    const file = task.attachments.find((f) => f.filename === filename);
    if (!file) return res.status(404).json({ error: "File name not found" });

    res.set("Content-Type", file.mimetype);
    res.send(file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al enviar archivo" });
  }
};
