import React, { useState } from "react";

function TableHeader() {
    const [nav, setNav] = useState({'ID': false, 'Заголовок': true, 'Описание': false})
    function setActive(ident: keyof typeof nav) {
        setNav({ ...{ 'ID': false, 'Заголовок': false, 'Описание': false }, [ident]: !(nav[ident]) })
        console.log(nav)
    }
    return (
        <div className="table__head">
            <div className={nav.ID === true ? 'table__header id active' : 'table__header id'}
            onClick={()=>{setActive('ID')}}
            >{'ID'}</div>
            <div className={nav['Заголовок'] === true ? 'table__header active title ' : 'table__header title'}
                onClick={() => { setActive('Заголовок')}}
            >Заголовок</div>
            <div className={nav['Описание'] === true ? 'table__header active body ' : 'table__header body'}
                onClick={() => { setActive('Описание') }}
            >Описание</div>
        </div>

    )
}

export default TableHeader;