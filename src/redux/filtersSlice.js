import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

export const selectNameFilter = (state) => state.filters.name;

const slice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { changeFilter } = slice.actions;

export default slice.reducer;