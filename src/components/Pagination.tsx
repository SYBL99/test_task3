import React from "react";
import {URLSearchParamsInit} from "react-router-dom";

interface PaginationPropTypes {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: {
        replace?: boolean | undefined;
        state?: any;
    } | undefined) => void
}

function Pagination({setCurrentPage, setSearchParams}:PaginationPropTypes) {

    return (
        <div className="table__pagination">
            <div>Назад</div>
            <div onClick={()=>{ setCurrentPage(0);setSearchParams('page=1') }}>1</div>
            <div onClick={() => { setCurrentPage(1); setSearchParams('page=2') }}>2</div>
            <div onClick={() => { setCurrentPage(2); setSearchParams('page=3') }}>3</div>
            <div>Вперед</div>
        </div>
    )
}

export default Pagination;