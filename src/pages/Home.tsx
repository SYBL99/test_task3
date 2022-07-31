import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import getAllPosts from "../API/GetAllPosts";
import Search from "../components/Search";
import TableHeader from "../components/TableHeader";
import TableRows from "../components/TableRows";
import { APIResponseTypes } from "../interfaces/APITypes"

function Home () {
    const [forCheck, setForCheck] = useState<APIResponseTypes[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const {data} = useParams()
    const [table, setTable] = useState<APIResponseTypes[]>([])
    const [splitedTable, setSplitedTable] = useState<APIResponseTypes[][]>([])
    console.log('чек из',forCheck)

    async function getData(){
        try {
            const data = await getAllPosts()
            setTable(data)
        } catch (error) {
            console.log(error)
        }
    }

    function splitTableByLimit(limit: number = 10) {
        let i = 0
        let splitedArray: APIResponseTypes[][] = [];
        while (table[i * limit] !== undefined) {
            splitedArray = [...splitedArray, table.slice(i * limit, i * limit + limit)]
            i++
        }
        setSplitedTable(splitedArray)
        setForCheck(splitedArray[0])
    }

    function setHomeSearchParams() {
        if (searchParams.get('page') === null) {
            setSearchParams('page=1')
        } 
    }
    
    useEffect(() => { splitTableByLimit(10) }, [table])
    useEffect(() => {getData() ; setHomeSearchParams()},[])


    return(
        <div className="table">
            <Search/>
            <TableHeader/>
            <button onClick={() => {console.log(splitedTable)}}>Жми</button>
            <button onClick={() => { setSearchParams('page=2') }}>2</button>
            <button onClick={() => { setSearchParams('page=3') }}>3</button>
            <TableRows rows={forCheck}/>
        </div>
    )
}

export default Home