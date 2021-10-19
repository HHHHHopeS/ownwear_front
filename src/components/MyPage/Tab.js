import { useState } from "react";
import "./Tab.scss";
import {calculateDatetime} from "../../util/TimeUtils"

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

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
          </p>
          <p>
            모두 볼 수 있는 곳 
          </p>
          
          
          
        </div>
         
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Follower</h2>
          <hr />
          <p>
            ✔ <a href="">최동현</a>님이 회원님 게시글에 <span className="like">👍좋아요</span>를 눌렀습니다. <span className="time">{calculateDatetime("2021-10-15 05:05:10")}</span>
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

        </div>


        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
           <h2>Following</h2>
          <hr />
          <p>
           김선호님 게시글에 좋아요 눌렀습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tabs;