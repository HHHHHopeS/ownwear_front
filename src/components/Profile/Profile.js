import { faCheck, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import LoadingIndicator from "../../common/LoadingIndicator";
import sample from "../../res/sample.png";
import { getProfileData } from "../../util/APIUtils";
import calculateScale from "../../util/numberUtils";
import { calculateDatetime } from "../../util/TimeUtils";
import "./Profile.scss";
export default function Profile(props) {
  let id = props.id;
  const [isThreshold, setIsThreshold] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState([]);
  const location = useLocation()
  const data = [  
    {
      post: {
        postid: 1,
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
  const [isMaxCount, setIsMaxCount] = useState(false);
  const [maxCount, setMaxCount] = useState(null);
  const history = useHistory();
  const [pageCount, setPageCount] = useState(0);
  const [isError,setIsError] = useState(false)

  const username = location.pathname.split("/")[2]
  useEffect(() => {
    if (pageCount === maxCount) {
      return setIsMaxCount(true);
    }
    if (pageCount === 0&&!isMaxCount) {
      getProfileData(username,pageCount).then(response =>{
        console.log(response)
        if(response){
        setContents(
          response.content,
          setMaxCount(response.totalPages, setPageCount(pageCount=>pageCount + 1))
        )
      }
      else{
        setContents([])
        setIsMaxCount(true)
      }
      

        
      
      });
    }
    if (!isThreshold && !isMaxCount) {
      window.onscroll = _.debounce(e => {
        setIsThreshold(
          window.innerHeight + document.documentElement.scrollTop >=
            document.body.offsetHeight
        );
      });
    }

    if (isThreshold && !isMaxCount) {
      setLoading(true);
      getProfileData(username,pageCount)
        .then(response =>
          setContents(contents=>
            [...contents, response.content]
            
          )
        )
        .then(() => setIsThreshold(false)).catch(err=>console.log(err))
      setLoading(false);
      setPageCount(pageCount=>pageCount + 1)
      return (window.onscroll = null);
    }
    
   
  }, [isThreshold,username]);

  //

  return (
    <div className="Profile">
      {isError?
      <div className="error">
        cannot load page ,please retry
      </div>
      :
      
      
        <div className="page-container">
          {contents&&contents.map((item, index) => (
            <div
              onClick={() => history.push(`/detail/${item.postid}`)}
              className={"post post-" + item.postid}
            >
              <img src={item.imgData?item.imgData.imgUrl:null} alt="" />
              <span className="like-count img-info">
                {" "}
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                {calculateScale(item.likecount)}
              </span>
              <span className="comment-count img-info">
                {" "}
                <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                {calculateScale(item.commentcount)}
              </span>
              <span className="rdate img-info">
                <FontAwesomeIcon icon={faCheck} />
                {calculateDatetime(item.rdate)}
              </span>
            </div>
          ))
          }
        </div>
      }
    
      {loading ? <LoadingIndicator /> : null}
    </div>
  );
}
