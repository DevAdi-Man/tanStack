import { authServices } from "@/services/authServices";
import useUserStore from "@/storage/useUserStore"
import { LoginRequest } from "@/types/auth.type";
import { useMutation, useQuery } from '@tanstack/react-query';

export const useLoginMutation = () => {
    const { setUser,setRefreshToken,setToken } = useUserStore()

    return useMutation({
        mutationFn: (data: LoginRequest) => authServices.login(data),
        onSuccess: (userData) => {
            setToken(userData.accessToken)
            setRefreshToken(userData.refreshToken)
            setUser(userData);
        },
        onError: (error: any) => {
            const serverMessage = error.response?.data?.message;
            const genericMessage = error.message;

            // 2. Log the specific message from the server if it exists
            console.error("Login failed:", serverMessage || genericMessage || "Unknown Error");
        }
    })
}
