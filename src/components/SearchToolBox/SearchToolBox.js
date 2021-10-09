import { useEffect, useRef, useState } from "react"
import "./SearchToolBox.scss"
import { getAutoComplete } from "../../util/APIUtils"
import { Link } from "react-router-dom"
import React from 'react'


export default function SearchToolBox(props) {

    const result = props.result
    console.log("result-----------"+result)
    return (
        <div className="SearchToolBox">
            <div className="container">
                <ul className="tabs">
                    <li className="tab-link current" data-tab="tab-1">태그</li>
                    <li className="tab-link" data-tab="tab-2">유저</li>
                    <li className="tab-link" data-tab="tab-3">브랜드</li>
                </ul>
                <div id="tab-1" className="tab-content current">
                    <ol>
                        {result? result.map((resultList)=>(
                        <Link>{resultList}</Link>
                        )):null}
                    </ol>
                </div>
                <div id="tab-2" className="tab-content">tab content2</div>
                <div id="tab-3" className="tab-content">tab content3</div>
            </div>
        </div>
    )
};
