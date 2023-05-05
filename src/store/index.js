import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./roomsSlice"
import userReducer from "./userSlice"
import chatReducer from "./chatSlice";
import appReducer from "./appSlice"

export default configureStore({
  reducer: {
    rooms: roomsReducer,
    users: userReducer,
    chats:chatReducer,
    app:appReducer

  },

});