import React, { useEffect, useContext, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUser } from '../../hooks/useLoginUser.js';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthProvider.jsx';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginForm() {
    const { mutate, data, error, isPending } = useLoginUser();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (data?.success && data?.data) {
            // Save to context
            login(data.data, data.token);

            // Admin check
            if (data.data.isAdmin === true) {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        }
    }, [data, navigate, login]);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required")
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => {
            mutate(values);
        }
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-form-container">
            <div className="login-header">
                <h2 className="login-form-title">Welcome Back</h2>
                <p className="login-subtitle">Please sign in to your account</p>
            </div>
            
            <form onSubmit={formik.handleSubmit} className="login-form">
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-icon">
                            <FiMail />
                        </span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`login-input ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
                        />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                        <p className="error-message">{formik.errors.email}</p>
                    )}
                </div>

                <div className="form-group">
                    <div className="input-group">
                        <span className="input-icon">
                            <FiLock />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`login-input ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
                        />
                        <button 
                            type="button" 
                            className="password-toggle"
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <p className="error-message">{formik.errors.password}</p>
                    )}
                </div>

                {error && (
                    <div className="error-message server-error">
                        {error.message || 'An error occurred during login. Please try again.'}
                    </div>
                )}

                <button 
                    type="submit" 
                    className="login-button"
                    disabled={isPending}
                >
                    {isPending ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div className="login-footer">
                <p className="signup-link">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
