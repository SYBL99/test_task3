import React from "react";
import { APIResponseTypes } from "../interfaces/APITypes";

interface TableRowPropsTypes{
    rows: APIResponseTypes[]
}

function TableRows({rows}:TableRowPropsTypes) {
    console.log(rows)
    if (rows === undefined) return <></>
    return (
        <>
            {rows.map(row => <div key={row.id} className="table__row">
                <div className="table__row-id">{row.id}</div>
                <div className="table__row-title">{row.title}</div>
                <div className="table__row-body">{row.body}</div>
            </div>)}
        </>
    )
}

export default TableRows;