import { createSlice } from "@reduxjs/toolkit";

type mode = {
    mode: string;
};

const getInitialMode = (): string => {
    if (typeof localStorage !== "undefined") {
        return localStorage.getItem("mode") || "light";
    }
    return 'light';
}

const initialState: mode = {
    mode: getInitialMode(),
};

export const isMode = createSlice({
    name: "isMode",
    initialState,
    reducers: {
        isDark: (state, action) => {
            state.mode = action.payload;
        },
        isLight: (state, action) => {
            state.mode = action.payload;
        },
    },
});

export const { isDark, isLight } = isMode.actions;
export default isMode.reducer;