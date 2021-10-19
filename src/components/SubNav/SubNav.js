import {
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCrown,
  faHashtag,
  faHome,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, Route, Switch, useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../../common/UserContext";
import defaultUser from "../../res/default-user.jpeg";
import {
  getUserList,
  getProfileSubNavData,
  toggleFollow,
  getDetailProfileSubNavData,
} from "../../util/APIUtils";
import Alert from "react-s-alert";
import "./SubNav.scss";
import calculateScale from "../../util/numberUtils";
import ListModal from "../Modal/ListModal";

export default function SubNav(props) {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [info, setInfo] = useState({ user: null });
  let setId = props.setId;
  const [userList, setUserList] = useState([
    {
      username: "카리나a",
      userid: "1",
      userImg:
        "https://thumb.mt.co.kr/06/2020/10/2020102814240071146_1.jpg/dims/optimize/",
      follower: 12050,
      isUserFollowed: true,
    },
    {
      username: "카리나a",
      userid: "3",
      userImg:
        "https://thumb.mt.co.kr/06/2020/10/2020102814240071146_1.jpg/dims/optimize/",
      follower: 12050,
      isUserFollowed: false,
    },
    {
      username: "카리나a",
      userid: "3",
      userImg:
        "https://thumb.mt.co.kr/06/2020/10/2020102814240071146_1.jpg/dims/optimize/",
      follower: 12050,
      isUserFollowed: false,
    },
    {
      username: "카리나a",
      userid: "3",
      userImg:
        "https://thumb.mt.co.kr/06/2020/10/2020102814240071146_1.jpg/dims/optimize/",
      follower: 12050,
      isUserFollowed: true,
    },
    {
      username: "카리나a",
      userid: "3",
      userImg:
        "https://thumb.mt.co.kr/06/2020/10/2020102814240071146_1.jpg/dims/optimize/",
      follower: 12050,
      isUserFollowed: true,
    },
    {
      username: "카리나a",
      userid: "3",
      userImg:
        "https://thumb.mt.co.kr/06/2020/10/2020102814240071146_1.jpg/dims/optimize/",
      follower: 12050,
      isUserFollowed: true,
    },
    {
      username: "카리나a",
      userid: "3",
      userImg:
        "https://thumb.mt.co.kr/06/2020/10/2020102814240071146_1.jpg/dims/optimize/",
      follower: 12050,
      isUserFollowed: true,
    },
    {
      username: "카리나a",
      userid: "3",
      userImg:
        "https://thumb.mt.co.kr/06/2020/10/2020102814240071146_1.jpg/dims/optimize/",
      follower: 12050,
      isUserFollowed: true,
    },
  ]);
  // 팔로잉 언팔 버튼 토글 return true false

  const followOrNot = (current_username, target_username) => {
    if (user.auth) {
      toggleFollow(current_username, target_username);
    } else {
      Alert.error("please login first");
      history.push("/login");
    }
  };

  const Main = () => {
    return (
      <div className="main">
        <div className="buttons-section">
          <button className="subnav-btn-all">
            {" "}
            <Link to="/"> ALL</Link>
          </button>
          <button className="subnav-btn-men">
            <Link to="/men"> MEN</Link>
          </button>
          <button className="subnav-btn-women">
            <Link to="/women"> WOMEN</Link>
          </button>
        </div>
      </div>
    );
  };

  const Login = () => {
    return (
      <div className="login">
        <div className="subnav-breadcrumb-section">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>LOGIN&SIGNUP</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="subnav-main-section">
          <h1>LOGIN/SIGNUP</h1>
        </div>
      </div>
    );
  };
  const Detail = props => {
    const postid = props.location.pathname.split("/")[2];
    let request =null
    if(user.info){

     request = Object.assign(
      {},
      { current_userid: user.info.userid, postid }
    );
  }
  else{
    request= Object.assign(
      {},
      { current_userid: null, postid }
    );
  }
    useEffect(() => {
      getDetailProfileSubNavData(request).then(res => {
        if (res.ok) {
          setInfo(res);
        }
        else{
          console.log(res)
        }
      }).catch(err=>console.log(err));
    }, []);
    return (
      
      <div className="detail">
        {info.user?
        <>
        <div className="subnav-breadcrumb-section">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{info.user.username}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="subnav-main-section">
          <div className="subnav-main-profile">
            <div className="img-section">
              <img src={info.user.userimg?info.user.userimg:defaultUser} alt="" />
            </div>
            <div className="profile-section">
              <div className="profile-name-section">
                <Link to={"/profile/"+info.user.username}>{info.user.username}</Link>
              </div>
              <div className="profile-info-section">
                <div>
                  <span>{info.user.height}cm</span>
                </div>
                <div>
                  <span>{info.user.sex===0?"women":"men"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="follow-btn-section">
            <button onClick={()=>{followOrNot(user.info.userid,info.user.userid)}} className="follow-button">Follow</button>
          </div>
        </div>
        </>
        :null}
      </div>
      
    );
  };
  const Ranking = props => {
    const [rankingTitle, setRankingTitle] = useState("");
    const setChange = props.setChange;

    const location = useLocation();
    const subButtonEvent = event => {
      const subButtons = document.querySelector(".sub-buttons-section");

      for (let subButton of subButtons.children) {
        subButton.classList.remove("active");
      }
      event.target.classList.add("active");
    };

    

    useEffect(()=>{
      setRankingTitle(location.pathname.split("/")[2])
      document.querySelector(`.btn-${location.pathname.split("/")[2]}`).classList.add("active")
      document.querySelector(`.sub-btn-${location.pathname.split("/")[3]}`).classList.add("active")
      
    },[location.pathname])

    return (
      <div className="ranking">
        <div className="buttons-section">

            <Link className="btn-likes" to={`/ranking/likes/all`}>LIKES</Link>


            <Link className="btn-user"  to={`/ranking/user/all`}>USER</Link>


            <Link className="btn-brand" to={`/ranking/brand/all`} > BRAND</Link>

        </div>
        <div className="title-section">
          <div className="title-container">
            <h1>
              <FontAwesomeIcon icon={faCrown} />
              TOP {rankingTitle}
            </h1>
          </div>
        </div>
        <div className="sub-buttons-section">
          <Link to={"/ranking/"+location.pathname.split("/")[2]+"/all"} className="sub-btn-all" >
            ALL
          </Link>
          <Link to={"/ranking/"+location.pathname.split("/")[2]+"/men"} className="sub-btn-men" >
            MEN
          </Link>
          <Link to={"/ranking/"+location.pathname.split("/")[2]+"/women"} className="sub-btn-women" >
            WOMEN
          </Link>
        </div>
      </div>
    );
  };
  // 프로필
  const Profile = props => {
    const toggleFollowModal = e => {
      const type = e.currentTarget.classList[1]; //follwer , f, like
      console.log(type);
      const request = Object.assign(
        {},
        {
          type,
          current_userid: user.info.userid,
          targetid: info.user.userid,
        }
      );
      getUserList(request)
        .then(response => {
          if (response.ok) {
            setUserList(response);
          } else {
            console.log(response);
          }
        })
        .catch(err => console.log);
      setTitle(type);

      setShow(true);
    };

    useEffect(() => {
      const profile_username = props.location.pathname.split("/")[2];
      const current_userid = user.info.userid;

      getProfileSubNavData(current_userid, profile_username)
        .then(res => {
          if (res.ok) {
            setInfo(res);
          } else {
            console.log(res);
            // history.push("/404")
          }
        })
        .catch(err => {
          console.log(err);

          history.push("/404");
        });
    }, [props.location.pathname]);

    return (
      <div className="profile">
        <div className="subnav-breadcrumb-section">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>user</Breadcrumb.Item>

            <Breadcrumb.Item active>
              {info.user ? info.user.username : null}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="subnav-main-section">
          <div className="left-section">
            <div className="img-section">
              <img
                src={
                  info.user && info.user.userimg
                    ? info.user.userimg
                    : defaultUser
                }
                alt=""
              />
            </div>
            <div className="follower-section">
              <div onClick={toggleFollowModal} className="f-box follower">
                <span className="title">Follower</span>
                <span>{calculateScale(info.followercount)}</span>
              </div>
              <div onClick={toggleFollowModal} className="f-box following">
                <span className="title">Following</span>
                <span>{calculateScale(info.followercount)}</span>
              </div>
            </div>
          </div>
          <div className="right-section">
            <div className="profile-section">
              <div className="profile-title-section">
                <h1>{info.user ? info.user.username : null}</h1>
              </div>
              <div className="profile-info-section">
                <div className="profile-span-container">
                  <span className="user-height">
                    {info.user ? info.user.height + "cm" : null}
                  </span>
                </div>
                <div className="profile-span-container">
                  <span className="user-gender">
                    {info.user && info.user.sex === 0 ? "women" : "men"}
                  </span>
                </div>
              </div>
              <div className="sns-tag-section">
                <div className="sns-icon-container">
                  <a
                    href={
                      info.user
                        ? "https://instagram.com/" + info.user.instaid
                        : null
                    }
                    hidden={info.user && info.user.instaid ? false : true}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a
                    href={
                      info.user
                        ? "https://pinterest.com/" + info.user.pinterestid
                        : null
                    }
                    hidden={info.user && info.user.pinterestid ? false : true}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faPinterest} />
                  </a>
                  <a
                    href={
                      info.user
                        ? "https://twitter.com/" + info.user.twitterid
                        : null
                    }
                    hidden={info.user && info.user.twitterid ? false : true}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
              </div>
              <div
                hidden={
                  info.favbrands && info.favbrands.length > 0 ? false : true
                }
                className="fav-brand-section"
              >
                <span>favourite-brand : </span>
                <div className="button-container">
                  {info.favbrands
                    ? info.favbrands.map(brand => (
                        <Link to={"/list/brand/" + brand + "/1"}>{brand}</Link>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <div className="button-section">
              {user.info && info.user ? (
                user.info.uername !== info.user.username ? (
                  <button onClick={followOrNot} className="follow-button">
                    {info.isfollowing ? "unfollow" : "follow"}
                  </button>
                ) : null
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MyPage = () => {
    return (
      <div className="mypage">
        <div className="subnav-breadcrumb-section">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>mypage</Breadcrumb.Item>
            <Breadcrumb.Item active>my profile</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="title-section">
          <h1>
            <FontAwesomeIcon icon={faUserAlt} />
            My Profile
          </h1>
        </div>
      </div>
    );
  };
  const List = () => {
    return (
      <div className="list">
        <div className="subnav-breadcrumb-section">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>tag-name</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="title-section">
          <h1>
            <FontAwesomeIcon icon={faHashtag} />
            Tag-name list
          </h1>
        </div>
      </div>
    );
  };

  const NotFound = () => {
    return <div className="none"></div>;
  };
  return (
    <div className="SubNav">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/men" component={Main} />
        <Route exact path="/women" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/list/:id/:id/:id" component={List} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/ranking/:id/:id" component={Ranking} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/mypage" component={MyPage} />
        <Route component={NotFound} />
      </Switch>
      <ListModal
        title={title}
        setUserList={setUserList}
        userList={userList}
        show={show}
        setShow={setShow}
      />
    </div>
  );
}
