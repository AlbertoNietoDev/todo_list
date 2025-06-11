import express from "express";
import connectDB from "./mongo_connection.js";
import taskRouter from "./routes/taskRoutes.js";
import cors from "cors";

connectDB(); // Establish MongoDB connection

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRouter);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
