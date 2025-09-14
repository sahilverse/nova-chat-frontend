import api from "./axios";
import { setAccessToken } from "@/lib/auth";


export async function refreshToken(): Promise<string> {
    const { data } = await api.post("/auth/token/refresh");
    const accessToken = data.Result.access_token;
    setAccessToken(accessToken);
    return accessToken;
}