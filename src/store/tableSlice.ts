import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { APIResponseTypes } from '../interfaces/APITypes'

export interface TableState {
    table: APIResponseTypes[]
}

const initialState: TableState = {
    table: [],
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<APIResponseTypes[]>) => {
            state.table = action.payload 
        },
    },
})

// Action creators are generated for each case reducer function
export const { set } = tableSlice.actions

export default tableSlice.reducer