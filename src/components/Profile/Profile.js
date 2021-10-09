import "./Profile.scss";
import { useState, useEffect } from "react";
import { setAlertChecked } from "../../util/APIUtils";
import _ from "lodash";
import LoadingIndicator from "../../common/LoadingIndicator";
import sample from "../../res/sample.png";
import calculateScale from "../../util/numberUtils";
import { calculateDatetime } from "../../util/TimeUtils";
import { faCheck, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
export default function Profile() {
  const [isThreshold, setIsThreshold] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState([]);

  const data = [
    {
      post: {
        post_no: 1,
        rdate: "2021-08-30 01:02:30",
        imgData: {
          imageurl: sample,
        },
      },
      likecount: 1000000,
      commentcount: 2100000,
    },
    {
      post: {
        post_no: 2,
        rdate: "2020-08-30 01:02:30",
        imgData: {
          imageurl: sample,
        },
      },
      likecount: 1502011,
      commentcount: 2100000,
    },
    {
      post: {
        post_no: 3,
        rdate: "2020-08-30 01:02:30",
        imgData: {
          imageurl: sample,
        },
      },
      likecount: 150200,
      commentcount: 2100000,
    },
    {
      post: {
        post_no: 4,
        rdate: "2020-08-30 01:02:30",
        imgData: {
          imageurl: sample,
        },
      },
      likecount: 1000000,
      commentcount: 2100000,
    },
    {
      post: {
        post_no: 5,
        rdate: "2020-08-30 01:02:30",
        imgData: {
          imageurl: sample,
        },
      },
      likecount: 1502011,
      commentcount: 2100000,
    },
    {
      post: {
        post_no: 6,
        rdate: "2020-08-30 01:02:30",
        imgData: {
          imageurl: sample,
        },
      },
      likecount: 150200,
      commentcount: 2100000,
    },
    {
      post: {
        post_no: 7,
        rdate: "2020-08-30 01:02:30",
        imgData: {
          imageurl: sample,
        },
      },
      likecount: 1000000,
      commentcount: 2100000,
    },
    {
      post: {
        post_no: 8,
        rdate: "2020-08-30 01:02:30",
        imgData: {
          imageurl: sample,
        },
      },
      likecount: 1502011,
      commentcount: 2100000,
    },
    {
      post: {
        post_no: 9,
        rdate: "2020-08-30 01:02:30",
        imgData: {
          imageurl: sample,
        },
      },
      likecount: 150200,
      commentcount: 2100000,
    },
    {
      post: {
        post_no: 10,
        rdate: "2020-08-30 01:02:30",
        imgData: {
          imageurl: sample,
        },
      },
      likecount: 1000000,
      commentcount: 2100000,
    },
    {
      post: {
        post_no: 11,
        rdate: "2020-08-30 01:02:30",
        imgData: {
          imageurl: sample,
        },
      },
      likecount: 1502011,
      commentcount: 2100000,
    },
    {
      post: {
        post_no: 12,
        rdate: "2020-08-30 01:02:30",
        imgData: {
          imageurl: sample,
        },
      },
      likecount: 150200,
      commentcount: 2100000,
    },
  ];
  const [isMaxCount,setIsMaxCount] = useState(false)
  const history = useHistory();
  
  useEffect(() => {
      
    if (!isThreshold&&!isMaxCount) {
      window.onscroll = _.debounce(e => {
        setIsThreshold(
          window.innerHeight + document.documentElement.scrollTop >=
            document.body.offsetHeight
        );  
      });
    }

    if (isThreshold&&!isMaxCount) {
      setLoading(true);
      setTimeout(() => {
        
        setContents([...contents, data]);
        // 스크롤 끝 
        // if(res.length===0){
        //     setIsMaxCount(true)
        // }
        setIsThreshold(false);

      }, 500);
      setLoading(false);
      return (window.onscroll = null);
    }
  }, [isThreshold]);

  //

  return (
    <div className="Profile">
      {contents.map((content, index) => (
        <div className="page-container">
          {content.map((item, index) => (
              
            <div onClick={()=>history.push(`/detail/${item.post.post_no}`)} className={"post post-" + item.post.post_no}>
                
              <img src={item.post.imgData.imageurl} alt="" />
              <span className="like-count img-info">
                {" "}
                <FontAwesomeIcon icon={faHeart} ></FontAwesomeIcon>
                {calculateScale(item.likecount)}
              </span>
              <span className="comment-count img-info">
                {" "}
                <FontAwesomeIcon icon={faComment} ></FontAwesomeIcon>
                {calculateScale(item.commentcount)}
              </span>
              <span className="rdate img-info">
                
                <FontAwesomeIcon icon={faCheck}/>
                {calculateDatetime(item.post.rdate)}
              </span>
            </div>
          ))}
        </div>
      ))}
      {loading ? <LoadingIndicator /> : null}
    </div>
  );
}
