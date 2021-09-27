import {
    faInstagram,
    faPinterest,
    faTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
    faCrown,
    faHashtag,
    faHome,
    faPlus,
    faUserAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import exPhoto from "../../res/exPhoto.jpeg";
import "./SubNav.scss";



export default function SubNav(props) {
  const location = useLocation();
  const [rankingTitle, setRankingTitle] = useState("LIKES");
  const [change, setChange] = useState(false);

  useEffect(() => {
    if (change) {
      setChange(false);
    }

    let className = location.pathname.replace("/", "");
    if(className.includes("detail")||className.includes("list")||className.includes("profile"))
    {className = className.split("/")
    className = className[0]}
    
    if (document.querySelector(".SubNav")&&document.querySelector(".SubNav").classList.length > 1) {
      document
        .querySelector(".SubNav")
        .classList.remove(document.querySelector(".SubNav").classList[1]);
    }

    if (className&&document.querySelector(".SubNav")) {
      document.querySelector(".SubNav").classList.add(className);
    }
  }, [location, change]);
  const subButtonEvent = event => {
    const subButtons = document.querySelector(".sub-buttons-section");
    setChange(true);
    for (let subButton of subButtons.children) {
      subButton.classList.remove("active");
    }
    event.target.classList.add("active");
  };

  const RankButtonEvent = event => {
    setChange(true);
    setRankingTitle(event.target.innerText);
  };
  if(location.pathname.replace("/","").includes("detail")&&location.pathname.replace("/","").split("/").length!==3){
    return <div className="SubNav" style={{height:"0"}}></div>
  }
  else{
  return (
    <div className="SubNav">
      <div className="main">
        <div className="buttons-section">
          <button className="subnav-btn-all">
            {" "}
            <Link to={`/`}> ALL</Link>
          </button>
          <button className="subnav-btn-men">
            <Link to={`/men`}> MEN</Link>
          </button>
          <button className="subnav-btn-women">
            <Link to={`/women`}> WOMEN</Link>
          </button>
        </div>
      </div>
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
      <div className="detail">
        <div className="subnav-breadcrumb-section">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>username</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="subnav-main-section">
          <div className="subnav-main-profile">
            <div className="img-section">
              <img src={exPhoto} alt="" />
            </div>
            <div className="profile-section">
              <div className="profile-name-section">
                <button>username</button>
              </div>
              <div className="profile-info-section">
                <div>
                  <span>164cm</span>
                </div>
                <div>
                  <span>women</span>
                </div>
              </div>
            </div>
          </div>
          <div className="follow-btn-section">
            <button className="follow-button">Follow</button>
          </div>
        </div>
      </div>
      <div className="ranking">
        <div className="buttons-section">
          <button className="subnav-btn-like" onClick={RankButtonEvent}>
            <Link to={`${location.pathname}/likes`}>LIKES</Link>
          </button>
          <button className="subnav-btn-follower" onClick={RankButtonEvent}>
            <Link to={`${location.pathname}/follower`}>FOLLOWER</Link>
          </button>
          <button className="subnav-btn-brand" onClick={RankButtonEvent}>
            <Link to={`${location.pathname}/follower`}> BRAND</Link>
          </button>
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
          <button className="subnav-sbbtn-all" onClick={subButtonEvent}>
            ALL
          </button>
          <button className="subnav-sbbtn-men" onClick={subButtonEvent}>
            MEN
          </button>
          <button className="subnav-sbbtn-women" onClick={subButtonEvent}>
            WOMEN
          </button>
        </div>
      </div>

      <div className="profile">
        <div className="subnav-breadcrumb-section">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>username</Breadcrumb.Item>
            <Breadcrumb.Item active>Fashion</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="subnav-main-section">
          <div className="left-section">
            <div className="img-section">
              <img src={exPhoto} alt="" />
            </div>
            <div className="button-section">
              <button className="follow-button">Follow</button>
            </div>
          </div>
          <div className="right-section">
            <div className="profile-section">
              <div className="profile-title-section">
                <h1>username</h1>
              </div>
              <div className="profile-info-section">
                <div className="profile-span-container">
                  <span className="user-height">167cm</span>
                </div>
                <div className="profile-span-container">
                  <span className="user-gender">Female</span>
                </div>
              </div>
              <div className="sns-tag-section">
                <div className="sns-icon-container">
                  <a href="#none">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href="#none">
                    <FontAwesomeIcon icon={faPinterest} />
                  </a>
                  <a href="#none">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
              </div>
              <div className="fav-brand-section">
                <span>fav-brand : </span>
                <div className="button-container">
                  <button className="brand-button">Nike</button>
                  <button className="brand-button">Balenciaga</button>
                  <button className="brand-button">Neighborhood</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <div className="create">
        <div className="subnav-breadcrumb-section">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="title-section">
          <h1>
            <FontAwesomeIcon icon={faPlus} />
            Create
          </h1>
        </div>
      </div>
    </div>
  );
}
}