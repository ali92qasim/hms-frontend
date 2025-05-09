import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios'; 

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('api/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const validateToken = createAsyncThunk(
  'auth/validateToken',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      conosle.log("i was called");
      const response = await axios.get('/me'); // or your token validation endpoint
      return response.data;
    } catch (error) {
      dispatch(logout());
      return rejectWithValue('Invalid token');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  },  
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setCredentials: (state, action) => {
      state.user = action.payload.data.attributes;
      state.token = action.payload.data.meta.token;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.attributes;
        state.token = action.payload.data.meta.token;
        localStorage.setItem('token', action.payload.data.meta.token);
        localStorage.setItem('user', JSON.stringify(action.payload.data.attributes));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.data?.message || 'Login failed';
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.user = action.payload.data.attributes;
        state.token = localStorage.getItem('token');
      })
      .addCase(validateToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      });
  }
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
