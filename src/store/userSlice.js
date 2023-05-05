import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }) => {
    try {
      const response = await api.post(`/users/login`, {
        email: email,
        password: password,
      });
      const { data } = response;
      localStorage.setItem("token", `${data.token}`);
      console.log(localStorage["token"]);

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ email, password, username }) => {
 try{
  const response = await api.post(
    `/users/register`,

    { username: username, email: email, password: password }
  )
  const { data } = response;
  return data;
 }catch(e){
 return e
 }
  }
);
export const pathUser = createAsyncThunk(
  "users/pathUser",
  async ({ id, username, password }) => {
    if (password) {
      const response = await api.patch(`/users/${id}`, {
        username: username,
        password: password,
      });
      const { data } = response;
      console.log(data);
      return data;
    } else {
      const response = await api.patch(`/users/${id}`, {
        username: username,
      });
      const { data } = response;
      console.log(data);
      return data;
    }
  }
);
export const getUser = createAsyncThunk("users/getUser", async (id) => {
  const response = await api.get(`/users/${id}`);
  const { data } = response;
  console.log(data);

  return data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const response = await api.delete(`/users/${id}`);
  const { data } = response;
  console.log(data);
  return data;
});
export const newPasswordUser = createAsyncThunk(
  "users/newPasswordUser",
  async (email) => {
    const response = await api.post(`/users/password-reset`, {
      email,
    });
    const { data } = response;

    console.log(data);

    return data;
  }
);
export const userReducer = createSlice({
  name: "users",
  initialState: {
    user: null,
    userId: '',
    author: null,
    editUser:'',
    isAuth: null,
    status: null,
    error: '',
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (!action.payload.response) {
        state.user = action.payload;
        state.author = action.payload.user.username;
        state.isAuth = true;
        return;
      }

      state.error = action.payload.response.data.error;
    },

    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [registerUser.pending]: (state) => {
      state.status = "loading";
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      if (!action.payload.response) {
        state.status = "succeeded";
        state.user = action.payload;
        return;
      }
 console.log( action.payload);
      state.error =( typeof action.payload.response.data.error) === 'object'?action.payload.response.data.error.reduce((accum,current)=>{return accum + `${current.message} ,`},""):action.payload.response.data.error;
      return
    },
  },
  [registerUser.rejected]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [getUser.pending]: (state) => {
    state.status = "loading";
    state.isLoading = true;
  },
  [getUser.fulfilled]: (state, action) => {
    console.log(action.payload);

      state.status = "succeeded";

      state.editUser = action.payload;
      console.log(action.payload);

      
    },

  
  [getUser.rejected]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [pathUser.pending]: (state) => {
    state.status = "loading";
    state.isLoading = true;
  },
  [pathUser.fulfilled]: (state, action) => {
    state.isLoading = false;
    if (!action.payload.response) {
      state.status = "succeeded";
      state.user = action.payload;
      state.editUser = action.payload;
      return;
    }
    state.error = action.payload.response.data.error;
  },
  [pathUser.rejected]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [newPasswordUser.pending]: (state) => {
    state.status = "loading";
    state.isLoading = true;
  },
  [newPasswordUser.fulfilled]: (state, action) => {
    state.isLoading = false;
    if (!action.payload.response) {
      state.status = "succeeded";
      console.log(action.payload);
      return;
    }
    state.error = action.payload.response.data.error;
  },
  [newPasswordUser.rejected]: (state, action) => {
    state.isLoading = false;
    state.status = "failed";
    state.error = action.error.message;
  },
});
export const { setUser, setAuth, setId } = userReducer.actions;
export default userReducer.reducer;
