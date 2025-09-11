import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

// Login
export const loginThunk = createAsyncThunk(
    "auth/login",
    async (payload: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await api.post("/auth/login", payload);
            return response.data.Result;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// Register
export const registerThunk = createAsyncThunk(
    "auth/register",
    async (payload: { name: string; email: string; password: string; confirmPassword: string }, thunkAPI) => {
        try {
            const response = await api.post("/auth/register", payload);
            return response.data.Result;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);


// Logout

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await api.post("/auth/logout");
            return true;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

