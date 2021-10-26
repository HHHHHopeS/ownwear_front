import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../common/UserContext";
import { getActivity } from "../../util/APIUtils";
import { calculateDatetime } from "../../util/TimeUtils";
import { Link } from "react-router-dom";
import "./Tab.scss";


function Tabs() {
  const {user}= useContext(UserContext)
  const [toggleState, setToggleState] = useState(1);

  const [follower, setFollower] = useState([


  ]);

  // const [list] = useState(
  //   [
  // {type:"following",likepostid,username,alert_date},
  // {type:"follower",commentid,username,alert_date},
  // {type:"following",likepostid,username,alert_date},
  // {type:"following",likepostid,username,alert_date},
  // {type:"follower",commentid,username,alert_date},
  // {type:"follower",likepostid,username,alert_date},
  //   ]


  // )


   useEffect(()=>{

     try{
     getActivity(user.info.userid).then(response => {
     console.log(response)
     setFollower(response)
   })} catch(e){
     console.log(e);
   }

   },[])

  // [{commentid,likepostid,username,alert_date}]

  const FollowerList = props => {
    const type= props.type
    
    return(
    follower&&follower.length>0&&follower.map(f => {
    
    if (f.type === "follower" && (type === "all" ||type=== "follower")) {
      return (<p>  <Link to={"/profile/"+f.username}>{f.username}</Link>님이 회원님 <Link to={"/detail/"+f.postid}>게시글</Link>에 {f.likepostid?<div><span className="like">👍좋아요</span>를 눌렀습니다.</div>:null}
        {f.commentid? <div><span className="like">💬댓글</span>을 남겼습니다.</div>:null}
        <span className="time">{calculateDatetime(f.alert_date)}</span></p>)
    }
    else if (f.type === "following" && (type === "all" ||type=== "following")) {
      return( <p>  <Link to={"/profile/"+f.username}>{f.username}</Link>님 <Link to={"/detail/"+f.postid}>게시글</Link>에  {f.likepostid?<div><span className="like">👍좋아요</span>를 눌렀습니다.</div>:null}
        {f.commentid? <div><span className="like">💬댓글</span>을 남겼습니다.</div>:null}
        <span className="time">{calculateDatetime(f.alert_date)}</span></p>)
    }
  }
  )
  )
}



  const toggleTab = (index) => {
    setToggleState(index);
  };



  return (
    <div className="tab-container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        > ALL

        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >Follower

        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Following
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>ALL</h2>
          <hr />
          {/* <p>
            모두 볼 수 있는 곳 
          </p>
          <p>
            모두 볼 수 있는 곳 
          </p>
          <p>
            모두 볼 수 있는 곳 
          </p>
          <p>
            모두 볼 수 있는 곳 
          </p>
          <p>
            모두 볼 수 있는 곳 
          </p>
          <p>
            모두 볼 수 있는 곳 
          </p>
          <p>
            모두 볼 수 있는 곳 
          </p>
          <p>
            모두 볼 수 있는 곳 
          </p>
          <p>
            모두 볼 수 있는 곳 
          </p>
          <p>
            모두 볼 수 있는 곳 
          </p> */}
        <FollowerList type={"all"}/>


        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Follower</h2>
          <hr />

          <FollowerList type={"follower"}/>

          {/* {
          follower.map( f=>{
            return <p> 
              {f.username}님이 회원님 게시글에
              {f.likepostid !== null && <div><span className="like">👍좋아요</span>를 눌렀습니다.</div>}
              {f.commentid !== null && <div><span className="like">💬댓글</span>을 남겼습니다.</div> }
               <span className="time">{f.alert_date}</span></p>
          })
        } */}










          {/* 
          <p>
            ✔ <a href="">최동현</a>님이 회원님 게시글에 <span className="like">👍좋아요</span>를 눌렀습니다. <span className="time">{("2021-10-15 05:05:10")}</span>
          </p>
          <p>
            ✔ <a href="">송지훈</a>님이 회원님 게시글에  <span className="like">👍좋아요</span>를 눌렀습니다. <span className="time">{calculateDatetime("2021-10-15 02:05:10")}</span>
          </p>
          <p>
            ✔ <a href="">최현호</a>님이 회원님 게시글에  <span className="like">💬댓글</span>을 남겼습니다. <span className="time">{calculateDatetime("2021-10-14 04:05:10")}</span>
          </p>
          <p>
            ✔ <a href="">장준석</a>님이 회원님 게시글에  <span className="like">💬댓글</span>을 남겼습니다. <span className="time">{calculateDatetime("2021-10-14 03:05:10")}</span>
          </p>
          <p>
            ✔ <a href="">임주희</a>님이 회원님 게시글에  <span className="like">💬댓글</span>을 남겼습니다. <span className="time">{calculateDatetime("2021-10-14 05:05:10")}</span>
          </p>
          <p>
            ✔  <a href="">김형수</a>님이 회원님 게시글에  <span className="like">👍좋아요</span>를 눌렀습니다. <span className="time">{calculateDatetime("2021-10-13 05:05:10")}</span>
          </p>
          <p>
            ✔ <a href="">유학수</a>님이 회원님 게시글에  <span className="like">💬댓글</span>을 남겼습니다. <span className="time">{calculateDatetime("2021-10-12 05:05:10")}</span>
          </p>
          <p>
            ✔ <a href="">박준협</a>님이 회원님 게시글에  <span className="like">👍좋아요</span>를 눌렀습니다.  <span className="time">{calculateDatetime("2021-10-11 05:05:10")}</span>
          </p>
*/}
        </div>


        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Following</h2>
          <hr />
    
          <FollowerList type={"following"}/>
        </div>
      </div>
    </div>
  );
}

export default Tabs;