import { faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { Breadcrumb } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import "./SubNav.scss"

export default function SubNav(props) {

    const location = useLocation()
    
    useEffect(() => {
        const className = location.pathname.replace("/","")
        if(document.querySelector(".SubNav").classList.length>1){
        document.querySelector(".SubNav").classList.remove(document.querySelector(".SubNav").classList[1])
    }     
        console.log(className)
        if(className){
            document.querySelector(".SubNav").classList.add(className)
        }
    
    }, [location])
    return(
    <div className="SubNav">
        <div className="main">
            
            <div className="buttons-section">
                <button className="subnav-btn-all">ALL</button>
                <button className="subnav-btn-men">MEN</button>
                <button className="subnav-btn-women">WOMEN</button>
            </div>
        </div>
        <div className="login">
            <div className="subnav-breadcrumb-section">
                <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <FontAwesomeIcon icon={faHome} />
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                LOGIN&SIGNUP
                </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="subnav-main-section">
                <h1>
                    LOGIN/SIGNUP
                </h1>
            </div>
        </div>
        <div className="detail">
        <div className="subnav-breadcrumb-section">
                <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <FontAwesomeIcon icon={faHome} />
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                ProfileName
                </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="subnav-main-section">
                <h1>
                    UserProfileIMGwithProfileName
                </h1>
            </div>
        </div>
        <div className="ranking">ranking</div>
        <div className="profile">profile</div>
        <div className="mypage">mypage</div>
        <div className="list">

        </div>
    </div>
    )
};
