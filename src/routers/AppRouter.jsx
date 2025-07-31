import React, { useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Homepage from '../pages/Homepage.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import PostPage from '../pages/postPage.jsx';
import UserListPage from "../pages/UserListPage.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import Profile from "../pages/Profile.jsx";
import { AuthContext } from '../auth/AuthProvider.jsx';

export default function AppRouter() {
  const location = useLocation();
  const noLayoutRoutes = ['/login', '/register'];
  const isNoLayout = noLayoutRoutes.includes(location.pathname);
  const { user } = React.useContext(AuthContext);

  return (
    <div className={isNoLayout ? 'no-layout' : 'default-layout'}>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Homepage /> : <Navigate to="/login" replace />} 
        />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
        <Route 
          path="/profile" 
          element={user ? <Profile /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/admin" 
          element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/admin/users" 
          element={user?.isAdmin ? <UserListPage /> : <Navigate to="/" replace />} 
        />  
        <Route 
          path="/admin/posts" 
          element={user?.isAdmin ? <PostPage /> : <Navigate to="/" replace />} 
        />
      </Routes>
    </div>
  );
}
