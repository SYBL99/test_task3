import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import getAllPosts from "../API/GetAllPosts";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import TableHeader from "../components/TableHeader";
import TableRows from "../components/TableRows";
import { APIResponseTypes } from "../interfaces/APITypes";
import type { RootState } from '../store/Store'
import { useSelector, useDispatch } from 'react-redux'
import { searchTable, set, sortTable } from '../store/tableSlice'

function Table () {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterQuery, setFilterQuery] = useState('')
    const [sort, setSort] = useState({ sortIdent: 'id', ascending: false })
    const table = useSelector((state: RootState) => state.table.table)
    const searchedTabel = useSelector((state: RootState) => state.table.searchedTable)
    const sortedTable = useSelector((state: RootState) => state.table.sortedTable)
    const [splitedTable, setSplitedTable] = useState<APIResponseTypes[][]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const dispatch = useDispatch()
    
    async function getData(){
        try {
            const data = await getAllPosts()
            dispatch(set(data))
        } catch (error) {
            alert(error)
        }
    }

    function applyFilter() {
        dispatch(searchTable(filterQuery))
    }

    function applySort() {
        dispatch(sortTable(sort))
        setCurrentPage(0)
        setSearchParams('page=1')
    }

    function splitTableByLimit(limit: number = 10) {
        let i = 0
        let splitedArray: APIResponseTypes[][] = [];
        while (sortedTable[i * limit] !== undefined) {
            splitedArray = [...splitedArray, sortedTable.slice(i * limit, i * limit + limit)]
            i++
        }
        setSplitedTable(splitedArray)
    }

    function setURLParamsAndCurrentPage() {
        if (searchParams.get('page') === null) {
            setSearchParams('page=1')
            setCurrentPage(0)
        } else {
            setCurrentPage(+(searchParams.get('page')||1)-1)
        }
    }
    
    useEffect(() => { getData(); setURLParamsAndCurrentPage() /* eslint-disable-next-line react-hooks/exhaustive-deps*/ }
    , [])
    useEffect(() => {applyFilter() /* eslint-disable-next-line react-hooks/exhaustive-deps*/ }
    , [filterQuery, table])
    useEffect(() => { applySort() /* eslint-disable-next-line react-hooks/exhaustive-deps*/ }
    , [searchedTabel])
    useEffect(() => { splitTableByLimit(10) /* eslint-disable-next-line react-hooks/exhaustive-deps*/ }
    , [sortedTable])

    return(
        <div className="table">
            <Search filterQuery={filterQuery} setFilterQuery={setFilterQuery}/>
            <TableHeader setSort={setSort} applySort={applySort}/>
            <TableRows rows={splitedTable[currentPage]}/>
            <Pagination setCurrentPage={setCurrentPage} setSearchParams={setSearchParams} 
            numberOfPage={splitedTable.length} currentPage={currentPage}/>
        </div>
    )
}

export default Table