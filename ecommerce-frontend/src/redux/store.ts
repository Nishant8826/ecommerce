import { configureStore } from '@reduxjs/toolkit'
import { userAPI } from './api/userApi';


export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
    },
    middleware: (mid) => mid().concat(userAPI.middleware),
})