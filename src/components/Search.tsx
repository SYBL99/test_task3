import React from "react";

interface SearchPropsTypes {
    filterQuery: string;
    setFilterQuery: React.Dispatch<React.SetStateAction<string>>;
    }

function Search({filterQuery, setFilterQuery }:SearchPropsTypes) {
    function inputHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setFilterQuery(event.target.value)
    }
    return (
        <div className="search">
            <input placeholder="Поиск" value={filterQuery} onChange={inputHandler}/>
            <svg fill="#FFFFFF" viewBox="0 0 30 30" width="22px" height="22px"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" /></svg>
        </div>
    )
}

export default Search;