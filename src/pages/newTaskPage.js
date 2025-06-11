import { useState } from "react";
import DialogCustom from "../components/dialog";
import { Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";
import { DropField } from "../components/DropField";
import { createTask } from "../tools/requests";
import Loader from "../components/loader";

export const NewTaskPage = ({ onClose, cratedTask }) => {
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [statusTask, setStatusTask] = useState(false);

  const handleNewTask = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("status", statusTask);
      attachedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await createTask(formData);
      if (response) {
        console.log("Task created successfully:", response);
        cratedTask();
        setLoading(false);
        onClose();
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <>
    {loading && <Loader loading={loading} />}
      <DialogCustom
        title={"New task"}
        description={""}
        agreeText="Create"
        disagreeText="Cancel"
        openDialog
        onAgree={handleNewTask}
        onDisagree={() => onClose()}
        handleClose={() => onClose()}
        bodyCustom={
          <Stack sx={{ width: "100%", height: "100%", py: "1rem" }} spacing={2}>
            <TextField
              name="title"
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TextField
              name="desc"
              label="Description"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={statusTask}
                  onChange={(e) => setStatusTask(e.target.checked)}
                />
              }
              label="Complete"
            />
            <DropField setDataFilesUploaded={setAttachedFiles} />
          </Stack>
        }
      />
    </>
  );
};
