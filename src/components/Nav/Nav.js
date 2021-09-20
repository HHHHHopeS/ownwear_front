import userEvent from "@testing-library/user-event";
import { Link } from "react-router-dom"
import { useUserDispatch, useUserState } from "../UserContext/UserContext";
import "./Nav.scss"
import SearchBar from "./SearchBar"

export default function Nav() {
    const {user} = useUserState();
    
    const dispatch = useUserDispatch();
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
                {!user ? (
                <li><Link to="/login" ><button>Login/Signup</button></Link></li>
                ):(
                    <div>
                        {user.userId}
                    </div>
                )}
            </ul>
            <div className="blur-section" onClick={loseSearchBar}>
                
            </div>
            </div>
            
        </div>
    )
};
