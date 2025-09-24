import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connections",
    initialState: [],
    reducers: {
        addConnections: (state, action) => {
            return action.payload;
        }
    }
});

export default connectionSlice.reducer;
export const {addConnections} = connectionSlice.actions;