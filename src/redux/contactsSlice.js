import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";

const initialState = {
  items: [],
  loading: false,
  error: null,
};
const selectFilter = (state) => state.filters.name;
const selectContacts = (state) => state.contacts.items;
export const selectFilteredContacts = createSelector(
  [selectFilter, selectContacts],
  (filter, contacts) =>
    !filter.trim()
      ? contacts
      : contacts.filter(({ name }) =>
          name.toLowerCase().includes(filter.toLowerCase())
        )
);

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: "contacts",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(
          (contacts) => contacts.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export default slice.reducer;