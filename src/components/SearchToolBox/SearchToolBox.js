import { useEffect, useRef, useState } from "react"
import "./SearchToolBox.scss"
import { getAutoComplete } from "../../util/APIUtils"
import { Link } from "react-router-dom"
import React from 'react'


export default function SearchToolBox(props) {
    const result = props.result
    console.log(result)
    
    const [active, setActive]=useState(0);
    const clickTab = (index)=>{
        setActive(index)
    }

    return (
        <div className="SearchToolBox">
            <div className="title-tab">
                <button className={active===0?"tabs active-tabs":"tabs"} onClick={()=>clickTab(0)}>Tag</button>
                <button className={active===1?"tabs active-tabs":"tabs"} onClick={()=>clickTab(1)}>User</button>
                <button className={active===2?"tabs active-tabs":"tabs"} onClick={()=>clickTab(2)}>Brand</button>
            </div>
            <div className="content-tab">
                <div className={active===0? "content active-contet":"content"}>tag결과</div>
                <div className={active===1? "content active-contet":"content"}>user</div>
                <div className={active===2? "content active-contet":"content"}>brand결과</div>
            </div>
        </div>
    )
};
