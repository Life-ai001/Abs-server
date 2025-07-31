import React, { useEffect, useState, useContext } from "react";
import {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
} from "../services/postService.js";
import { AuthContext } from "../auth/AuthProvider.jsx";
import "./Css/postPage.css";

export default function PostPage() {
  const { user } = useContext(AuthContext);         // 👈 logged-in user
  const [posts, setPosts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    body: "",
    author: user?._id ?? "",                        // default author = current user
  });

  const [selectedPostId, setSelectedPostId] = useState(null);

  /* ---------------- Fetch Posts ---------------- */
  const fetchPosts = async () => {
    try {
      const res = await getAllPosts();
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* ---------------- Submit / Update ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPostId) {
        await updatePost(selectedPostId, form);
      } else {
        await createPost({ ...form, author: user._id }); // always send current user
      }
      setForm({ title: "", body: "", author: user._id });
      setSelectedPostId(null);
      fetchPosts();
    } catch (err) {
      console.error("Failed to submit post:", err.message);
    }
  };

  /* ---------------- Delete ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await deletePost(id);
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete post:", err.message);
    }
  };

  /* ---------------- Edit ---------------- */
  const handleEdit = (post) => {
    setForm({
      title: post.title,
      body: post.body,
      author: user._id, // keep current user id when editing
    });
    setSelectedPostId(post._id);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="post-page">
      <h2>{selectedPostId ? "✏️ Edit Post" : "📌 Create a New Post"}</h2>

      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        ></textarea>

        {/* Author ID no longer shown because it's auto-filled */}

        <button type="submit">
          {selectedPostId ? "Update Post" : "Submit Post"}
        </button>

        {selectedPostId && (
          <button
            type="button"
            onClick={() => {
              setSelectedPostId(null);
              setForm({ title: "", body: "", author: user._id });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>📝 All Posts</h2>
      <div>
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p className="author">
              Author: {post.author?.firstName
                ?? post.author?.email
                ?? post.author?._id
                ?? "Unknown"}
            </p>
            <button onClick={() => handleDelete(post._id)} className="delete-btn">
              Delete
            </button>
            <button onClick={() => handleEdit(post)} className="edit-btn">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
