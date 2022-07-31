import React from "react";

interface PaginationPropTypes {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

function Pagination({setCurrentPage}:PaginationPropTypes) {

    return (
        <div className="table__pagination">
            <div>Назад</div>
            <div onClick={()=>setCurrentPage(0)}>1</div>
            <div onClick={() => setCurrentPage(1)}>2</div>
            <div onClick={() => setCurrentPage(2)}> 3</div>
            <div>Вперед</div>
        </div>
    )
}

export default Pagination;