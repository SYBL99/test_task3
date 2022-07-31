import React, { useState } from "react";

function TableHeader() {
    const [nav, setNav] = useState({ID: true})

    return (
        <div className="table_header">
            <div className={nav.ID === true ? 'table__header active' : 'table__header'}
            onClick={()=>{setNav({...nav, ID: !(nav.ID)})}}
            >ID</div>
        </div>

    )
}

export default TableHeader;