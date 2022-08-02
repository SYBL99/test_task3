import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { APIResponseTypes } from '../interfaces/APITypes'

export interface TableState {
    table: APIResponseTypes[]
    sortedTable: APIResponseTypes[]
}

const initialState: TableState = {
    table: [],
    sortedTable: [],
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<APIResponseTypes[]>) => {
            state.table = action.payload 
        },
        searchTable: (state, action: PayloadAction<string>) => {
            state.sortedTable = state.table.filter(element => 
                element.body.toLowerCase().includes(action.payload.toLowerCase()) || 
                element.title.toLowerCase().includes(action.payload.toLowerCase()))
        },
    },
})

// Action creators are generated for each case reducer function
export const { set, searchTable } = tableSlice.actions

export default tableSlice.reducer