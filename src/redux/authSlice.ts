import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: { email: string; token: string } | null;
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('userEmail');
  if (token && email) {
    return { user: { email, token } };
  }
  return { user: null };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.user = action.payload;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userEmail', action.payload.email);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
