import { createSlice } from "@reduxjs/toolkit";


const appReducer = createSlice({
    name: "app",
    initialState: {
        isAppLoaded:false
    },
 reducers:{
    setIsAppLoaded(state){
        state.isAppLoaded=true
    }
    
 }
})
export const { setIsAppLoaded } = appReducer.actions;
    export default appReducer.reducer;