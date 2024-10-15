import { configureStore } from "@reduxjs/toolkit";
import { EntrySlice } from "./features/entrySlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        entry: EntrySlice.reducer
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelection: TypedUseSelectorHook<typeof store.getState> = useSelector;