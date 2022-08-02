import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { APIResponseTypes } from '../interfaces/APITypes'

export interface TableState {
    table: APIResponseTypes[];
    sortedTable: APIResponseTypes[];
    searchedTable: APIResponseTypes[];
}

const initialState: TableState = {
    table: [],
    sortedTable: [],
    searchedTable: [],
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<APIResponseTypes[]>) => {
            state.table = action.payload 
        },
        searchTable: (state, action: PayloadAction<string>) => {
            state.searchedTable = state.table.filter(element => 
                element.body.toLowerCase().includes(action.payload.toLowerCase()) || 
                element.title.toLowerCase().includes(action.payload.toLowerCase()))
        },
        sortTable: (state, action: PayloadAction<{
            sortIdent: string;
            ascending: boolean;
        }>) => {
            if (action.payload.ascending === true) {
                state.sortedTable = [...state.searchedTable].sort(
                    (a, b) => (a[action.payload.sortIdent as keyof typeof a] > b[action.payload.sortIdent as keyof typeof b] ? -1 : 1))
            } else {
                state.sortedTable = [...state.searchedTable].sort(
                    (a, b) => (a[action.payload.sortIdent as keyof typeof a] < b[action.payload.sortIdent as keyof typeof b] ? -1 : 1))
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { set, searchTable, sortTable } = tableSlice.actions

export default tableSlice.reducer