import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../common/UserContext";
import exPhoto from "../../res/exPhoto.jpeg";
import logo from "../../res/logo.png";
import "./Nav.scss";
import SearchBar from "./SearchBar";

export default function Nav(props) {
  const { user } = useContext(UserContext);
  const [activeProfile, setActiveProfile] = useState(false);

  function loseSearchBar() {
    document.querySelector(".blur-section").classList.remove("blur");
    document.querySelector(".blur-section").classList.add("noblur");
    setTimeout(() => {
      document
        .querySelector(".blur-section")
        .setAttribute("style", "display:none");
    }, 500);
    document.querySelector(".SearchToolBox").classList.remove("active");
    document.querySelector(".SearchBar").classList.remove("active");
  }
  return (
    <div className="Nav">
      <div className="nav-section">
        <ul style={user.auth ? {} : { marginLeft: "-5%" }}>
          <li>
            <div className="search-bar-container">
              <SearchBar />
            </div>
          </li>
          <li>
            <Link to="/">
              <button>
                <img className="logo-image" src={logo} alt="logo" />
              </button>
            </Link>
          </li>
          {!user.auth ? (
            <li>
              <Link to="/login">
                <button>Login/Signup</button>
              </Link>
            </li>
          ) : (
            <div className="nav-after-login">
              {/* <li><Link to="/create"><button>create</button></Link></li> */}
              <li>
                <button
                  onMouseOver={setActiveProfile}
                  onMouseOut={() => {
                    setActiveProfile(false);
                  }}
                  className="profile-button"
                >
                  <img
                    src={user.info.userimg ? user.info.userimg : exPhoto}
                    alt="user-img"
                  />
                  {user.info.username}
                </button>
                <div onMouseOver={setActiveProfile}
                  onMouseOut={() => {
                    setActiveProfile(false);
                  }} className={activeProfile?"profile-box active":"profile-box"}>

                </div>
              </li>
              {/* <li><button onClick={props.onLogout}>Logout</button></li> */}
              <li>
                <button>
                  <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                </button>
              </li>
            </div>
          )}
        </ul>
        <div className="blur-section" onClick={loseSearchBar}></div>
      </div>
    </div>
  );
}
