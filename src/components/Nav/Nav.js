import {
  faAddressCard,
  faBell,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faSignOutAlt,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../common/UserContext";
import exPhoto from "../../res/exPhoto.jpeg";
import logo from "../../res/logo.png";
import "./Nav.scss";
import SearchBar from "./SearchBar";

export default function Nav(props) {
  const { user } = useContext(UserContext);
  const [activeProfile, setActiveProfile] = useState(false);
  const [activeAlert, setActiveAlert] = useState(false);
  const history = useHistory();
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
  function hoverIcon(e) {
    e.currentTarget.classList.add("active");
    //   e.currentTarget.children[0].children[0].classList.add("active")
    // e.currentTarget.children[1].classList.add("active")
  }
  function stopHover(e) {
    e.currentTarget.classList.remove("active");
    // e.currentTarget.children[0].children[0].classList.remove("active")
    // e.currentTarget.children[1].classList.remove("active")
  }
  useEffect(() => {
    if (activeProfile === 2) {
      setTimeout(function () {
        setActiveProfile(0);
      }, 300);
    }
    return false;
  }, [activeProfile]);
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
                <button>SingIn/Signup</button>
              </Link>
            </li>
          ) : (
            <div className="nav-after-login">
              {/* <li><Link to="/create"><button>create</button></Link></li> */}
              <li onMouseOver={setActiveProfile}>
                <button
                  onMouseOver={setActiveProfile}
                  className="profile-button"
                  onMouseOut={e => {
                    setActiveProfile(false);
                  }}
                >
                  <img
                    src={user.info.userimg ? user.info.userimg : exPhoto}
                    alt="user-img"
                  />
                  {user.info.username}
                </button>
                <div
                  onMouseOut={e => {
                    setActiveProfile(false);
                  }}
                  className={
                    activeProfile
                      ? "profile-box active"
                      : "profile-box unactive"
                  }
                >
                  <div
                    className="button-container"
                    onClick={() =>
                      history.push("/profile/" + user.info.username)
                    }
                    onMouseOver={e => hoverIcon(e)}
                    onMouseOut={e => stopHover(e)}
                  >
                    <div className="left">
                      <FontAwesomeIcon icon={faAddressCard} />

                      <button> Profile</button>
                    </div>
                    <FontAwesomeIcon
                      className="arrow-icon"
                      icon={faArrowRight}
                    />
                  </div>

                  <div
                    className="button-container"
                    onClick={() => history.push("/create")}
                    onMouseOver={e => hoverIcon(e)}
                    onMouseOut={e => stopHover(e)}
                  >
                    <div className="left">
                      <FontAwesomeIcon icon={faPlusSquare} />

                      <button>Create</button>
                    </div>
                    <FontAwesomeIcon
                      className="arrow-icon"
                      icon={faArrowRight}
                    />
                  </div>
                  <div
                    className="button-container"
                    onClick={() => {
                      history.push("/mypage/" + user.info.username);
                    }}
                    onMouseOver={e => hoverIcon(e)}
                    onMouseOut={e => stopHover(e)}
                  >
                    <div className="left">
                      <FontAwesomeIcon icon={faSlidersH} />

                      <button>Account Settings</button>
                    </div>
                    <FontAwesomeIcon
                      className="arrow-icon"
                      icon={faArrowRight}
                    />
                  </div>
                  <div
                    onClick={props.onLogout}
                    className="button-container"
                    onMouseOver={e => hoverIcon(e)}
                    onMouseOut={e => stopHover(e)}
                    onClick={props.onLogout}
                  >
                    <div className="left">
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      <button> Logout</button>
                    </div>
                    <FontAwesomeIcon
                      className="arrow-icon"
                      icon={faArrowRight}
                    />
                  </div>
                </div>
              </li>
              {/* <li><button onClick={props.onLogout}>Logout</button></li> */}
              <li
                onMouseOver={setActiveAlert}
                onMouseOut={e => {
                  setActiveAlert(false);
                }}
              >
                <button>
                  <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                </button>
                <div
                  onMouseOut={e => {
                    setActiveAlert(false);
                  }}
                  className={
                    activeAlert ? "alert-box active" : "alert-box unactive"
                  }
                ></div>
              </li>
            </div>
          )}
        </ul>
        <div className="blur-section" onClick={loseSearchBar}></div>
      </div>
    </div>
  );
}
