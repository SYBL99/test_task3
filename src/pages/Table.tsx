import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import getAllPosts from "../API/GetAllPosts";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import TableHeader from "../components/TableHeader";
import TableRows from "../components/TableRows";
import { APIResponseTypes } from "../interfaces/APITypes"

function Table () {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterQuery, setFilterQuery] = useState('')
    const [sort, setSort] = useState({ sortIdent: 'id', ascending: false })
    const [table, setTable] = useState<APIResponseTypes[]>([])
    const [searchedTabel, setSearchedTabel] = useState<APIResponseTypes[]>([])
    const [sortedTable, setSortedTable] = useState<APIResponseTypes[]>([])
    const [splitedTable, setSplitedTable] = useState<APIResponseTypes[][]>([])
    const [currentPage, setCurrentPage] = useState(0)

    async function getData(){
        try {
            const data = await getAllPosts()
            setTable(data)
        } catch (error) {
            alert(error)
        }
    }

    function applyFilter() {
        setSearchedTabel(table.filter(elem => elem.body.toLowerCase().includes(filterQuery.toLowerCase()) 
            || elem.title.toLowerCase().includes(filterQuery.toLowerCase())))
    }

    function applySort() {
        if (sort.ascending === true) {
            setSortedTable([...searchedTabel].sort(
                (a, b) => (a[sort.sortIdent as keyof typeof a] > b[sort.sortIdent as keyof typeof b] ? -1 : 1)))
        } else {
            setSortedTable([...searchedTabel].sort(
                (a, b) => (a[sort.sortIdent as keyof typeof a] < b[sort.sortIdent as keyof typeof b] ? -1 : 1)))
        }
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
    useEffect(() => { getData(); setURLParamsAndCurrentPage() }, [])
    useEffect(() => { applyFilter() }, [filterQuery, table])
    useEffect(() => { applySort() }, [searchedTabel])
    useEffect(() => { splitTableByLimit(10) }, [sortedTable])

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