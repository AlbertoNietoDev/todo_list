import axios from "axios";

export const createTask = async (data) => {
  try {
    console.log('data:::',data)
    const response = await axios.post("http://localhost:5000/api/tasks", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/tasks");
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const updateTask = async (id, data) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/tasks/${id}`
    );
    console.log("first response: ", response);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};

export const getFile = async (id, filename) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/tasks/${id}/files/${filename}`,
      { responseType: "blob" }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener archivo:", error);
    throw error;
  }
};