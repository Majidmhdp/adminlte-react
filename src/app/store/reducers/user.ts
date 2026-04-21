import { IUser } from '@entities/user/types';
// import { User } from '@firebase/auth';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  currentUser: IUser | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (
      state: UserState,
      { payload }: { payload: IUser | null }
    ) => {
      state.currentUser = payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
