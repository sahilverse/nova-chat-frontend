import api from "@/api/axios";

export async function sendOtp(email: string) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
}


export async function verifyOtp(token: string, email?: string) {
    const response = await api.post('/auth/verify-reset-token', { email, token });
    return response.data;
}


export async function resetPassword(token: string, newPassword: string, confirmNewPassword: string) {
    const response = await api.post(
        "/auth/reset-password",
        {
            newPassword,
            confirmNewPassword
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}

