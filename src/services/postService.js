import apiClient from "../api/api.js";

export const createPost = (postData) => apiClient.post("/post", postData);

export const getAllPosts = () => apiClient.get("/post");

export const updatePost = (id, postData) => apiClient.put(`/post/${id}`, postData);

export const deletePost = (id) => apiClient.delete(`/post/${id}`);
