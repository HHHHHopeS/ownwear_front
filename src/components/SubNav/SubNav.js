import {
  faInstagram,
  faPinterest,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
  faCrown,
  faHashtag,
  faHome,
  faTshirt,
  faUserAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, Route, Switch, useHistory, useLocation,Redirect } from "react-router-dom";
import Alert from "react-s-alert";
import { UserContext } from "../../common/UserContext";
import defaultUser from "../../res/default-user.jpeg";
import {
  deleteDetailPage, getDetailProfileSubNavData, getProfileSubNavData, getUserList
} from "../../util/APIUtils";
import calculateScale from "../../util/numberUtils";
import "./SubNav.scss";
import Select from "react-select";
export default function SubNav(props) {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const toggleFollowModal = props.toggleFollowModal
  const followOrNot = props.followOrNot
  const setShow = props.setShow;
  const setUserList = props.setUserList;
  const setTitle= props.setTitle
  const [info, setInfo] = useState(null);
  
  // 팔로잉 언팔 버튼 토글 return true false



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
    const { pathname } = useLocation();

    useEffect(() => {
      const postid = pathname.split("/")[2];
      let current_userid = -1;

      if (user.auth) {
        current_userid = user.info.userid;
      }

      if(!info||info.postid!==postid){
        getDetailProfileSubNavData(current_userid, postid)
          .then(res => setInfo({ ...info, user: res, postid: postid }))
          .catch(err => console.log(err));
          }

    }, [pathname]);

    const deleteThisPost = ()=>{

      const postid= parseInt(pathname.split("/")[2])
      const request = Object.assign({},{postid:3})
      if(window.confirm("정말 포스트를 지우겠습니까?")){
        if(window.confirm("정말루?")){
          
          deleteDetailPage(request).then(response=>{
            console.log(response)
          }).catch(err=>{Alert.error("에러가 발생했습니다 ㅠㅠ")})
        }
      }
    }

    return (
      <div className="detail">
        {info&&info.user ? (
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
                  <img
                    src={info.user.userimg ? info.user.userimg : defaultUser}
                    alt=""
                  />
                </div>
                <div className="profile-section">
                  <div className="profile-name-section">
                    <Link to={"/profile/" + info.user.username}>
                      {info.user.username}
                    </Link>
                  </div>
                  <div className="profile-info-section">
                    <div>
                      <span>{info.user.height?info.user.height+"cm":"160cm"}</span>
                    </div>
                    <div>
                      <span>{info.user.sex === 0 ? "women" : "men"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="follow-btn-section">
                {user.info?user.info.userid !== info.user.userid ? (
                  <button
                    onClick={() => {
                      followOrNot(user.info&&user.info.userid, info.user.userid);
                    }}
                    className="follow-button"
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={() => deleteThisPost()}
                    className="delete-button"
                  >
                    Delete
                  </button>
                ): <button
                onClick={() => {
                  followOrNot(user.info&&user.info.userid, info.user.userid);
                }}
                className="follow-button"
              >
                Follow
              </button>}
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  };
  const Ranking = props => {
    const [rankingTitle, setRankingTitle] = useState("");
    const setChange = props.setChange;
    const options = [
      {value: "all" ,label : "all"},
      {value: "men" ,label : "men"},
      {value: "women" ,label : "women"}
    ]
    const location = useLocation();
    const subButtonEvent = event => {
      const subButtons = document.querySelector(".sub-buttons-section");

      for (let subButton of subButtons.children) {
        subButton.classList.remove("active");
      }
      event.target.classList.add("active");
    };

    useEffect(() => {
      setRankingTitle(location.pathname.split("/")[2]);
      document
        .querySelector(`.btn-${location.pathname.split("/")[2]}`)
        .classList.add("active");
        if(location.pathname.split("/")[2]!=="brand"){
      document
        .querySelector(`.sub-btn-${location.pathname.split("/")[3]}`)
        .classList.add("active");
      }
    }, [location.pathname]);

    

    return (
      <div className="ranking">
        <div className="buttons-section">
          <Link className="btn-likes" to={`/ranking/likes/all`}>
            LIKES
          </Link>

          <Link className="btn-user" to={`/ranking/user/all`}>
            USER
          </Link>

          <Link className="btn-brand" to={`/ranking/brand/all`}>
            {" "}
            BRAND
          </Link>
        </div>
        <div className="title-section">
          <div className="title-container">
            <h1>
              <FontAwesomeIcon icon={faCrown} />
              TOP {rankingTitle}
            </h1>
          </div>
        </div>
        <div style={window.innerWidth<758?{display:"none"}:{}}  hidden={location.pathname.includes("brand")?true:false} className="sub-buttons-section">
          <Link
            to={"/ranking/" + location.pathname.split("/")[2] + "/all"}
            className="sub-btn-all"
          >
            ALL
          </Link>
          <Link
            to={"/ranking/" + location.pathname.split("/")[2] + "/men"}
            className="sub-btn-men"
          >
            MEN
          </Link>
          <Link
            to={"/ranking/" + location.pathname.split("/")[2] + "/women"}
            className="sub-btn-women"
          >
            WOMEN
          </Link>
        </div>
        <Select onChange={e=>history.push("/ranking/"+location.pathname.split("/")[2]+"/"+e.value)} isSearchable={false} defaultValue={{value:location.pathname.split("/")[3],label:location.pathname.split("/")[3]}} options={options} />

        
      </div>
    );
  };
  // 프로필
  const Profile = props => {
    const toggleFollowModal = props.toggleFollowModal
    const followOrNot = props.followOrNot
    const {pathname} = useLocation()
    useEffect(()=>{
      console.log(1)
    })
    useEffect(() => {
      
      const profile_username = pathname.split("/")[2];  
      

      let current_userid = -1;
      if (user.info) {
        
        current_userid = user.info.userid;
      }
      
      //프로필 유저정보
      if(!info||info.user.username!==profile_username){
        
      getProfileSubNavData(current_userid, profile_username)
        .then(res => {
          console.log(res)
            setInfo(res)

        })
        .catch(err => {
          console.log(err);

          history.push("/404");
        });
      }

    }, [pathname]);
    
    if(info&&info.user){
    return (
      
      <div className="profile">
        <div className="subnav-breadcrumb-section">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>user</Breadcrumb.Item>

            <Breadcrumb.Item active>
              {info&&info.user ? info.user.username : null}
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
                    : null
                }
                alt=""
              />
            </div>
            <div className="follower-section">
              <div onClick={e=>toggleFollowModal(e,"follower",info.user.userid)} className="f-box follower">
                <span className="title">Follower</span>
                <span>{info&&info.follower&&calculateScale(info.follower)}</span>
              </div>
              <div onClick={e=>toggleFollowModal(e,"following",info.user.userid)} className="f-box following">
                <span className="title">Following</span>
                <span>{info&&info.following&&calculateScale(info.following)}</span>
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
                    {info.user&&info.user.height ? info.user.height + "cm" : "160cm"}
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
                    hidden={info && info.user.pinterestid ? false : true}
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
                    hidden={info && info.twitterid ? false : true}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
              </div>
              <div
                hidden={
                  info.user&&info.user.favbrands && info.user.favbrands.length > 0 ? false : true
                }
                className="fav-brand-section"
              >
                <span>favourite-brand : </span>
                <div className="button-container">
                  {info&&info.user.favbrands
                    ? info.user.favbrands.map(brand => (
                        <Link to={"/list/brand/" + brand + "/1"}>{brand}</Link>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <div className="button-section">
              {user.info && info.user ? (
                user.info.uername !== info.user.username ? (
                  <button
                    onClick={e =>{
                      followOrNot(user.info.userid, info.user.userid).then(bool=>
                        setInfo({...info,user:{...info.user,isfollowing:bool?true:false},follower:bool?info.follower+1:info.follower-1})  
                        )
                      
                      
                    }
                    }
                    className="follow-button"
                    hidden={user.info&&user.info.username!==info.user.username?false:true}
                  >
                    {info.user&&info.user.isfollowing ? "unfollow" : "follow"}
                  </button>
                ) : null
              ) : <button
              onClick={e =>
                followOrNot(null, info.user.userid,info)
              }
              className="follow-button"
              
            >
              follow
            </button>}
            </div>
          </div>
        </div>
      </div>
    );
  }
  else{
    return(
      null
    )
  }
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
    const {pathname} = useLocation();
    const isHashtag = pathname.split("/")[2]
    const value = pathname.split("/")[3]
    console.log(isHashtag)
    return (
      <div className="list">
        <div className="subnav-breadcrumb-section">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{isHashtag==="hashtag"?"hashtag":"brand"}</Breadcrumb.Item>
            <Breadcrumb.Item active>{value}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="title-section">
          <h1>
            <FontAwesomeIcon icon={isHashtag==="hashtag"?faHashtag:faTshirt} />
             {value}
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
        
        <Route exact path="/login"  >
        <Login />
        </Route>
        <Route exact path="/list/:id/:id/:id" component={List} />
        <Route exact path="/detail/:id"  >
        <Detail />
        </Route>
        <Route exact path="/ranking/:id/:id" component={Ranking} />
        <Route exact path="/profile/:id" render >
        <Profile {...props} followOrNot={followOrNot} toggleFollowModal={toggleFollowModal}/>
        </Route>
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/" component={Main} />
        <Route exact path="/men" component={Main} />
        <Route exact path="/women" component={Main} />
        <Route component={NotFound} />
      </Switch>
      
    </div>
  );
}
