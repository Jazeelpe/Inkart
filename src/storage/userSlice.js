import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    firstName: '',
    lastName: '',
    userId: '',
    mobile: '',
    email: '',
    profileimage: '',
    wishIds: [],
  },
  reducers: {
    LOGIN: (state, action) => {
      state.isLoggedIn = true;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.mobile = action.payload.mobile;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.profileimage = action.payload.profileimage;
    },
    SIGNOUT: state => {
      state.isLoggedIn = false;
      state.firstName = '';
      state.lastName = '';
      state.mobile = '';
      state.email = '';
      state.userId = '';
      state.profileimage = '';
    },
    UPDATE: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.mobile = action.payload.mobile;
      state.email = action.payload.email;
      state.profileimage = action.payload.profileimage;
    },
    UPDATEWISHIDS: (state, action) => {
      state.wishIds = action.payload;
    },
  },
});

export const {LOGIN, SIGNOUT, UPDATE, UPDATEWISHIDS} = userSlice.actions;
export default userSlice.reducer;
