import React, { useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import Search from "../components/Search";
import TableHeader from "../components/TableHeader";

function Home () {
    const [searchParams, setSearchParams] = useSearchParams();
    const {data} = useParams()
    console.log(searchParams.getAll('foo'))
    async function getData (page: number) {
        const repsponse = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${searchParams.get('jopa') }`)
        const data = await repsponse.json()
        console.log(data)
    }
    useEffect(()=>{getData(1)},[])

    return(
        <div className="table">
            <Search/>
            <TableHeader/>
            <button onClick={()=>{setSearchParams('jopa=1&pama=2')}}>Жми</button>
            <button onClick={() => { setSearchParams('page=2') }}>2</button>
            <button onClick={() => { setSearchParams('page=3') }}>3</button>
        </div>
    )
}

export default Home