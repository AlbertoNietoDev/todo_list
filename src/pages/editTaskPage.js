import { useState } from "react";
import DialogCustom from "../components/dialog";
import { Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";
import { DropField } from "../components/DropField";
import { updateTask } from "../tools/requests";

export const EditTask = ({ onClose, updatedTask, dataTask }) => {
  // const [attachedFiles, setAttachedFiles] = useState(null);

  const [title, setTitle] = useState(dataTask?.title || "");
  const [desc, setDesc] = useState(dataTask?.desc || "");
  const [statusTask, setStatusTask] = useState(dataTask?.status || false);

  const handleUpdateTask = async () => {
    try {
      const objTask = {
        title: title,
        description: desc,
        status: statusTask,
        // attachments: attachedFiles,
      };
      const response = await updateTask(dataTask.field, objTask);
      console.log('RESPONSEL: ', response);
      if (response) {
        console.log("Task updated successfully:", response);
        updatedTask();
        onClose();
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <DialogCustom
      title={"Edit task"}
      description={""}
      agreeText="Save"
      disagreeText="Cancel"
      openDialog
      onAgree={handleUpdateTask}
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
                checked={statusTask}
                onChange={(e) => setStatusTask(e.target.checked)}
              />
            }
            label="Complete"
          />
          {/* <DropField setDataFilesUploaded={setAttachedFiles} /> */}
        </Stack>
      }
    />
  );
};
