import { useEffect, useRef, useState } from "react"
import "./SearchToolBox.scss"
export default function SearchToolBox() {
    
    useEffect(()=>{

    })
    return(
        <div className="SearchToolBox">
            <div className="container">
                <ul className="tabs">
                    <li className="tab-link current" data-tab="tab-1">코디</li>
                    <li className="tab-link" data-tab="tab-2">유저</li>
                    <li className="tab-link" data-tab="tab-3">브랜드</li>
                </ul>
                <div id="tab-1" className="tab-content current">tab content1</div>
                <div id="tab-2" className="tab-content">tab content2</div>
                <div id="tab-3" className="tab-content">tab content3</div>
            </div>
        </div>
    )
};
