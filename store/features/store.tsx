import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./mode-slice";

export const store = configureStore({
    reducer: {
        modeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;