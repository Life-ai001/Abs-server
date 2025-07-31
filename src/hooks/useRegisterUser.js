import { useState } from "react";
import { registerUserService } from "../services/authService.js"; 

export const useRegisterUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);

    const register = async (formData) => {
        setLoading(true);
        setResponseData(null);
        setError(null);
        try {
            const response = await registerUserService(formData);
            setResponseData(response);
            return response;
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        isLoading: loading,
        data: responseData,
        error,
    };
};
