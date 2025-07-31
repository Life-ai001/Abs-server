import React, { useState } from 'react'
import { useRegisterUser as useRegisterUserTan } from '../../hooks/useRegisterUserTan'

export default function RegisterForm() {
    const { mutate, data, error, isPending } = useRegisterUserTan()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        mutate(formData)
    }

    return (
        <div className="register-form-container">
            <h3 className="register-form-title">RegisterForm</h3>
            <form onSubmit={handleSubmit} className="register-form">
                <label className="register-label">First Name</label>
                <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="register-input"
                />

                <label className="register-label">Last Name</label>
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="register-input"
                />

                <label className="register-label">Email</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="register-input"
                />

                <label className="register-label">Password</label>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="register-input"
                />

                <button type="submit" className="register-button" disabled={isPending}>
                    {isPending ? "Registering..." : "Register"}
                </button>

                {error && <p className="error-message">{error.message}</p>}
                {data && <p className="success-message">{data.message}</p>}
            </form>
        </div>
    )
}
