import React from "react";
import { APIResponseTypes } from "../interfaces/APITypes";
interface PropsTypes{
    rows: APIResponseTypes[]
}

function TableRows({rows}:PropsTypes) {
    console.log(rows)
    if (rows === undefined) return <></>
    return (
        <>
            {rows.map(row => <div>{row.id}</div>)}
        </>
    )
}

export default TableRows;