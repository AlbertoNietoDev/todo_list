import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { getAllTasks, getFile, updateTask } from "../../tools/requests";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileViewerDialog from "../FilesViewer";
import Loader from "../loader";

const columns = [
  { field: "field", headerName: "ID", width: 50 },
  {
    field: "title",
    headerName: "Title",
    width: 150,
    // editable: true,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 150,
    // editable: true,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 130,
    // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: "status",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 100,
    // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: "actions",
    headerName: "Actions",
    description: "Actions available for the task.",
    sortable: false,
    width: 160,
  },
];

const DataGridComponent = ({ updateData, editData, deleteTask }) => {
  const [tableRows, setTableRows] = useState([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [loading, setLoading] = useState(false);

  console.log(';loading 1: ', loading);

  const getAllData = async () => {
    try {
      setLoading(true);
      const response = await getAllTasks();
      const newRows = response.map((task, index) => ({
        id: index + 1,
        field: task._id,
        title: task.title,
        desc: task.description,
        status: task.status,
        attachments: task?.attachments,
      }));
      setTableRows(newRows);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleUpdateStatus = async (row) => {
    try {
      setLoading(true);
      const updatedRow = {
        ...row,
        status: !row.status, // Toggle status
      };
      await updateTask(row.field, updatedRow);
      setTableRows((prevRows) =>
        prevRows.map((r) => (r.field === row.field ? updatedRow : r))
      );
      setLoading(false);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleOpenViewer = async (dataRow) => {
    try {
      setLoading(true);
      const response = await getFile(
        dataRow.field,
        dataRow.attachments[0].filename
      );
      const file = new Blob([response], {
        type: dataRow.attachments[0].mimetype,
      });
      setSelectedFile(file);
      setDialogOpen(true);
      setLoading(false);
    } catch (error) {
      console.error("Error opening file viewer:", error);
    }
  };

  useEffect(() => {
    getAllData();
  }, [updateData]);

  const actionColumnIndex = columns.findIndex((col) => col.field === "actions");
  if (actionColumnIndex !== -1) {
    columns[actionColumnIndex].renderCell = (params) => (
      <Box>
        <Button
          variant="contained"
          sx={{ mx: "0.3rem" }}
          onClick={() => editData(params.row)}
        >
          <EditIcon />
        </Button>
        <Button
          variant="contained"
          sx={{ mx: "0.3rem" }}
          onClick={() => deleteTask(params.row)}
        >
          <DeleteIcon />
        </Button>
      </Box>
    );
  }

  const statusColumnIndex = columns.findIndex((col) => col.field === "status");
  if (statusColumnIndex !== -1) {
    columns[statusColumnIndex].renderCell = (params) => (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={params.row.status}
              onChange={() => handleUpdateStatus(params.row)}
            />
          }
          // label="Complete"
        />
      </Box>
    );
  }

  const attachColumnIndex = columns.findIndex(
    (col) => col.field === "attachments"
  );
  if (attachColumnIndex !== -1) {
    columns[attachColumnIndex].renderCell = (params) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {params.row?.attachments?.length > 0 ? (
          <Button
            variant="outlined"
            onClick={() => handleOpenViewer(params.row)}
          >
            View
          </Button>
        ) : (
          "No attachments"
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {loading && <Loader loading={loading}/>}
      <FileViewerDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        file={selectedFile}
      />
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#1976d2",
            color: "gray",
          },
          "& .MuiDataGrid-cell": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#e3f2fd",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#82aef5",
            color: "#fff",
          },
        }}
        rows={tableRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataGridComponent;
