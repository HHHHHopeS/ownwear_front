import {
    faAddressCard,
    faBell,
    faPlusSquare
} from "@fortawesome/free-regular-svg-icons";
import {
    faArrowRight, faBell as fsBell, faSignOutAlt,
    faSlidersH, faSyncAlt, faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-s-alert";
import LoadingIndicator from "../../common/LoadingIndicator";
import { UserContext } from "../../common/UserContext";
import exPhoto from "../../res/exPhoto.jpeg";
import logo from "../../res/logo.png";
import { getAlertList, setAlertChecked } from "../../util/APIUtils";
import { calculateDatetime } from "../../util/TimeUtils";
import "./Nav.scss";
import SearchBar from "./SearchBar";
export default function Nav(props) {
  const { user } = useContext(UserContext);
  const [activeProfile, setActiveProfile] = useState(false);
  const [activeAlert, setActiveAlert] = useState(false);
  const [loading,setLoading] = useState(false)
  const [keyword, setKeyword] = useState(null)
  const [alertList, setAlertList] = useState([
    {
      alertid:1,
      type: "like",
      post_no: "1",
      username: "카리나",
      userimg: exPhoto,
      date: "1900-10-5 13:01:00",
    },
    {
      alertid:2,
      type: "comment",
      post_no: "1",
      username: "카리나",
      userimg: exPhoto,
      date: "2021-10-01 00:00:00",
    },
    {
      alertid:3,
      type: "follow",
      post_no: "1",
      username: "카리나",
      userimg: exPhoto,
      date: "2010-11-11 00:00:00",
    },
  ]);

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
    setKeyword(null)
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
  function AlertList() {
    const clear = (index,alertid) => {
      setAlertChecked(alertid).then(response=>{if(response){setAlertList(alertList.slice(0, alertList.remove - 1).splice(index, 1))}}).catch(err=>console.log(err))
    };
    const FigureType = props => {
      const content = props.content;
      const index = props.index;
      const time = calculateDatetime(content.date);
      if (content.type === "like") {
        return (
          <span>
            <Link
              onClick={e => {
                e.stopPropagation();
                clear(index,content.alertid);
              }}
              to={"/profile/" + content.username}
            >
              {content.username}님
            </Link>
            이 게시글에 좋아요를 눌러써요 <i>{time}</i>
          </span>
        );
      }
      if (content.type === "follow") {
        return (
          <span>
            <Link
              onClick={e => {
                e.stopPropagation();
                clear(index,content.alertid);
              }}
              to={"/profile/" + content.username}
            >
              {content.username}님
            </Link>
            이 팔로우를 해써요 <i>{time}</i>
          </span>
        );
      }
      if (content.type === "comment") {
        return (
          <span>
            <Link
              onClick={e => {
                e.stopPropagation();
                clear(index,content.alertid);
              }}
              to={"/profile/" + content.username}
            >
              {content.username}님
            </Link>
            이 댓글을 다라써여 <i>{time}</i>
          </span>
        );
      } else {
        return null;
      }
    };

    return alertList.map((content, index) => (
      <div key={index} className="alert-item-container">
        <div className="alert-item-main">
          <div
            className="left"
            onClick={
              content.type === "follow"
                ? null
                : (e, index) => {
                    clear(index,content.alertid);
                    history.push(`/detail/${content.post_no}`);
                  }
            }
          >
            <div className="profile-image-section">
              <Link onClick={e=>{clear(index,content.alertid);e.stopPropagation()}} to={"/profile/"+content.username}>
              <img src={content.userimg} alt="" />
              </Link>
            </div>
            <div className="content-section">
              <FigureType index={index} content={content} />
            </div>
          </div>
          <div className="right">
            <div onClick={() => clear(index,content.alertid)} className="button-section">
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        </div>
      </div>
    ));
  }

  function getList(){
    setLoading(true)
    getAlertList(user.info.userid).then(response=>setAlertList(response)).then(()=>setLoading(false)).catch(err=>{Alert.error("connection error!");setLoading(false)})
    
  }
  
  useEffect(() => {
    if (activeProfile === 2) {
      setTimeout(function () {
        setActiveProfile(0);
      }, 300);
    }
    return false;
  }, [activeProfile]);
  useEffect(()=>{
    
  },[user.info])

  useEffect(()=>{

    if(user.info&&!user.info.ischecked){
    getList()
  }

  },[])


  return (
    <div className="Nav">
      <div className="nav-section">
        <ul style={user.auth ? {} : { marginLeft: "-5%" }}>
          <li className="search-bar-section">
            <div className="search-bar-container">
              <SearchBar loseSearchBar={loseSearchBar} keyword={keyword} setKeyword={setKeyword} />
            </div>
          </li>
          <li className="logo-section">
            <Link to="/">
              <button>
                <img className="logo-image" src={logo} alt="logo" />
              </button>
            </Link>
          </li>
          {!user.auth ? (
            <li className="menu-section">
              <Link to="/login">
                <button>SingIn/Signup</button>
              </Link>
            </li>
          ) : (
            <div className="nav-after-login">
              {/* <li><Link to="/create"><button>create</button></Link></li> */}
              <li
                onMouseEnter={setActiveProfile}
                onMouseLeave={e => {
                  setActiveProfile(false);
                }}
              >
                <button className="profile-button">
                  <img
                    src={user.info.userimg ? user.info.userimg : exPhoto}
                    alt="user-img"
                  />
                  {user.info.username}
                </button>
                <div
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
                      history.push("/mypage");
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
                  <div onClick={props.onLogout} className="button-container">
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
                onMouseEnter={setActiveAlert}
                onMouseLeave={() => setActiveAlert(false)}
              >
                <button>
                  <FontAwesomeIcon
                    style={
                      user.info
                        ? !user.info.ischecked
                          ? { color: "#f6b800" }
                          : {}
                        : {}
                    }
                    icon={
                      user.info
                        ? !user.info.ischecked
                          ? fsBell
                          : faBell
                        : faBell
                    }
                  ></FontAwesomeIcon>
                </button>
                <div
                  className={
                    activeAlert ? "alert-box active" : "alert-box unactive"
                  }
                >
                  <div className="alert-box-header">
                    <span>Alert</span>
                    <button onClick={getList}>
                      <FontAwesomeIcon icon={faSyncAlt} />
                    </button>
                  </div>
                  
                  {loading?<LoadingIndicator/>: alertList.length > 0 ? (
                    <AlertList />
                  ) : (
                    <div className="alert-item-null">
                      <p>No notification yet!</p>
                    </div>
                  )}
                </div>
              </li>
            </div>
          )}
        </ul>
        <div className="blur-section" onClick={loseSearchBar}></div>
      </div>
    </div>
  );
}