import { CircularProgress, Box } from "@mui/material";

const Loader = (loading) => {
  return (
    loading && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(139, 139, 139, 0.5)",
          zIndex: (theme) => theme.zIndex.modal + 2, // Asegura que esté encima de los Dialogs
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    )
  );
};

export default Loader;
