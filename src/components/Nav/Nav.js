import {
    faAddressCard,
    faBell,
    faPlusSquare
} from "@fortawesome/free-regular-svg-icons";
import {
    faArrowRight, faBell as fsBell, faSignOutAlt,
    faSlidersH, faSyncAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-s-alert";
import LoadingIndicator from "../../common/LoadingIndicator";
import { UserContext } from "../../common/UserContext";
import exPhoto from "../../res/default-user.jpeg";
import logo from "../../res/logo.png";
import { getAlertList } from "../../util/APIUtils";
import { calculateDatetime } from "../../util/TimeUtils";
import "./Nav.scss";
import SearchBar from "./SearchBar";
export default function Nav(props) {
  const { user } = useContext(UserContext);
  const [activeProfile, setActiveProfile] = useState(false);
  const [activeAlert, setActiveAlert] = useState(false);
  const [loading,setLoading] = useState(false)
  const [keyword, setKeyword] = useState("tag")
  const [alertList, setAlertList] = useState([
    { type: "following", likepostid: 1,postid:1, username: "jjangjjun", alert_date: "2021-10-21 10:10:13" },
    { type: "follower", commentid: 1,postid:2, username: "임양", alert_date: "2021-10-22 12:02:13" },
    { type: "following", likepostid: 1,postid:3, username: "braveleftji", alert_date: "2021-10-21 13:04:14" },
    { type: "following", likepostid: 1,postid:4, username: "braveleftji", alert_date: "2021-10-21 16:18:13" },
    { type: "follower", commentid: 1, postid:5,username: "임양", alert_date: "2021-10-21 16:72:13" },
    { type: "follower", likepostid: 1,postid:6, username: "임양", alert_date: "2021-10-21 16:63:32" }
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
    // const clear = (index,alertid) => {
    //   setAlertChecked(alertid).then(response=>{if(response){setAlertList(alertList.slice(0, alertList.remove - 1).splice(index, 1))}}).catch(err=>console.log(err))
    // };
    const FigureType = props => {
      const content = props.content;
      const time = calculateDatetime(content.alert_date);
      return iterateAlert(content.username,content.likepostid,content.postid,time,content.type)

    };
    const iterateAlert= (username,li,pi,date,type) => {
      return(
        <span>
          <Link to={"/profile/"+username}>
            {username}
          </Link>
          님
          {type==="follower"?"이":"의"} 
          <Link to={"/detail/"+ pi}>게시글</Link>
          에 {li?"좋아요를 눌렀습니다.":"댓글을 작성하였습니다."}<i>{date}</i>
        </span>
      )
    }

    return alertList.map((content, index) => (
      <div key={index} className="alert-item-container">
        <div className="alert-item-main">
          <div
            className="left"
            onClick={
              content.type === "follow"
                ? null
                : (e, index) => {
                    // clear(index,content.alertid);
                    // history.push(`/detail/${content.post_no}`);
                  }
            }
          >
            <div className="profile-image-section">
            </div>
            <div className="content-section">
              <FigureType index={index} content={content} />
            </div>
          </div>
          <div className="right">
           
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