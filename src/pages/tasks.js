import { Button, Stack } from "@mui/material";
import Background from "../components/background";
import DataGridComponent from "../components/DataGrid";
import { useState } from "react";
import { NewTaskPage } from "./newTaskPage";
import { EditTask } from "./editTaskPage";
import { deleteTask } from "../tools/requests";
import { DeleteAlert } from "../components/alerts/deleteAlert";
import Loader from "../components/loader";

const Tasks = () => {
  const [openNewTask, setOpenNewTask] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(";loading 2: ", loading);
  const handleEdit = (data) => {
    setOpenEditTask(true);
    setDataToEdit(data);
  };

  const handleDelete = async (data) => {
    DeleteAlert((result) => {
      if (result.isConfirmed) {
        dltTask(data);
      }
    });
  };

  const dltTask = async (data) => {
    try {
      setLoading(true);
      const response = await deleteTask(data.field);
      console.log("Task deleted successfully:", response);
      setReloadData((prev) => !prev);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const refreshData = () => {
    setReloadData(!reloadData);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && <Loader loading={loading} />}
      {openNewTask && (
        <NewTaskPage
          onClose={() => setOpenNewTask(false)}
          cratedTask={refreshData}
        />
      )}
      {openEditTask && (
        <EditTask
          onClose={() => setOpenEditTask(false)}
          updatedTask={refreshData}
          dataTask={dataToEdit}
        />
      )}
      <Background />

      <Stack
        sx={{ width: "50%", height: "80vh", position: "relative", zIndex: 1 }}
      >
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            gap: "1rem",
            flexDirection: "row",
            p: "1rem",
          }}
        >
          <Button
            variant="contained"
            sx={{ width: "10rem" }}
            onClick={() => setOpenNewTask(true)}
          >
            New task
          </Button>
        </Stack>
        <DataGridComponent
          updateData={reloadData}
          editData={handleEdit}
          deleteTask={handleDelete}
        />
      </Stack>
    </Stack>
  );
};
export default Tasks;
