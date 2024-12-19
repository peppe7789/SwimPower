import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AllertError from "../components/Allert/AllertError/AllertError";

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
            AllertError(e)
        }
    }
)

export const deletePostEvents = createAsyncThunk(
    "postEvents/DELETEpostEvents",
    async (postEventId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/postEvent/delete/${postEventId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete post");
            }
            const result = await response.json();
            
            return result;
        } catch (error) {
            AllertError(error)
        }
    }
);

export const updatePostImage = createAsyncThunk(
    "postEvents/updatePostImage",
    async ({ postEventId, formData }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/postEvent/uploadImg/${postEventId}/img`,
                {
                    method: "PATCH",
                    body: formData,
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update image");
            }
            const data = await response.json();
            return {
                postEvent: postEventId, 
                updatedPost: data.result 
            };
        } catch (error) {
            AllertError(error)
        }
    }
);


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

            .addCase(deletePostEvents.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(deletePostEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.postEvents = state.postEvents.filter(
                    (post) => post._id !== action.meta.arg
                );
            })
            .addCase(deletePostEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Couldn't delete the post";
            })
            .addCase(updatePostImage.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(updatePostImage.fulfilled, (state, action) => {
                state.isLoading = false;
                if (!action.payload.updatedPost) {
                    AllertError();
                    return;
                }
                const index = state.postEvents.findIndex(
                    (post) => post._id === action.payload.updatedPost._id
                );
                if (index !== -1) {
                    state.postEvents[index] = {
                        ...state.postEvents[index],
                        ...action.payload.updatedPost,
                    };
                } else {
                    AllertError()
                }
            })
            
            
            .addCase(updatePostImage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to update post image";
            })
    }
})

export const allPostEvents = (state) => state.postEvents.postEvents
export const isPostEventLoading = (state) => state.postEvents.isLoading
export const errorPostEvent = (state) => state.postEvents.error

export default allPostEventSlice.reducer