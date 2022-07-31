import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import getAllPosts from "../API/GetAllPosts";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import TableHeader from "../components/TableHeader";
import TableRows from "../components/TableRows";
import { APIResponseTypes } from "../interfaces/APITypes"

function Home () {
    const [forCheck, setForCheck] = useState<APIResponseTypes[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState({ filterQuery: '', filterIdent: 'id', ascending: false })
    const {data} = useParams()
    const [table, setTable] = useState<APIResponseTypes[]>([])
    const [searchedTabel, setSearchedTabel] = useState<APIResponseTypes[]>([])
    const [splitedTable, setSplitedTable] = useState<APIResponseTypes[][]>([])
    const [currentPage, setCurrentPage] = useState(0)

    async function getData(){
        try {
            const data = await getAllPosts()
            setTable(data)
        } catch (error) {
            console.log(error)
        }
    }

    function applyFilter() {
        setSearchedTabel(table.filter(elem => elem.body.toLowerCase().includes(filter.filterQuery.toLowerCase())))
    }

    function applySort() {
        let buff = [...searchedTabel].sort((a, b) => (a.id > b.id ? -1 : 1))
        console.log(buff)
        setSearchedTabel(buff)
    }

    function splitTableByLimit(limit: number = 10) {
        console.log('вызываю сплит')
        let i = 0
        let splitedArray: APIResponseTypes[][] = [];
        while (searchedTabel[i * limit] !== undefined) {
            splitedArray = [...splitedArray, searchedTabel.slice(i * limit, i * limit + limit)]
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
    useEffect(() => { applyFilter() }, [filter, table])
    useEffect(() => { splitTableByLimit(10) }, [searchedTabel])
    useEffect(() => { console.log(currentPage) }, [currentPage])



    return(
        <div className="table">
            <Search filter={filter} setFilterQuery={setFilter}/>
            <TableHeader/>
            <button onClick={() => {console.log(splitedTable)}}>Жми</button>
            <button onClick={() => { applySort() }}>Фильтр</button>
            <TableRows rows={splitedTable[currentPage]}/>
            <Pagination setCurrentPage={setCurrentPage} setSearchParams={setSearchParams}/>
        </div>
    )
}

export default Home