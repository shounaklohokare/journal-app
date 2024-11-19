import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios';
import { API_ID, API_KEY } from "../../utils/api_details";
import { decrypt } from "../../utils/utils";

// Journal Entry
export interface Entry {
    entry_id: string
    user_id: string
    title: string
    content: string
    created: string
    updated: string
}

export interface DeleteEntryInput {
    entry_id: string
    user_id: string
}

export interface EntryState {
    isAuthenticated : boolean
    user_id: string
    entries: Entry[]
}

interface RootState {
    entry : EntryState
}


const initialState: EntryState = {
    isAuthenticated : false,
    user_id : "",
    entries: [],
}

const headers = {
    'x-api-key': API_KEY
}


export const fetchEntry = createAsyncThunk("entry/fetch", async (_, thunkAPI) => {

    console.log(thunkAPI.getState())

    const { entry: { user_id } } = thunkAPI.getState() as RootState;
 
    const res = await axios.get(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/get-entries/${user_id}`, { headers: headers })

    return res.data

})

export const putEntry = createAsyncThunk(
    'users/putEntry',
    async (entry: Entry) => {

        const res = await axios.post(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/create-update-entry`, entry, { headers: headers })

        return res.status;
    }
);

export const deleteEntry = createAsyncThunk(
    'users/deleteEntry',
    async (entry: DeleteEntryInput) => {

        const res = await axios.post(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/delete-entry`, entry, { headers: headers })

        return res.status;
    }
);


export const EntrySlice = createSlice({
    name: "entry",
    initialState,
    reducers: {
        addEntry: (state, action: PayloadAction<{ title: string, content: string, created_at: string, updated_at: string, user_id : string }>) => {
            state.entries.push({
                entry_id: String(state.entries.length + 1),
                user_id:action.payload.user_id,
                title: action.payload.title,
                content: action.payload.content,
                created: action.payload.created_at,
                updated: action.payload.updated_at,
            })
        },
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.user_id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEntry.fulfilled, (state, action) => {

            const res: Entry[] = (action.payload as Entry[]).map((e) => ({
                ...e,
                title: decrypt(e.title),
                content: decrypt(e.content),
            }));

            state.entries = res;
        })
    }
})

export default EntrySlice.reducer;
export const { addEntry,  setAuthenticated, setUsername} = EntrySlice.actions;
