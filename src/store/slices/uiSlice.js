import { createSlice } from "@reduxjs/toolkit";

const defaultTheme =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const initialState = {
  theme: localStorage.getItem("theme") || defaultTheme,
  lang: localStorage.getItem("lang") || "en",
  currencyName: localStorage.getItem("currency") || "USD",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    setLang(state, action) {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload);
    },
    setCurrency(state, action) {
      state.currencyName = action.payload;
      localStorage.setItem("currency", action.payload);
    },
  },
});

export const { setTheme, setLang, setCurrency } = uiSlice.actions;
export default uiSlice.reducer;
