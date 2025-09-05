import api from "@/api/axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type AuthUser = { id: string; name?: string; email?: string; profileImage?: string };

interface AuthState {
    accessToken: string | null;
    user: AuthUser | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    errorMessage: string | null;
    fieldErrors: Record<string, string> | null;
}

const initialState: AuthState = {
    accessToken: null,
    user: null,
    status: "idle",
    errorMessage: null,
    fieldErrors: null,
};


// Login
export const loginThunk = createAsyncThunk(
    "auth/login",
    async (payload: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await api.post("/auth/login", payload);
            const Result = response.data.Result;
            return Result;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// Register
export const registerThunk = createAsyncThunk(
    "auth/register",
    async (payload: { name: string; email: string; password: string }, thunkAPI) => {
        try {
            const response = await api.post("/auth/register", payload);
            return response.data.Result;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// Slice

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuth: (state) => {
            state.accessToken = null;
            state.user = null;
            state.status = "idle";
            state.errorMessage = null;
            state.fieldErrors = null;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginThunk.pending, (state) => {
                state.status = "loading";
                state.errorMessage = null;
                state.fieldErrors = null;
            })
            .addCase(loginThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "succeeded";
                state.accessToken = action.payload.access_token;
                state.user = action.payload.user;
                state.errorMessage = null;
                state.fieldErrors = null;
            })
            .addCase(loginThunk.rejected, (state, action: any) => {
                state.status = "failed";
                state.errorMessage = action.payload?.errorMessage || "Login failed";
                state.fieldErrors = action.payload?.fieldErrors || null;
            })
            // Register
            .addCase(registerThunk.pending, (state) => {
                state.status = "loading";
                state.errorMessage = null;
                state.fieldErrors = null;
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(registerThunk.rejected, (state, action: any) => {
                state.status = "failed";
                state.errorMessage = action.payload?.errorMessage || "Register failed";
                state.fieldErrors = action.payload?.fieldErrors || null;

            });
    },
});

export const { clearAuth, setAccessToken, setUser } = authSlice.actions;
export default authSlice.reducer;
