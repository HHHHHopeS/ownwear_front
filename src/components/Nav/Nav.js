import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../common/UserContext";
import "./Nav.scss";
import SearchBar from "./SearchBar";
import logo from "../../res/logo.png";

export default function Nav(props) {
    const {user} = useContext(UserContext);
    


    function loseSearchBar() {
        document.querySelector(".blur-section").classList.remove("blur")
        document.querySelector(".blur-section").classList.add("noblur")
        setTimeout(()=>{
            document.querySelector(".blur-section").setAttribute("style","display:none")
        },500)
        document.querySelector(".SearchToolBox").classList.remove("active")
        document.querySelector(".SearchBar").classList.remove("active")
      }
    return(
        <div className="Nav">
            <div className="nav-section">
            <ul>
                <li><div className="search-bar-container">
                    <SearchBar />
                </div></li>
                <li><Link to="/"><button><img className="logo-image" src={logo} alt="logo" /></button></Link></li>
                {!user.auth ? (
                <li><Link to="/login" ><button>Login/Signup</button></Link></li>
                ):(
                        <div className="nav-after-login">
                    <li><Link to="/create"><button>create</button></Link></li>
                    <li><button>{user.info.username}</button></li>
                        <li><button onClick={props.onLogout}>Logout</button></li>
                        
                        </div>
                )}
            </ul>
            <div className="blur-section" onClick={loseSearchBar}>
                
            </div>
            </div>
            
        </div>
    )
};
