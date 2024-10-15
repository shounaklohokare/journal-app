import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Journal Entry
export interface Entry {
    id: string
    title: string
    content: string
    created_at: string
    updated_at: string
}

interface EntryState {
    entries: Entry[]
}

const initialState: EntryState = {
    entries: [],
}

export const EntrySlice = createSlice({
    name: "entry",
    initialState,
    reducers: {
        addEntry: (state, action: PayloadAction<{ title: string, content: string, created_at: string, updated_at: string }>) => {
            state.entries.push({
                id: String(state.entries.length + 1),
                title: action.payload.title,
                content: action.payload.content,
                created_at: action.payload.created_at,
                updated_at: action.payload.updated_at,
            })
        }
    }

})

export default EntrySlice.reducer;
export const { addEntry } = EntrySlice.actions;