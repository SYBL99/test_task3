import React, { useEffect, useState } from "react";

interface TableHeaderPropsTypes {
    setSort: React.Dispatch<React.SetStateAction<{
        sortIdent: string;
        ascending: boolean;
    }>>
    applySort(): void;
}

function TableHeader({setSort, applySort}:TableHeaderPropsTypes) {
    const [nav, setNav] = useState({ 'id': false, 'title': false, 'body': false })

    useEffect(() => { applySort() /* eslint-disable-next-line react-hooks/exhaustive-deps*/ }
    , [nav])

    function setActive(ident: keyof typeof nav) {
        setSort({ sortIdent: ident, ascending: !(nav[ident]) })
        setNav({ ...{ 'id': false, 'title': false, 'body': false }, [ident]: !(nav[ident]) })
    }
    return (
        <div className="table__head">
            <div className={nav.id === true ? 'table__header id active' : 'table__header id'}
            onClick={()=>{setActive('id')}}
            >{'ID'}</div>
            <div className={nav.title === true ? 'table__header active title ' : 'table__header title'}
                onClick={() => { setActive('title')}}
            >Заголовок</div>
            <div className={nav.body === true ? 'table__header active body ' : 'table__header body'}
                onClick={() => { setActive('body') }}
            >Описание</div>
        </div>

    )
}

export default TableHeader;