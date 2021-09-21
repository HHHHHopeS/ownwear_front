import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../common/UserContext";
import "./Nav.scss";
import SearchBar from "./SearchBar";


export default function Nav(props) {
    const {user} = useContext(UserContext);
    


    function loseSearchBar() {
        document.querySelector(".blur-section").classList.remove("blur")
        document.querySelector(".blur-section").classList.add("noblur")
        setTimeout(()=>{
            document.querySelector(".blur-section").setAttribute("style","display:none")
        },500)
        document.querySelector(".SearchToolBox").classList.remove("active")
      }
    return(
        <div className="Nav">
            <div className="nav-section">
            <ul>
                <li><SearchBar /></li>
                <li><Link to="/"><button>オンウエア</button></Link></li>
                {!user.auth ? (
                <li><Link to="/login" ><button>Login/Signup</button></Link></li>
                ):(
                        <div className="">

                        <li><a onClick={props.onLogout}>Logout</a></li>
                        <li><a href="">{user.info.name}</a></li>
                        </div>
                )}
            </ul>
            <div className="blur-section" onClick={loseSearchBar}>
                
            </div>
            </div>
            
        </div>
    )
};
