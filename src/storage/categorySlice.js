import {createSlice} from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: '',
  },
  reducers: {
    ADD_CATEGORY: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const {ADD_CATEGORY} = categorySlice.actions;
export default categorySlice.reducer;
