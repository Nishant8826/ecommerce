import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, 
    loading:true
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUser(state, action) {
            state.user = action.payload;
            state.loading = false
        },
        clearUser(state) {
            state.user = null;
            state.loading = true;
        },
    },
});

export const { storeUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
