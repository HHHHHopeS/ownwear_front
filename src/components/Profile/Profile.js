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
  const [preUser,setPreUser]= useState(null);
  const username = location.pathname.split("/")[2]
  useEffect(() => {
    
    if(preUser!==username){

      getProfileData(username,0).then(response=>{
        if(response){
          setContents(
            response.content,
            setMaxCount(response.totalPages,setPageCount(1))
          )
        }
      })
      setPreUser(username)
    }
    
    
    if (pageCount === 0&&!isMaxCount) {

      getProfileData(username,pageCount).then(response =>{
        console.log(response)
        if(response.content.length>0){
          
        setContents(
          response.content,
          setMaxCount(response.totalPages, setPageCount(pageCount=>pageCount + 1))
        )
        if((pageCount+1)===response.totalPages){
          setIsMaxCount(true)
        }
        setPreUser(username)
      }
      else{
        
        setPreUser(username)
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
      },100);
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
      
      
      if(pageCount==maxCount){

        setIsMaxCount(true)
      }
      setPageCount(pageCount=>pageCount + 1)
      setIsThreshold(false)
      return (window.onscroll = null);
    }
    
   
  }, [isThreshold,username]);

  //

  return (
    <div className="Profile" style={contents.length!==0?{}:{minHeight:"30vh"}}>
      {isError?
      <div className="error">
        cannot load page ,please retry
      </div>
      :
      
      
        <div className="page-container">
          {contents&&contents.length!==0?contents.map((item, index) => (
            <div
              onClick={() => history.push(`/detail/${item.postid}`)}
              className={"post post-" + item.postid}
            >
              <img src={item.imgdata?item.imgdata.imgUrl:null} alt="" />
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
          :
          <div className="null-page">
            해당유저의 이미지가 존재하지 않습니다.
          </div>
          }
        </div>
      }
    
      {loading ? <LoadingIndicator /> : null}
    </div>
  );
}
