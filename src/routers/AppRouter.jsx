import React, { useContext, Suspense, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider.jsx';

// Lazy load components for better performance
const Homepage = lazy(() => import('../pages/Homepage.jsx'));
const Login = lazy(() => import('../pages/Login.jsx'));
const Register = lazy(() => import('../pages/Register.jsx'));
const PostPage = lazy(() => import('../pages/postPage.jsx'));
const UserListPage = lazy(() => import('../pages/UserListPage.jsx'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard.jsx'));
const Profile = lazy(() => import('../pages/Profile.jsx'));
const ProductList = lazy(() => import('../components/products/ProductList.jsx'));
const UserProfile = lazy(() => import('../components/user/UserProfile.jsx'));

// Loading component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

export default function AppRouter() {
  const location = useLocation();
  const noLayoutRoutes = ['/login', '/register'];
  const isNoLayout = noLayoutRoutes.includes(location.pathname);
  const { user } = React.useContext(AuthContext);

  return (
    <div className={`app-container ${isNoLayout ? 'no-layout' : 'default-layout'}`}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/"
            element={user ? <Homepage /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />

          {/* Profile Routes */}
          <Route
            path="/profile"
            element={user ? <UserProfile /> : <Navigate to="/login" replace />} />

          {/* Products Routes */}
          <Route
            path="/products"
            element={user ? <ProductList /> : <Navigate to="/login" replace />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />} />
          <Route
            path="/users"
            element={user?.isAdmin ? <UserListPage /> : <Navigate to="/" replace />} />

          {/* Posts Route */}
          <Route
            path="/posts"
            element={user ? <PostPage /> : <Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}
