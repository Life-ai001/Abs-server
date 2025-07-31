import { useMutation } from "@tanstack/react-query";
import { registerUserService } from "../services/authService.js";  
import { toast } from "react-toastify";

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: registerUserService,
        mutationKey: ["register"], // mutation key unchanged
        onSuccess: (data) => {
            toast.success(data?.message || "Registration Success");
        },
        onError: (err) => {
            toast.error(err?.message || "Registration Failed");
        }
    });
};
