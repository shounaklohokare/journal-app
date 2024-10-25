import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios';
import { API_ID, API_KEY } from "../../utils/api_details";

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

const headers = {
    'x-api-key': API_KEY
}

export const fetchEntry = createAsyncThunk("entry/fetch", async (thunkAPI) => {

    // To add call to the Lambda function to get journal entries from DynamoDB
    const res = await axios.get(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/get-journal-entries`, { headers: headers })

    return res.data

})

export const putEntry = createAsyncThunk(
    'users/putEntry',
    async (entry: Entry, thunkAPI) => {

        const res = await axios.post(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/get-journal-entries`, entry, { headers: headers })

        return res.data;
    }
);


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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEntry.fulfilled, (state, action) => {
            state.entries = action.payload;
        })
    }
})

export default EntrySlice.reducer;
export const { addEntry } = EntrySlice.actions;