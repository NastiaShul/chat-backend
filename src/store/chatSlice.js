import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";



export const chatRoom = createAsyncThunk(
    "chats/chatRoom",
    async ({idRoom}) => {
        console.log(idRoom);
      const response = await api.get(`/rooms/${idRoom}/messages`)
 const{data}=response
      // console.log(data);
      return data
    
    },
   
  );
  export const getRoom = createAsyncThunk(
    "chats/getRoom",
    async ({idRoom}) => {
      const response = await api.get(`/rooms/${idRoom}`);
      const {data}= response;
      // console.log(data);
      return data;
    },
   
  );

 const chatReducer = createSlice({
    name: "chats",
    initialState: {
     room: null,
   chatRoom:null,
      status:null,
      error: null,
    },
    extraReducers: {
        [chatRoom.pending]: (state) => {
          state.status = "loading";
          state.error = null;
        },
        [chatRoom.fulfilled]: (state, action) => {
          state.status = "succeeded";
          state.room =action.payload
        //  console.log(action.payload);
    
        },
        [chatRoom.rejected]: (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        },
        [getRoom.pending]: (state) => {
            state.status = "loading";
            state.error = null;
          },
          [getRoom.fulfilled]: (state, action) => {
            state.status = "succeeded";
            // state.chatRoom=action.payload.messages
            state.room =action.payload
    
      
          },
          [getRoom.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          }
    }
})

    export default chatReducer.reducer;