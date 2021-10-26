import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useDidCache, useDidRecover } from "react-router-cache-route";
import LoadingIndicator from "../../common/LoadingIndicator";
import ScrollHandler from "../../common/ScrollHandler";
import ImgBox from "../ImgBox/ImgBox";
import defaultUser from "../../res/default-user.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Ranking.scss";
import { brandData, data,userdata } from "./sampleData";
import sample from "../../res/sample.png";
import calculateScale from "../../util/numberUtils"
import ReactTooltip from "react-tooltip";
import { getRankingData } from "../../util/APIUtils";
import {
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { UserContext } from "../../common/UserContext";

export default function Ranking(props) {
  const [list, setList] = useState([]);
  const [isThreshold, setIsThreshold] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMaxCount, setIsMaxCount] = useState(false);
  const [maxCount,setMaxCount] = useState(9);
  const [count, setCount] = useState(0);
  const { pathname } = useLocation();
  const {user} = useContext(UserContext)
  const toggleFollowModal = props.toggleFollowModal
  const followOrNot = props.followOrNot
  const history = useHistory()
  let type = pathname.split("/")[2];
  //like - user - brand
  let filter = pathname.split("/")[3];
  //all - men - women 
  useDidCache(() => {}, [list]);
  useDidRecover(() => {}, [list]);
  ScrollHandler();
  const setData = (bool,index)=>{

    const parentObj = list[type][filter]
    const obj = list[type][filter][index]
    

    console.log(bool)
    if(bool){obj.follower=obj.follower+1;obj.user.isfollowing=true}
    else {obj.follower=obj.follower-1;obj.user.isfollowing=false}
    
    parentObj.splice(index,1,obj)
    
    console.log(parentObj)
    setList({...list,[type]:{...list[type],[filter]:[...list[type][filter]]}})

  }
  const TopLikes = props => {
    return (
      <div id="toplike" className="TopLikes">
        {list[[type]] &&
          list[[type]][[filter]] &&
          list[[type]][[filter]].length > 0 &&
          list[[type]][[filter]].map((imgbox, index) => (
            <div
              id={"toplike-" + index}
              className={"img-box box-" + (index + 1)}
            >
              <ImgBox data={imgbox} />
              <div className="ranking-number-tag">
                <span className="">{index + 1}</span>
              </div>
            </div>
          ))}
      </div>
    );
  };
  const TopUser = props => {
    
    return (
      <div id="topuser" className="TopUser">
        <ReactTooltip effect="solid" >
                      </ReactTooltip>
        {list[[type]] &&
          list[[type]][[filter]] &&
          list[[type]][[filter]].length > 0 &&
          list[[type]][[filter]].map((data, index) => (
            <div
              id={"topuser-" + index}
              className={"user-box box-" + (index + 1)}
            >
              <div className="left">
                <div className="ranking-number-tag">
                  <span className="">{index + 1}</span>
                </div>
              </div>
              <div className="center">
                <div className="img-section">
                  <Link to={"/profile/"+data.user.username}>
                    <img src={data.user.userimg?data.user.userimg:defaultUser} alt="" />
                  </Link>
                </div>
                <div className="info-section">
                  <div className="user-info-main">
                    <div  className="username-section">
   
                      <Link style={data.user.username.length>20?{fontSize:"20px"}:{}} data-for={data.user.username.length<12?"tooltip":null}  data-tip={data.user.username}  to={"/profile/"+data.user.username}>{data.user.username}</Link>
                      
                     
                    </div>
                    <div className="user-info-section">
                      <span className="height">{data.user.height?data.user.height+"cm":null}</span>
                      <span className="sex">{data.user.sex===true?"male":"female"}</span>
                    </div>
                  </div>
                  <div className="user-info-sub">
                    <div className="follow-section">
                      <div onClick={e=>toggleFollowModal(e,"following",data.user.userid)} className="follow-container">
                        <span className="follow following">following</span>
                        <span className="follow-num">{calculateScale(data.following)}</span>
                      </div>
                      <div onClick={e=>toggleFollowModal(e,"follower",data.user.userid)} className="follow-container">
                        <span className="follow follower">follower</span>
                        <span className="follow-num">{calculateScale(data.follower)}</span>
                      </div>
                    </div>
                    <div className="sns-section">
                      <a hidden={data.user.instaid?false:true} rel="noreferrer" target="_blank" href={"http://instagram.com/"+data.user.instaid}>
                        <FontAwesomeIcon
                          className="insta-icon"
                          icon={faInstagram}
                        />
                      </a>
                      <a hidden={data.user.pinterestid?false:true} rel="noreferrer" target="_blank" href={"http://pinterset.com/"+data.user.pinterestid}>
                        <FontAwesomeIcon
                          className="pinter-icon"
                          icon={faPinterest}
                        />
                      </a>
                      <a hidden={data.user.twitterid?false:true} rel="noreferrer" target="_blank" href={"http://twitter.com/"+data.user.twitterid}>
                        <FontAwesomeIcon
                          className="twitter-icon"
                          icon={faTwitter}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right"> 
              
                <button hidden={user.info&&user.info.userid===data.user.userid?true:false} onClick={e=>followOrNot(user.info.userid, data.user.userid).then(bool=>setData(bool,index))} className="follow">{data.user.isfollowing?"following":"follow"}</button>
              </div>
            </div>
          ))}
      </div>
    );
  };
  const TopBrand = props => {
    if(list[type]&&list[type][filter]){
    console.log(list[type][filter])
  }

    return (
      <div id="topbrand" className="TopBrands">
        {list[type] &&
          list[type][filter] &&
          list[type][filter].length > 0 &&
          list[type][filter].map((data, index) => (
            <div
              id={"topbrand-" + index}
              className={"brand-box box-" + (index + 1)}
            >
              <div className="info-section">
                <div className="ranking-number-tag">
                  <span className="">{index + 1}</span>
                </div>
                <div className="brand-main-section">
                  <div className="brandname-container">
                    <Link to={"/list/brand/"+data.brandname+"/1"} className="brandname">{data.brandname}</Link>
                  </div>
                  <div className="brand-info-container">
                    <span>{calculateScale(data.postcount)} posts</span>
                  </div>
                </div>
                <div className="brand-button-section">
                  <Link to={"/list/brand/" + data.brandname + "/1"}>more</Link>
                </div>
              </div>
              <div className="img-section">
                {data.posts.map((post,index)=>(
                  <Link to={"/detail/"+post.postid}>
                  <img src={post.imgdata.imgUrl} alt="" />
                </Link>
                ))}
                
                
              </div>
            </div>
          ))}
      </div>
    );
  };

  // useEffect(() => {
  //   if(type==="brand"&&filter!=="all"){
  //     history.push("/ranking/brand/all")
  //   }
  //   //all - women - men
  //   setLoading(true);
  //   if(list[type]&&list[type][filter]&&list[type][filter].length>0){
  //     setCount(list[type][filter].length/10)
      
  //   }
  //   else{
  //     setCount(0)

  //   setList(
  //     {
  //       ...list,
  //       [type]: { ...list[type], [filter]: userdata },
  //     },
      
  //   );
  // }
  // setLoading(false)
  //   // setLoading(true);
  //   // getRankingData(type, filter, count)
  //   //   .then(res => {
  //   //     if (res.ok) {
  //   //       setList(
  //   //         res,
  //   //         setCount(count => count + 1),
  //   //         setLoading(false)
  //   //       );
  //   //     } else {
  //   //       console.log(res);
  //   //       setLoading(false);
  //   //       // props.history.push("/404")
  //   //       setCount(count=> count+1)
  //   //     }
  //   //   })
  //   //   .catch(err => {
  //   //     console.log(err);
  //   //   });
  //   //   const request = Object.assign({},{})
  //   // getRankingList()
  // }, [filter, type]);
  // useEffect(() => {

  //   if (!isThreshold && !isMaxCount) {
  //     window.onscroll = _.debounce(e => {
  //       setIsThreshold(
  //         window.innerHeight + document.documentElement.scrollTop >=
  //           document.body.offsetHeight
  //       );
  //     });
  //   }
  //   console.log(list)
  //   if (isThreshold && !loading && !isMaxCount) {
  //     setLoading(true);

      
  //     setTimeout(() => {
  //       setList(
  //         { ...list, [type]: {...list[type], [filter]: [...list[type][filter], ...userdata] } },
  //         setIsThreshold(
  //           false,
  //           setLoading(
  //             false,
  //             setCount(count => count + 1)
  //           )
  //         )
  //       );
  //       if (count === 9) {
  //         setIsMaxCount(true);
  //       }
  //     }, 1000);

  //     // getRankingData(type, filter, count).then(res => {
  //     //   if (res.ok) {
  //     //     setList(list => [...list, res.ok.content],setIsThreshold(false),setCount(count=>count+1));

  //     //   }
  //     //   else{
  //     //       setIsThreshold(false)

  //     //       setCount(count=>count+1)
  //     //   }
  //     // });
  //   }

  //   return () => (window.onscroll = null);
  // }, [isThreshold, isMaxCount]);
  // 백 구축되면 위에꺼 지우고 아래꺼 복귀 
  useEffect(() => {
    let current_userid=-1
    if(user.info){
      current_userid = user.info.userid
    }
    //all - women - men
    setLoading(true);
    if(list[type]&&list[type][filter]&&list[type][filter].length>0){
      setCount(list[type][filter].length/10)
      
    }
    else{
      setCount(0)
      
      getRankingData(type, filter, 0,current_userid).then(res=>{
        console.log(res)
        if(res.length<10){
          setIsMaxCount(true)
        }
        setList(
          {
            ...list,
            [type]: { ...list[type], [filter]: res },
          }
        ,setCount(1))//확인 필요함

      }
        ).catch(err=>console.log(err))
  }
  setLoading(false)
  }, [filter, type]);
  useEffect(() => {
    let current_userid=-1
    if(user.info){
      current_userid = user.info.userid
    }
    if (!isThreshold && !isMaxCount) {
      window.onscroll = _.debounce(e => {
        setIsThreshold(
          window.innerHeight + document.documentElement.scrollTop >=
            document.body.offsetHeight
        );
      });
    }

    if (isThreshold && !loading && !isMaxCount) {
      setLoading(true);

      
      console.log(count)
        getRankingData(type,filter,count,current_userid).then(res=>{
          console.log(res)
          setList(
            { ...list, [type]: {...list[type], [filter]: [...list[type][filter], ...res] } },
            setIsThreshold(
              false,
              setLoading(
                false,
                setCount(count => count + 1)
              )
              
            )
          );
          if(res.length<10){
            setIsMaxCount(true)     
          }
        }).catch(err=>console.log(err))
        
        if (count === 9||count===maxCount) {
          setIsMaxCount(true);
        
      }

      
    }

    return () => (window.onscroll = null);
  }, [isThreshold, isMaxCount]);
  return (
    <div className="Ranking">
      <Switch>
        <Route exact path="/ranking/likes/:id" component={TopLikes} />

        <Route exact path="/ranking/user/:id" component={TopUser} />
        <Route exact path="/ranking/brand/:id" component={TopBrand} />
      </Switch>
      {loading ? (
        <div style={{ height: "10vh" }}>
          <LoadingIndicator />
        </div>
      ) : null}
    </div>
  );
}
