import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Features/UserSlice";

const Store = configureStore({
    reducer: {
        User: UserSlice,
    }
})

export default Store;