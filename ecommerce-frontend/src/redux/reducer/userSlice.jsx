import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
    token: Cookies.get('token') || null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUser(state, action) {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;

            Cookies.set('user', JSON.stringify(user), { expires: 1 });
            Cookies.set('token', token, { expires: 1 });
        },
        clearUser(state) {
            state.user = null;
            state.token = null;

            Cookies.remove('user');
            Cookies.remove('token');
        },
    },
});

export const { storeUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
