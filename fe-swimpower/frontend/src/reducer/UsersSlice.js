import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AllertError from "../components/Allert/AllertError/AllertError";
import jwt_decode from 'jwt-decode';






const initialState = {
    isLoading: false,
    users: null,
    authenticatedUser: (() => {
        try {
            const token = localStorage.getItem("token");
            return token ? jwt_decode(token) : null;
        } catch (error) {
            AllertError(error)
            return null;
        }
    })(),
    error: "",
};


export const getUsers = createAsyncThunk(
    "users/GETUsers",
    async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/user`
            )
            if (!response.ok) {
                throw new Error("Failed to fetch users")
            }
            const result = await response.json()
            return result
        } catch (error) {
            AllertError(error)
        }
    }
)



export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (loginForm) => {

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(loginForm)
            })

            if (!response.ok) {
                AllertError()
            }
            const data = await response.json()
            return data

        } catch (error) {
            AllertError(error)
        }
    }
)

const allUserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.authenticatedUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                const token = action.payload.token;
            
                if (token) {
                    const decodedToken = jwt_decode(token);
                    state.authenticatedUser = decodedToken;
                    localStorage.setItem("token", token); // Salva il token
                } else {
                    state.error = "Token non trovato nella risposta";
                }
            })
            
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Couldn't login user";
            })


            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.user || [];
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Couldn't retrive users"
            })

    }
})



export const { logoutUser } = allUserSlice.actions;

export const authenticatedUser = (state) => state.users.authenticatedUser;
export const allUsers = (state) => state.users.users


export const isUserLoading = (state) => state.users.isLoading
export const errorUser = (state) => state.users.error

export default allUserSlice.reducer