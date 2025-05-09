import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isAdmin: false,
    isAuthLoading: true,
    isAuthenticated: false,
    isLoading: false,
    user: null,
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
            console.log("hi");
            
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        // Check For Authentication
        .addCase(checkAuth.pending, (state, action) => {
            // state.isAuthLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.isAuthLoading = false;
            console.log(action.payload?.data);
            
            if(action.payload?.data?.success == true) state.isAuthenticated = true;
            // state.isAuthenticated = true;
            // state.user = action.payload?.success;
        })
        .addCase(checkAuth.rejected, (state, action) => {
            state.isAuthLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(logOutUser.fulfilled, (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
        })
    }
})


// Asynchronous Actions Thunks
export const registerUser = createAsyncThunk('auth/registerUser',
    async (formData) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`,
            formData,
            {
                withCredentials: true
            });
            // console.log(response);
            return response.data;
    })

export const loginUser = createAsyncThunk('auth/loginUser',
    async (formData) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,
            formData,
            {
                withCredentials: true
            });
            return response.data;
    })

export const checkAuth = createAsyncThunk('auth/checkAuth',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/check-auth`,
            {
                withCredentials: true
            });
            // console.log(response.data);
            return response;
    })

export const logOutUser = createAsyncThunk('auth/logOutUser',
    async (formData) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`,
            formData,
            {
                withCredentials: true
            });
            return response.data;
    })


export const { setUser, setIsAdmin } = authSlice.actions;

export default authSlice.reducer;