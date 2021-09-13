import "./Nav.scss"
import {Link} from "react-router-dom"
import SearchBar from "./SearchBar"
export default function Nav() {
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
                <li><Link to="/login" ><button>Login/Signup</button></Link></li>
            </ul>
            <div className="blur-section" onClick={loseSearchBar}>
                
            </div>
            </div>
            
        </div>
    )
};
