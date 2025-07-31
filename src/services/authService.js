import { loginUserApi, registerUserApi } from "../api/authApi.js";

export const loginUserService = async (formData) => {
    try {
        console.log("Sending login request with:", formData);
        const response = await loginUserApi(formData);
        
        if (!response || !response.data) {
            throw new Error("No response received from server");
        }
        
        console.log("Login response:", {
            status: response.status,
            data: response.data
        });
        
        if (!response.data.success) {
            throw new Error(response.data.message || "Login failed");
        }
        
        return {
            success: true,
            message: response.data.message || "Login successful",
            token: response.data.token,
            data: response.data.data || {}
        };
        
    } catch (error) {
        console.error("Login error:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        
        const errorMessage = error.response?.data?.message || 
                           error.message || 
                           "Login failed. Please try again.";
        
        const customError = new Error(errorMessage);
        customError.status = error.response?.status;
        throw customError;
    }
};

export const registerUserService = async (formData) => {
    try {
        const response = await registerUserApi(formData);
        
        if (!response || !response.data) {
            throw new Error("No response received from server");
        }
        
        if (!response.data.success) {
            throw new Error(response.data.message || "Registration failed");
        }
        
        return {
            success: true,
            message: response.data.message || "Registration successful",
            data: response.data.data || {}
        };
        
    } catch (error) {
        console.error("Registration error:", error);
        
        const errorMessage = error.response?.data?.message || 
                           error.message || 
                           "Registration failed. Please try again.";
        
        const customError = new Error(errorMessage);
        customError.status = error.response?.status;
        throw customError;
    }
};
