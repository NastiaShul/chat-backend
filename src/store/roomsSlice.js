import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { api } from "./api";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  try {
    const response = await api.get("/rooms/own");
    const { data } = response;
    // console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
});

export const getRoom = createAsyncThunk("rooms/getRoom", async ({ id }) => {
  try {
    const response = await api.get(`/rooms/${id}`);
    const { data } = response;
    // console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchPublicRooms = createAsyncThunk(
  "rooms/fetchPublicRooms",
  async () => {
    try {
      const response = await api.get("/rooms");
      const { data } = response;
      // console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const editRooms = createAsyncThunk(
  "rooms/editRooms",
  async ({ id, topic, body }) => {
    const response = await api.patch(
      `${process.env.REACT_APP_API_URL}/rooms/${id}`,
      {
        name: topic,
        description: body,
      }
    );

    return response.json();
  }
);

export const deleteRoom = createAsyncThunk(
  "rooms/deleteRooms",
  async ({ id }) => {
    const response = await api.delete(`rooms/${id}`);
    return response.json();
  }
);

export const createRoom = createAsyncThunk(
  "rooms/createRooms",
  async ({ topic, body, setActive }) => {
    try {
      if (body) {
        const response = await api.post(`/rooms`, {
          name: topic,
          description: body,
        });
        const newRoom = response?.data;
        setActive(false);

        return newRoom;
      } else {
        const response = await api.post(`/rooms`, {
          name: topic,
        });
        const newRoom = response?.data;
        setActive(false);

        return newRoom;
      }
    } catch {
      console.log("Error editing room");
    }
  }
);

export const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    roomCore: null,
    rooms: [],
    public: [],
    isPublicRoomLoading: false,
   publicRoomsError: '',
    idRoom: null,
    room: null,
    status: null,
    error: null,
  },
  reducers: {
    setRoom: (state, action) => {
      state.room = action.payload;
    },
    setIdRoom: (state, action) => {
      state.idRoom = action.payload;
    },
  },
  extraReducers: {
    [fetchRooms.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchRooms.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.rooms = action.payload;
    },
    [fetchRooms.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [editRooms.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [editRooms.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // state.room = action.payload;
      console.log(action.payload);
    },
    [editRooms.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [deleteRoom.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [deleteRoom.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // state.room = action.payload;
      console.log(action.payload);
    },
    [deleteRoom.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchPublicRooms.pending]: (state) => {
      state.status = "loading";
      state.error = null;
      state.isPublicRoomLoading=true;
    },
    [fetchPublicRooms.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.public = action.payload;
      state.isPublicRoomLoading=false;
    },
    [fetchPublicRooms.rejected]: (state, action) => {
      state.status = "failed";
      state.publicRoomsError = action.error.message;

    },
    [getRoom.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getRoom.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.roomCore = action.payload;
    },
    [getRoom.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [createRoom.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [createRoom.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.rooms = [...state.rooms, action.payload];
    },
    [createRoom.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});
export const { setRoom, setIdRoom } = roomsSlice.actions;
export default roomsSlice.reducer;

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getPublicRooms = () => useSelector((state) => state.rooms.public);
