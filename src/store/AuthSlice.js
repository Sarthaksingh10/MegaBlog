import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status:false,
    userdata:null
}

const AuthSlice=createSlice({
   name:"Auth",
   initialState,
   reducers:{
    Login:(state,action)=>{
        state.status=true,
        state.userdata=action.payload.userdata
    },
    Logout:(state)=>{
        state.status=false,
        state.userdata=null
    }
   }
})

export const {Login,Logout}= AuthSlice.actions 
export default AuthSlice.reducer