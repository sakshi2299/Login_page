import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};



export const loginUser =  createAsyncThunk(
  'user/loginUser',
  async (payload:{email:string, password:string}, thunkAPI) => {

    try {
      const response = await axios.post('https://your-login-api-endpoint', payload);
      const user: User = response.data;
      return user;
    } catch (error) {
      throw new Error('Authentication failed. Please try again.');
    }
  }
);

export const registerUser = createAsyncThunk<User, User>(
  'user/registerUser',
  async (user) => {
    try {
      const response = await axios.post('https://your-registration-api-endpoint', user);
      const registeredUser: User = response.data;
      return registeredUser;
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Authentication failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      });
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
