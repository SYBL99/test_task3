import React, { useEffect, useState } from "react";

function useSearch () {
    const [input, setInput] = useState([]);
    const [searchQuery, setSearchQuery] = useState('')
    const [searched, setSearched] = useState([])
    useEffect(() => {setSearched(input.filter(elem => elem.name.toLowerCase().includes(searchQuery.toLowerCase())))}
        ,[input, searchQuery])

    return [searchQuery, setSearchQuery, setInput, searched]
}
export default useSearch 