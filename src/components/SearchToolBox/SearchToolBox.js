import { useEffect, useRef, useState } from "react"
import "./SearchToolBox.scss"
import { getAutoComplete } from "../../util/APIUtils"
import { Link } from "react-router-dom"
import React from 'react'


export default function SearchToolBox(props) {
    const results = props.results
    const setKeyword = props.setKeyword

    const [active, setActive] = useState(0);

    const clickTab = (index, e) => {
        setKeyword(e.currentTarget.innerText)
        setActive(index)
    }
    console.log(results)

    return (
        <div className="SearchToolBox">
            <div className="title-tab">
                <button className={active === 0 ? "tabs active-tabs" : "tabs"} onClick={(e) => clickTab(0,e)}>Tag</button>
                <button className={active === 1 ? "tabs active-tabs" : "tabs"} onClick={(e) => clickTab(1,e)}>User</button>
                <button className={active === 2 ? "tabs active-tabs" : "tabs"} onClick={(e) => clickTab(2,e)}>Brand</button>
            </div>
            <div className="content-tab">
                <div className={active === 0 ? "content active-content" : "content"}>
                    <ol>
                    {results?results.map((data,index)=>
                    <Link>{data.brandname}</Link>
                    ):"검색결과없음"}
                    </ol>
                </div>
                <div className={active === 1 ? "content active-content" : "content"}>aaa</div>
                <div className={active === 2 ? "content active-content" : "content"}>aaa</div>
            </div>
        </div>
    )
};
