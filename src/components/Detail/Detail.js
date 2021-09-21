import {
  faFacebookF,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHeart as emptyHeart,
  faShareSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisH,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
import Masonry from "react-masonry-css";
import { Redirect } from "react-router";
import { UserContext } from "../../common/UserContext";
import Alert from "react-s-alert";
import "./Detail.scss";
import { getDetailData,toggleLike } from "../../util/APIUtils";

export default function Detail(props) {
  const postno = props.location.pathname
  const { user } = useContext(UserContext);
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoverTag, setHoverTag] = useState(false);
  const [detailPageData,setDetailPageData] = useState({
    postno:postno,
    userno:1,
    username:"winter",
    imgData:{

    },
    rdate:"2021/08/30 08:31:20",
    edate:"",
    hashtag:[

    ]
    user

  })
  useEffect(()=>{
    const getDetailDataRequest = Object.assign({},{postno:postno})
    getDetailData(getDetailDataRequest).then(response=>{
      setDetailPageData(response)
    }).catch(
      Alert("failed to load data, please check network connection")
    )
  },[])
  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }

    function updateSize() {
      if (targetRef.current) {
        setDimensions({
          width: targetRef.current.offsetWidth,
          height: targetRef.current.offsetHeight,
        });
      }
    }

    function reRender() {
      window.addEventListener("resize", updateSize);
      updateSize();
    }

    setTimeout(reRender, 1000);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  
  return (
    <div className="Detail">
      <div className="detail-main-section">
        <Image
          dimensions={dimensions}
          targetRef={targetRef}
          setHoverTag={setHoverTag}
        />
        <div
          className="comment-container"
          style={{
            width: `${dimensions.width}px`,
          }}
        >
          <LikeShare  user={user} {...props} />
          <Comment user={user} />
        </div>
      </div>
      <div className="detail-side-section">
        <ImageInfo />
        <Product hoverTag={hoverTag} />
        <RelatedImages />
      </div>
    </div>
  );
}

function Image(props) {
  const dimensions = props.dimensions;
  const targetRef = props.targetRef;
  const setHoverTag = props.setHoverTag;
  return (
    <div
      className="img-container"
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
    >
      <img
        className="user-image"
        ref={targetRef}
        src="https://pbs.twimg.com/media/E1uT-9eVkAEdyGG?format=jpg&name=large"
        alt=""
      />
      <div
        className="tag-container"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        <div
          className="tag"
          style={{
            top: "50%",
            left: "50%",
          }}
        >
          <div></div>
          <span
            className="tag-label"
            onMouseOver={setHoverTag}
            onMouseOut={() => {
              setHoverTag(false);
            }}
          >
            GIVENCHY
          </span>
        </div>
      </div>
    </div>
  );
}

function LikeShare(props) {
  const postno = props.location.pathname
  const [hover, setHover] = useState(false);
  const [shareActive, setShareActive] = useState(false);
  const [isLike,setIsLike] = useState(false)
  const user = props.user
  const [icon,setIcon] = useState(emptyHeart)
  const pressLike =  ()=>{
    if(user.auth){
      const toggleLikeRequest = Object.assign({},{userno:user.info.id,postno:postno})

      toggleLike(toggleLikeRequest).then(response=>{
        if(isLike){
        
          setIsLike(false)
        }
        else{
          
          setIsLike(true)
        }
      }).catch(()=>{
        Alert.error("oops cannot change, please retry!")
      })
      
    }
    
    else{
      Alert.error("please login first!")
      props.history.push("/login")
    }
  }
  useEffect(()=>{
    const setheartIcon = ()=>{
    
      if(user.auth&&isLike){

          setIcon(faHeart)
      }
      else{
        setIcon(emptyHeart)
      }
    }
    
  setheartIcon();
  })
  return (
    <div className="like-share-section">
      <div className="like-section">
        <div className="icon-section">
          <div className="like-button-container">
            <button
              className="like"
              onMouseOver={isLike? null:setHover}
              onMouseOut={isLike? null:() => {
                setHover(false);
              }}
              onClick={pressLike}
            >
              <FontAwesomeIcon style={icon===faHeart?{color:"rgb(237, 73, 113)"}:{}} icon={hover?faHeart:icon} />
            </button>
          </div>
          <div
            className={shareActive ? "share-section active" : "share-section"}
          >
            <button
              className="share"
              onClick={
                shareActive
                  ? () => {
                      setShareActive(false);
                    }
                  : setShareActive
              }
            >
              <FontAwesomeIcon icon={faShareSquare} />
            </button>
            <div className="share-icons">
              <button className="facebook">
                <FontAwesomeIcon icon={faFacebookF} />{" "}
              </button>
              <button className="twitter">
                <FontAwesomeIcon icon={faTwitter} />{" "}
              </button>
              <button className="pinterest">
                <FontAwesomeIcon icon={faPinterest} />{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="letter-section">
          <span>
            {/* like count */}
            1523 Likes
          </span>
        </div>
      </div>
    </div>
  );
}

function Comment(props) {
  const user = props.user;

  return (
    <div className="comment-section">
      <div className="comment-list-section">
        {/* load comment */}
        <h1>No Comments Yet</h1>
      </div>
      <div className="comment-input-section">
        <form>
          <div className="comment-input">
            <div className="img-section"></div>
            <input
              type="text"
              placeholder={
                user.auth
                  ? "leave a comment"
                  : "please login to leave a comment"
              }
              disabled={user.auth ? false : true}
            />
          </div>
          <div className="button-section">
            <button
              // submit event 추가
              onSubmit={null}
              disabled={user.auth ? false : true}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ImageInfo(props) {
  return (
    <div className="img-info-container">
      {/* 프로필 앵커태그 */}
      <span className="title-profile"> winter</span>

      <span>님의</span>
      {/* 상품 앵커태그 */}
      <span className="title-product">
        {}Red Oversized Metal Details Sweatshirt
      </span>
      <span>을 활용한 데일리 룩</span>

      <div className="hashtag-container">
        <button className="hashtag">#Givenchy</button>
        <button className="hashtag">#sweatshirt</button>
        <button className="hashtag">#red</button>
      </div>

      <div className="register-date-container">
        posted 2021/08/30 at 08:31:20
      </div>
    </div>
  );
}

function Product(props) {
  const hoverTag = props.hoverTag;
  return (
    <div className="product-container">
      <span className="title-header">tagged item</span>
      <div
        className="product product-1"
        style={
          hoverTag
            ? {
                border: "2px solid black",
              }
            : {
                border: "none",
                background: "none",
              }
        }
      >
        <div className="product-img-section">
          <img
            src="https://gaudenziboutiquestorage.blob.core.windows.net/product/72158/big/34576833-1c67-42c6-a7fd-02a97dd7a4a6.jpg"
            alt=""
          />
        </div>
        <div className="product-info-section">
          <span className="product-brand">GIVENCHY</span>
          <span className="product-name">
            RED OVERSIZE SWEATSHIRT WITH LOGO AND METAL DETAILS
          </span>

          <span className="product-price">₩1,012,000</span>
        </div>
      </div>
    </div>
  );
}

function RelatedImages(props) {
  return (
    <div className="related-img-container">
      <div className="header-section">
        <span className="title-header">Related Image</span>
      </div>
      <div className="main-section">
        <Masonry
          breakpointCols={3}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          <img
            src="https://post-phinf.pstatic.net/MjAyMTAzMjJfMTk1/MDAxNjE2Mzc5NTQ2OTcz.42DcHh3ob_HfoX8ogysOrN40cbhCbIrjuCWeEtHeV9sg.FjaSGRM8Q2FGLWP8ewZcr2ehzBgF7-PCxXhCnCCx0aIg.JPEG/001.jpg?type=w1200"
            alt=""
          />
          <img
            src="https://blog.kakaocdn.net/dn/qPpMz/btqTLwZolfx/vYDUHDlZNvYXtk1NP6AKe0/img.png"
            alt=""
          />
          <img
            src="https://post-phinf.pstatic.net/MjAyMTAzMjJfMTk1/MDAxNjE2Mzc5NTQ2OTcz.42DcHh3ob_HfoX8ogysOrN40cbhCbIrjuCWeEtHeV9sg.FjaSGRM8Q2FGLWP8ewZcr2ehzBgF7-PCxXhCnCCx0aIg.JPEG/001.jpg?type=w1200"
            alt=""
          />
          <img
            src="https://post-phinf.pstatic.net/MjAyMTAzMjJfMTk1/MDAxNjE2Mzc5NTQ2OTcz.42DcHh3ob_HfoX8ogysOrN40cbhCbIrjuCWeEtHeV9sg.FjaSGRM8Q2FGLWP8ewZcr2ehzBgF7-PCxXhCnCCx0aIg.JPEG/001.jpg?type=w1200"
            alt=""
          />

          <div className="more">
            <img
              src="https://post-phinf.pstatic.net/MjAyMTAzMjJfMTk1/MDAxNjE2Mzc5NTQ2OTcz.42DcHh3ob_HfoX8ogysOrN40cbhCbIrjuCWeEtHeV9sg.FjaSGRM8Q2FGLWP8ewZcr2ehzBgF7-PCxXhCnCCx0aIg.JPEG/001.jpg?type=w1200"
              alt=""
            />
            <span>
              <FontAwesomeIcon icon={faEllipsisH} />
            </span>
          </div>
        </Masonry>
      </div>
    </div>
  );
}


