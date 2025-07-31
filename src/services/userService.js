import apiClient from "../api/api.js";

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get("/auth/all");
    return response.data; // should include isAdmin field
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch users" };
  }
};

// Delete a user by ID
export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/auth/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete user" };
  }
};
