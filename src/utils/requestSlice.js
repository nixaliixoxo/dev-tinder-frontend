import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests: (state, action) => {
            return action.payload;
        }
    }
});

export default requestSlice.reducer;
export const {addRequests} = requestSlice.actions;