import api from "./axios";


export async function refreshToken(): Promise<string> {
    const { data } = await api.post("/auth/token/refresh");
    const accessToken = data.Result.access_token;
    return accessToken;
}