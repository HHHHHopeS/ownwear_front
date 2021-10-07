import { useState } from "react";
import "./Tab.scss";

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
            신민아님이 게시글에 좋아요 눌렀습니다.
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