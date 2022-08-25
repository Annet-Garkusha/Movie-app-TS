import { configureStore } from "@reduxjs/toolkit";
import movieReduser from './MovieSlice'

const store = configureStore({
    reducer : {
       movie: movieReduser, 
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch