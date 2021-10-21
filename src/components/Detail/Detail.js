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
  faEdit,
  faEllipsisH,
  faHeading,
  faHeart,
  faPaperPlane,
  faPen,
  faShareAlt,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  createRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import Alert from "react-s-alert";
import { UserContext } from "../../common/UserContext";
import {
  getDetailData,
  getIsLike,
  getUserList,
  toggleLike,
  updateComment,
  fetchCreateComment,
  fetchDeleteComment,
  hashtagAutoComplete,
} from "../../util/APIUtils";
import NotFound from "../404/NotFound";
import "./Detail.scss";
import ListModal from "../Modal/ListModal";
import { calculateDatetime } from "../../util/TimeUtils";
import defaultUser from "../../res/default-user.jpeg";
import _ from "lodash";
export default function Detail(props) {
  const pathName = props.location.pathname;

  const postuser = pathName.split("/")[1];
  const postid = parseInt(pathName.split("/")[2]);

  const [isLike, setIsLike] = useState(false);
  const setShow = props.setShow;
  const setUserList = props.setUserList;
  const { user } = useContext(UserContext);
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoverTag, setHoverTag] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [detailPageData, setDetailPageData] = useState({
    postform: {
      postid: postid,

      user: {
        userid: 1,
        username: "winter",
      },
      imgdata: {
        imgUrl:
          "https://pbs.twimg.com/media/E1uT-9eVkAEdyGG?format=jpg&name=large",
        height: 164,
        profileImgUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn36JZPyW1BmGR_QM8SRGpBL44mjr1yLwAFw&usqp=CAU",

        tagData: [
          {
            rectorX: 0.5,
            rectorY: 0.5,
            productInfo: {
              brandName: "Givenchy",
              category: "top",
              productName:
                "RED OVERSIZE SWEATSHIRT WITH LOGO AND METAL DETAILS",
              productUrl:
                "https://www.gaudenziboutique.com/en-US/men/d˜esigner/givenchy/red-oversize-sweatshirt-with-logo-and-metal-details-bmj0b83y69600",
              productImgUrl:
                "https://gaudenziboutiquestorage.blob.core.windows.net/product/72158/big/34576833-1c67-42c6-a7fd-02a97dd7a4a6.jpg",
              price: 1012000,
            },
          },
        ],
      },
      rdate: "2021-08-30 08:31:20",
      edate: "",
    },
    hashtags: ["Givenchy", "sweatshirt", "red"],
    userRelated: [
      {
        postid: 2,
        imgUrl:
          "https://post-phinf.pstatic.net/MjAyMTAzMjJfMTk1/MDAxNjE2Mzc5NTQ2OTcz.42DcHh3ob_HfoX8ogysOrN40cbhCbIrjuCWeEtHeV9sg.FjaSGRM8Q2FGLWP8ewZcr2ehzBgF7-PCxXhCnCCx0aIg.JPEG/001.jpg?type=w1200",
      },
      {
        postid: 3,
        imgUrl:
          "https://blog.kakaocdn.net/dn/qPpMz/btqTLwZolfx/vYDUHDlZNvYXtk1NP6AKe0/img.png",
      },
      {
        postid: 4,
        imgUrl:
          "https://blog.kakaocdn.net/dn/qPpMz/btqTLwZolfx/vYDUHDlZNvYXtk1NP6AKe0/img.png",
      },
      {
        postid: 5,
        imgUrl:
          "https://blog.kakaocdn.net/dn/qPpMz/btqTLwZolfx/vYDUHDlZNvYXtk1NP6AKe0/img.png",
      },
    ],
    likecount: 1543,
    comments: [
      //시간순 오래된순
      {
        commentid: 1,
        commnetdate: "2021-09-01 18:31:20",
        user: {
          userid: 2,
          username: "카리나",
          userImg:
            "https://thumb.mt.co.kr/06/2020/10/2020102814240071146_1.jpg/dims/optimize/",
        },
        content:
          "나는 #weg @bcd 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!",
      },
      {
        commentid: 2,
        commnetdate: "2021-09-18 10:02:20",
        user: {
          userid: 1,
          username: "카리나a",
          userImg:
            "https://thumb.mt.co.kr/06/2020/10/2020102814240071146_1.jpg/dims/optimize/",
        },
        content:
          "나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!나는 댓글입니다 정말 댓글이에요!",
      },
    ],
  });

  useEffect(() => {
    // 디테일 페이지 로직,

    getDetailData(postid)
      .then(response => {
        if (response) {
          console.log(response)
          setDetailPageData(response);
        } else {
          console.log(response);
        }
        if (user.auth) {
          getIsLike(user.info.userid, postid)
            .then(response => {
              if (response) {
                setIsLike(true);
              } else {
                setIsLike(false);
              }
            })
            .catch(err => {
              Alert.error("failed to check is like");
            });
        } else {
          setIsLike(false);
        }
      })
      .catch(err => {
        Alert.error("failed to get data");
        // setNotFound(true)  백 구축 하면 원상복귀
      });
  }, [postid, user.auth]);
  // }, [postid]);
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

    setTimeout(reRender, 100);
    return () => window.removeEventListener("resize", updateSize);
  }, [pathName]);
  const setLikecount = bool => {
    if (bool) {
      setDetailPageData({
        ...detailPageData,
        likecount: detailPageData.likecount + 1,
      });
    } else {
      setDetailPageData({
        ...detailPageData,
        likecount: detailPageData.likecount - 1,
      });
    }
  };
  if (postid && postuser && !notFound) {
    return (
      <div className="Detail">
        <div className="detail-main-section">
          <Image
            imgdata={detailPageData.postform.imgdata}
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
            <LikeShare
              likecount={detailPageData.likecount}
              setIsLike={setIsLike}
              postid={postid}
              isLike={isLike}
              setUserList={setUserList}
              setLikecount={setLikecount}
              user={user}
              detailPageData={detailPageData}
              setShow={setShow}
              {...props}
            />
            <Comment
              postid={postid}
              detailPageData={detailPageData}
              setDetailPageData={setDetailPageData}
              user={user}
            />
          </div>
        </div>
        <div className="detail-side-section">
          <ImageInfo detailPageData={detailPageData} />
          <Product detailPageData={detailPageData} hoverTag={hoverTag} />
          <RelatedImages
            postid={postid}
            userRelated={detailPageData.userRelated}
            username={detailPageData.postform.user.username}
            userid={detailPageData.postform.user.userid}
          />
        </div>
      </div>
    );
  } else {
    return <NotFound></NotFound>;
  }
}

function Image(props) {
  const dimensions = props.dimensions;
  const targetRef = props.targetRef;
  const setHoverTag = props.setHoverTag;
  const imgdata = props.imgdata;

  const RenderTags = () => {
    let tagRenderer = [];
    let i = 1;
    for (let tag of imgdata.tagData) {
      tagRenderer.push(
        <div
          key={i}
          className="tag"
          style={{
            top: `${tag.rectorY * 100}%`,
            left: `${tag.rectorX * 100}%`,
          }}
        >
          <div></div>
          <span
            className="tag-label"
            onMouseOver={() => {
              setHoverTag(true);
            }}
            onMouseOut={() => {
              setHoverTag(false);
            }}
          >
            {tag.productInfo.brandName}
          </span>
        </div>
      );
      i++;
    }
    return tagRenderer;
  };
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
        src={imgdata.imgUrl} //imgUrl
        alt=""
      />
      <div
        className="tag-container"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        <RenderTags />
      </div>
    </div>
  );
}

function LikeShare(props) {
  // const postid = props.location.pathname.split("/")[3];
  const postid = props.postid;
  const likecount = props.likecount;
  const setLikecount = props.setLikecount;
  const [hover, setHover] = useState(false);

  const setUserList = props.setUserList;

  const setShow = props.setShow;
  const isLike = props.isLike;
  const setTitle = props.setTitle;
  const setIsLike = props.setIsLike;
  const user = props.user;
  const [icon, setIcon] = useState(emptyHeart);
  const pressLike = () => {
    if (user.auth) {
      const toggleLikeRequest = Object.assign(
        {},
        { postid: parseInt(postid), userid: user.info.userid }
      );

      // if (isLike) {
      //   setIsLike(false);
      //   setLikecount(likecount-1);
      // } else {
      //   setIsLike(true);
      //   setLikecount(likecount+1);
      // }

      toggleLike(toggleLikeRequest)
        .then(response => {
          if (response) setIsLike(true, setLikecount(true));
          else {
            setIsLike(false, setLikecount(false));
          }
        })
        .catch(() => {
          Alert.error("oops cannot change, please retry!");
        });
    } else {
      Alert.error("please login first!");
      props.history.push("/login");
    }
  };
  const activeListModal = () => {
    if (user.auth) {
      const LikeUserListRequest = Object.assign(
        {},
        { type: "like", targetid: postid, current_userid: user.info.userid }
      );
      getUserList(LikeUserListRequest)
        .then(response => {
          console.log(response);
          setUserList(response);
        })
        .catch(err => console.log(err));
    } else {
      const LikeUserListRequest = Object.assign(
        {},
        { type: "like", targetid: postid, current_userid: -1 }
      );
      getUserList(LikeUserListRequest).then(response => {
        if (response.ok) {
          setUserList(response);
        } else {
          console.log(response);
        }
      });
    }
    setTitle("like");
    setShow(true);
  };
  useEffect(() => {
    const setheartIcon = () => {
      if (user.auth && isLike) {
        setIcon(faHeart);
      } else {
        setIcon(emptyHeart);
      }
    };

    setheartIcon();
  });
  return (
    <div className="like-share-section">
      <div className="like-section">
        <div className="icon-section">
          <div className="like-button-container">
            <button
              className="like"
              onMouseOver={isLike ? null : setHover}
              onMouseOut={
                isLike
                  ? null
                  : () => {
                      setHover(false);
                    }
              }
              onClick={pressLike}
            >
              <FontAwesomeIcon
                style={icon === faHeart ? { color: "rgb(237, 73, 113)" } : {}}
                icon={hover ? faHeart : icon}
              />
            </button>
          </div>
          
        </div>
        <div className="letter-section">
          <span onClick={activeListModal}>{likecount}Likes</span>
        </div>
      </div>
    </div>
  );
}

function Comment(props) {
  const postid = props.postid;
  const user = props.user;
  const comments = props.detailPageData.comments;
  const detailPageData = props.detailPageData;
  const setDetailPageData = props.setDetailPageData;

  const [initialContent, setInitialContent] = useState(null);
  const [showmenu, setShowmenu] = useState({
    commentid: null,
    active: false,
  });
  const [onEdit, setOnEdit] = useState({
    commentid: null,
    active: false,
  });
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const contentRef = useRef([]);
  contentRef.current = comments.map(
    (comment, i) => contentRef.current[i] ?? createRef()
  );
  const handleChange = e => {};

  const confirmEdit = (updatedContent, commentid) => {
    const requestContent = updatedContent.innerText.trim();
    if (requestContent) {
      const requestData = Object.assign(
        {},
        { content: requestContent, commentid: commentid }
      );
      updateComment(requestData)
        .then(response => {
          if (response) {
            updatedContent.innerText = requestContent;
            setOnEdit({ active: false });
          } else {
            Alert.error("oops! something went wrong. please retry!");
          }
        })
        .catch(error => {
          Alert.error("oops! something went wrong. please retry!");
        });
    } else {
      Alert.error("댓글 내용을 입력해주세요!");
    }
  };
  const replyComment = e => {
    const className = e.currentTarget.className;
    const index = className.lastIndexOf("-");
    const targetName = className.substring(index + 1);
    const inputValue = document.querySelector(".comment-input").value;
    if (!inputValue.includes("@" + targetName + " "))
      document.querySelector(".comment-input").value = "@" + targetName + " ";
  };
  const complete = (data, el) => {
    console.log(el);
    const inputValue = el.value;
    const position = el.selectionStart;
    const startingpoint = inputValue.lastIndexOf("#", position);
    const userTagStartingPoint = inputValue.lastIndexOf("@", position);
    if (userTagStartingPoint < startingpoint) {
      el.value =
        inputValue.substring(0, startingpoint) +
        "#" +
        data +
        " " +
        inputValue.substring(position + 1);
    } else {
      el.value =
        inputValue.substring(0, userTagStartingPoint) +
        "@" +
        data +
        " " +
        inputValue.substring(position + 1);
    }
  };
  const transformTags = data => {
    const hashTags =
      data.match(/(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_ㄱ-힣]{0,30})(\b|\W|\r)/g) ||
      [];
    const userTags =
      data.match(/(^|\B)@(?![0-9_]+\b)([a-zA-Z0-9_ㄱ-힣]{0,30})(\b|\W|\r)/g) ||
      [];

    let innerHtml = data;
    userTags.map(usertag => {
      innerHtml = innerHtml.replace(
        usertag,
        `<a href="/profile/${usertag.replace("@", "")}">${usertag}</a>`
      );
      return false;
    });

    hashTags.map(hashtag => {
      innerHtml = innerHtml.replace(
        hashtag,
        `<a href="/list/${hashtag.replace("#", "")}">${hashtag}</a>`
      );

      return false;
    });

    return { __html: "<span>" + innerHtml + "</span>" };
  };
  //
  const listenTags = e => {
    const position = e.currentTarget.selectionStart;
    const inputValue = e.currentTarget.value;
    const el = e.currentTarget;

    const hashTagcount = (
      inputValue.match(
        /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_ㄱ-힣]{0,30})(\b|\W|\r)/g
      ) || []
    ).length;
    const userTagcount = (
      inputValue.match(
        /(^|\B)@(?![0-9_]+\b)([a-zA-Z0-9_ㄱ-힣]{0,30})(\b|\W|\r)/g
      ) || []
    ).length;

    if (hashTagcount > 0 || userTagcount > 0) {
      const startingpoint = inputValue.lastIndexOf("#", position);
      const userTagStartingPoint = inputValue.lastIndexOf("@", position);
      if (startingpoint < userTagStartingPoint) {
        // do uesrTag
        if (
          inputValue.substring(position - 1, position).trim() &&
          inputValue[(startingpoint, startingpoint + 1)]
        ) {
          const newHashtagValue = inputValue.substring(
            startingpoint + 2,
            position
          );
          const usertagRequest = ()=>{
            hashtagAutoComplete(newHashtagValue, "usertag")
              .then(response => {
                console.log(response)
                setAutoCompleteResult({ data: response, targetElement: el });
              })
              .catch(err => {
                console.log(err);
                Alert.error("autocomplete not work!");
              });
          }
          console.log(newHashtagValue);
          const method= _.debounce(usertagRequest
          , 500);
          method()
        }
      } else {
        if (
          inputValue.substring(position - 1, position).trim() &&
          inputValue[(startingpoint, startingpoint + 1)]
        ) {
          const newHashtagValue = inputValue.substring(
            startingpoint + 1,
            position
          );


          const hashtagRequest=()=>{
            console.log(1)
            hashtagAutoComplete(newHashtagValue, "hashtag")
              .then(response => {
                setAutoCompleteResult({ data: response, targetElement: el });
              })
              .catch(err => {
                console.log(err);
                Alert.error("autocomplete not work!");
              })
          }
          const method = _.debounce(hashtagRequest,            
            500
          );
          method()
        } else {
          setAutoCompleteResult([]);
        }
      }
    } else {
      setAutoCompleteResult([]);
    }
  };
  const createComment = () => {
    const data = document.querySelector(".comment-input").value;
    const createCommentRequest = Object.assign(
      {},
      {
        user: { userid: user.info.userid },
        post: { postid: props.postid },
        content: data,
      }
    );
    fetchCreateComment(createCommentRequest)
      .then(response => {
        setDetailPageData({ ...detailPageData, comments: response });
      })
      .catch(err => {
        Alert.error("oops cannot create comment");
      });

    // arr.push(
    //   {
    //   commentid:3,
    //   commentdata:"2021-9-23 18:31:20",
    //   userinfo:{
    //     userid:1,
    //   username:"winter",
    //   userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn36JZPyW1BmGR_QM8SRGpBL44mjr1yLwAFw&usqp=CAU",
    // },
    // content:data
    // })
    // setDetailPageData({...detailPageData,comments:arr})
    document.querySelector(".comment-input").value = "";
  };
  const deleteComment = comment => {
    console.log(comment);
    const request = Object.assign({}, { ...comment });
    fetchDeleteComment(request)
      .then(response => {
        Alert.success("comment has deleted!");
        setDetailPageData({ ...detailPageData, comments: response });
      })
      .catch(err => {
        Alert.error("delete failed!");
      });
  };
  return (
    <div className="comment-section">
      <div className="comment-list-section">
        {comments.length === 0 ? (
          <h1>No Comments Yet</h1>
        ) : (
          comments.map((comment, i) => (
            <div
              key={comment.commentid}
              className={"comment no" + comment.commentid}
            >
              <div className="comment-profile-section">
                <div className="comment-profile-image">
                  <Link to={{ pathname: "/profile/" + comment.user.username }}>
                    <img
                      src={
                        comment.user.userImg
                          ? comment.user.userImg
                          : defaultUser
                      }
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="comment-main-section">
                <div className="comment-content-section">
                  <Link
                    to={{ pathname: "/profile/" + comment.user.username }}
                    className={
                      "comment-profile-username user-" + comment.user.userid
                    }
                  >
                    {comment.user.username}
                  </Link>
                  <span
                    ref={contentRef.current[i]}
                    suppressContentEditableWarning={true}
                    onChange={handleChange}
                    contentEditable={
                      user.auth
                        ? onEdit.commentid === comment.commentid &&
                          onEdit.active &&
                          user.info.userid === comment.user.userid
                          ? true
                          : false
                        : false
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={transformTags(comment.content)}
                    ></span>
                  </span>
                  <div
                    hidden={
                      user.auth
                        ? onEdit.commentid === comment.commentid &&
                          onEdit.active &&
                          user.info.userid === comment.user.userid
                          ? false
                          : true
                        : true
                    }
                  >
                    <div className="button-container">
                      <button
                        onClick={() => {
                          confirmEdit(
                            contentRef.current[i].current,
                            comment.commentid
                          );
                        }}
                      >
                        {" "}
                        {/* 댓글 수정 전송*/}
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        onClick={() => {
                          contentRef.current[i].current = initialContent;

                          setInitialContent(null);

                          setOnEdit({
                            active: false,
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  style={
                    user.auth
                      ? onEdit.commentid === comment.commentid &&
                        onEdit.active &&
                        user.info.userid === comment.user.userid
                        ? { display: "none" }
                        : { display: "flex" }
                      : { display: "flex" }
                  }
                  className="comment-content-sub-section"
                >
                  <div className="comment-time-section">
                    <span>{calculateDatetime(comment.commnetdate)}</span>
                  </div>
                  <div className="comment-reply-section">
                    <span
                      className={"comment-target-user-" + comment.user.username}
                      onClick={replyComment}
                    >
                      답장
                    </span>
                  </div>
                </div>
              </div>
              {user.auth ? (
                user.info.userid == comment.user.userid ? (
                  <div className="comment-edit-section">
                    <span
                      onClick={
                        !showmenu.active
                          ? () => {
                              setShowmenu({
                                commentid: comment.commentid,
                                active: true,
                              });
                            }
                          : () => {
                              setShowmenu({
                                active: false,
                              });
                            }
                      }
                    >
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </span>
                    <div
                      style={
                        showmenu.commentid === comment.commentid &&
                        showmenu.active
                          ? { display: "flex", flexDirection: "column" }
                          : { display: "none" }
                      }
                      className={"comment-edit-menu no" + comment.commentid}
                    >
                      <button
                        onClick={() => {
                          setShowmenu({
                            active: false,
                          });
                          setInitialContent(contentRef.current[i].current);
                          setOnEdit({
                            commentid: comment.commentid,
                            active: true,
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} /> 수정
                      </button>
                      <button onClick={() => deleteComment(comment)}>
                        <FontAwesomeIcon icon={faTrashAlt} /> 삭제
                      </button>
                    </div>
                  </div>
                ) : null
              ) : null}
            </div>
          ))
        )}
        {/* load comment */}
      </div>
      <div className="comment-input-section">
        <div className="comment-input-form">
          <div className="comment-input-container">
            <div className="img-section"></div>
            <input
              className="comment-input"
              type="text"
              onKeyDown={e => {
                if (e.key === "Enter") createComment();
              }}
              onChange={listenTags}
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
              onClick={createComment}
              disabled={user.auth ? false : true}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
        <div
          style={{ position: "absolute" }}
          hidden={autoCompleteResult ? false : true}
        >
          {autoCompleteResult.data && autoCompleteResult.data.length > 0
            ? autoCompleteResult.data.map(data => (
                <button
                  onClick={() => {
                    complete(
                      data.username ? data.username : data.hashtagname,
                      autoCompleteResult.targetElement
                    );
                    setAutoCompleteResult({ data: null, targetElement: null });
                  }}
                >
                  {data.username ? (
                    <img
                      src={data.userimg ? data.userimg : defaultUser}
                      alt=""
                    />
                  ) : null}
                  {data.username ? "@" + data.username : "#" + data.hashtagname}
                </button>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

function ImageInfo(props) {
  const detailPageData = props.detailPageData;
  return (
    <div className="img-info-container">
      {/* 프로필 앵커태그 */}
      <div className="img-info-header">
      <span className="title-header">Post {detailPageData.postform.postid}</span>
      <span>{calculateDatetime( detailPageData.postform.rdate)}</span>
      </div>
      <div className="img-info-title">
        
        <Link
          to={"/profile/" + detailPageData.postform.user.username}
          className="title-profile"
        >
          {" "}
          {detailPageData.postform.user.username}
        </Link>
        <span>님의</span>
        {/* 상품 앵커태그 */}
        <br />
        <span className="title-product">
          {detailPageData.postform.imgdata.tagData[0].productInfo.productName}
        </span>
        <br />

        <span className="rest">을 활용한 데일리 룩</span>
      </div>

      <div className="hashtag-container">
        {detailPageData.hashtags.map(hashtag => (
          <Link to={"/list/hashtag/" + hashtag.hashtagname + "/1"} className="hashtag">
            #{hashtag.hashtagname}
          </Link>
        ))}
      </div>

      
    </div>
  );
}

function Product(props) {
  const tagdata = props.detailPageData.postform.imgdata.tagData;

  return (
    <div className="product-container">
      <span className="title-header">tagged item</span>
      {tagdata.map((tag, index) => (
        <div className={"product product-" + index }>
          <div className="product-img-section">
            <a
              href={tag.productInfo.productUrl}
              rel="noreferrer"
              target="_blank"
            >
              <img src={tag.productInfo.productImgUrl} alt="productImg" />
            </a>
          </div>
          <div className="product-info-section">
            <Link to={"/list/brand/" + tag.productInfo.brandName + "/1"}>
              <span className="product-brand">{tag.productInfo.brandName}</span>
            </Link>
            <a
              href={tag.productInfo.productUrl}
              rel="noreferrer"
              target="_blank"
            >
              <span className="product-name">
                {tag.productInfo.productName}
              </span>
            </a>

            <span className="product-price">{tag.productInfo.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RelatedImages(props) {
  const userRelated = props.userRelated;
  const username = props.username;

  const postid = props.postid;
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
          {userRelated.map(relatedPost => {
            if (relatedPost.postid != postid) {
              return (
                <Link to={"/detail/" + relatedPost.postid}>
                  <img
                    src={relatedPost.imgdata && relatedPost.imgdata.imgUrl}
                    alt=""
                  />
                </Link>
              );
            } else {
              return null;
            }
          })}

          <div className="more">
            <Link to={"/profile/" + username}>
              <img
                src="https://post-phinf.pstatic.net/MjAyMTAzMjJfMTk1/MDAxNjE2Mzc5NTQ2OTcz.42DcHh3ob_HfoX8ogysOrN40cbhCbIrjuCWeEtHeV9sg.FjaSGRM8Q2FGLWP8ewZcr2ehzBgF7-PCxXhCnCCx0aIg.JPEG/001.jpg?type=w1200"
                alt=""
              />
              <span>
                <FontAwesomeIcon icon={faEllipsisH} />
              </span>
            </Link>
          </div>
        </Masonry>
      </div>
    </div>
  );
}
