import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import { AuthContext } from '../auth/AuthProvider.jsx';
import './Css/Register.css';
export default function Register() {
    const { user } = useContext(AuthContext)

    if (user) {
        return <div className="already-registered-message">You are already registered and logged in.</div>
    }

    return (
        <div className="register-page-container">
            <h2 className="register-page-title">Create an Account</h2>
            <div className="register-form-wrapper">
                <div className="register-links">
                    <Link to="/login" className="nav-link">← Back to Login</Link>
                </div>
                <RegisterForm />
            </div>
        </div>
    )
}
