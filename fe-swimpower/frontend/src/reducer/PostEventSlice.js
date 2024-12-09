import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    postEvents: [],
    error: "",
}

export const getPostEvents = createAsyncThunk(
    "postEvents/GETpostEvents",
    async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/postEvent`
            )
            if (!response.ok) {
                throw new Error("Failed to fetch posts")
            }
            const result = await response.json();
            
            return result

        } catch (e) {
            console.log(e);
        }
    }
)


const allPostEventSlice = createSlice({
    name: "postEvents",
    initialState,
    reducers: [],
    extraReducers: (builder) => {
        builder
            .addCase(getPostEvents.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(getPostEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.postEvents = action.payload.postEvent || [];
            })
            .addCase(getPostEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Couldn't retrive posts";
            })
    }
})

export const allPostEvents = (state) => state.postEvents.postEvents
export const isPostEventLoading = (state) => state.postEvents.isLoading
export const errorPostEvent = (state) => state.postEvents.error

export default allPostEventSlice.reducer