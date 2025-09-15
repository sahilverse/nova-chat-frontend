import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthUser } from "./authTypes";
import { socketInstance } from "@/lib/socket";


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



// ----- Slice -----
const initialState: AuthState = {
    accessToken: null,
    user: null,
    status: "idle",
    errorMessage: null,
    fieldErrors: null,
};

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

                socketInstance.connect(action.payload.access_token);
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
            })

            // Logout
            .addCase(logoutThunk.fulfilled, (state) => {
                state.accessToken = null;
                state.user = null;
                state.status = "idle";
                state.errorMessage = null;
                state.fieldErrors = null;

                socketInstance.getSocket()?.disconnect();
                delete api.defaults.headers.common["Authorization"];
            })
            .addCase(logoutThunk.rejected, (state, action: any) => {
                state.errorMessage = action.payload?.errorMessage || "Logout failed";
            });
    },
});

export const { clearAuth, setAccessToken, setUser } = authSlice.actions;
export default authSlice.reducer;
