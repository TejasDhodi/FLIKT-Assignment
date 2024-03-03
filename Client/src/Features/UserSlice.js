import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: []
};

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.data = action.payload
        },
        removeUser: (state, action) => {
            state.data = state.data.filter(item => item._id !== action.payload.id);
        }
    }
});

export const { getUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;