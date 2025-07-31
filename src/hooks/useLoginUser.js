import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService.js";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider.jsx";

export const useLoginUser = () => {
  const { setUser } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      try {
        console.log("Starting login mutation...");
        const result = await loginUserService(formData);
        console.log("Login successful:", result);
        return result;
      } catch (error) {
        console.error("Login mutation error:", error);
        throw error; // Re-throw to be caught by onError
      }
    },
    onSuccess: (data) => {
      if (data?.token && data?.data) {
        // Save token and user data
        localStorage.setItem("token", data.token);
        setUser(data.data);
        
        // Show success message
        toast.success(data.message || "Login successful!");
        
        // Redirect will be handled by the component's useEffect
      } else {
        console.error("Invalid response format:", data);
        toast.error("Invalid response from server");
      }
    },
    onError: (error) => {
      console.error("Login failed:", {
        message: error.message,
        status: error.status,
        response: error.response
      });
      
      // Show user-friendly error message
      const errorMessage = error.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      
      // Clear any invalid token
      if (error.status === 401) {
        localStorage.removeItem("token");
      }
    }
  });

  return mutation;
};
