import React from "react";
import {URLSearchParamsInit} from "react-router-dom";
import getArrayOfPageNumber from "../utils/getNumberOfPage";

interface PaginationPropsTypes {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: {
        replace?: boolean | undefined;
        state?: any;
    } | undefined) => void
    numberOfPage: number
    currentPage: number
}

function Pagination({setCurrentPage, setSearchParams, numberOfPage, currentPage}: PaginationPropsTypes) {

    function handleClick(page: number) {
        if (page >= numberList[0] && page <= numberList[numberList.length - 1]) {
            setCurrentPage(page - 1)
            setSearchParams(`page=${page}`)
        }
    }

    const numberList = getArrayOfPageNumber(numberOfPage)

    return (
        <div className="table__pagination">
            <div className="table__pagination-side" onClick={() => { handleClick(currentPage) }}>Назад</div>
            <div className="table__pagination-wrapper">
                {numberList.map((item, index) =>
                    <div className={index === currentPage ? 'pagination__button-active' : 'pagination__button'}
                        key={item} onClick={() => { handleClick(item) }}>{item}</div>)}
            </div>
            <div className="table__pagination-side" onClick={() => { handleClick(currentPage+2) }}>Вперед</div>
        </div>
    )
}

export default Pagination;