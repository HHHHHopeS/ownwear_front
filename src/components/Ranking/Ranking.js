import _ from "lodash";
import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useDidCache, useDidRecover } from "react-router-cache-route";
import LoadingIndicator from "../../common/LoadingIndicator";
import ScrollHandler from "../../common/ScrollHandler";
import ImgBox from "../ImgBox/ImgBox";
import defaultUser from "../../res/default-user.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Ranking.scss";
import { data } from "./sampleData";
import sample from "../../res/sample.png";
import {
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Ranking(props) {
  const [list, setList] = useState([]);
  const [isThreshold, setIsThreshold] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMaxCount, setIsMaxCount] = useState(false);
  const [likeList, setLikeList] = useState({});

  const [count, setCount] = useState(0);
  const { pathname } = useLocation();
  let type = pathname.split("/")[2];
  //like - user - brand
  let filter = pathname.split("/")[3];
  useDidCache(() => {}, [list]);
  useDidRecover(() => {}, [list]);
  ScrollHandler();
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
                  <Link to="">
                    <img src={defaultUser} alt="" />
                  </Link>
                </div>
                <div className="info-section">
                  <div className="user-info-main">
                    <div className="username-section">
                      <Link to="">AA</Link>
                    </div>
                    <div className="user-info-section">
                      <span className="height">160cm</span>
                      <span className="sex">male</span>
                    </div>
                  </div>
                  <div className="user-info-sub">
                    <div className="follow-section">
                      <div onClick="" className="follow-container">
                        <span className="follow following">following</span>
                        <span className="follow-num">1520</span>
                      </div>
                      <div onClick="" className="follow-container">
                        <span className="follow follower">follower</span>
                        <span className="follow-num">1500</span>
                      </div>
                    </div>
                    <div className="sns-section">
                      <a rel="noreferrer" target="_blank" href="">
                        <FontAwesomeIcon
                          className="insta-icon"
                          icon={faInstagram}
                        />
                      </a>
                      <a rel="noreferrer" target="_blank" href="">
                        <FontAwesomeIcon
                          className="pinter-icon"
                          icon={faPinterest}
                        />
                      </a>
                      <a rel="noreferrer" target="_blank" href="">
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
                <button className="follow">Follow</button>
              </div>
            </div>
          ))}
      </div>
    );
  };
  const TopBrand = props => {
    return (
      <div id="topbrand" className="TopBrands">
        {list[[type]] &&
          list[[type]][[filter]] &&
          list[[type]][[filter]].length > 0 &&
          list[[type]][[filter]].map((data, index) => (
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
                    <span className="brandname">Adidas</span>
                  </div>
                  <div className="brand-info-container">
                    <span>1000 posts</span>
                  </div>
                </div>
                <div className="brand-button-section">
                  <Link to={"/list/brand/"+"adidas"+"/1"}>more</Link>
                </div>
              </div>
              <div className="img-section">
                <Link>
                  <img src={sample} alt="" />
                </Link>
                <Link>
                  <img src={sample} alt="" />
                </Link>
                <Link>
                  <img src={sample} alt="" />
                </Link>
              </div>
            </div>
          ))}
      </div>
    );
  };

  useEffect(() => {
    //all - women - men
    setLoading(true);

    setList(
      {
        ...list,
        [type]: {
          [filter]: data,
        },
      },
      setLoading(false)
    );
    console.log(1);
    // setLoading(true);
    // getRankingData(type, filter, count)
    //   .then(res => {
    //     if (res.ok) {
    //       setList(
    //         res,
    //         setCount(count => count + 1),
    //         setLoading(false)
    //       );
    //     } else {
    //       console.log(res);
    //       setLoading(false);
    //       // props.history.push("/404")
    //       setCount(count=> count+1)
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    //   const request = Object.assign({},{})
    // getRankingList()
  }, [filter, type]);
  useEffect(() => {
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

      setTimeout(() => {
        setList(
          { ...list, [type]: { [filter]: [...list[type][filter], ...data] } },
          setIsThreshold(
            false,
            setLoading(
              false,
              setCount(count => count + 1)
            )
          )
        );
        if (count === 9) {
          setIsMaxCount(true);
        }
      }, 1000);

      // getRankingData(type, filter, count).then(res => {
      //   if (res.ok) {
      //     setList(list => [...list, res.ok.content],setIsThreshold(false),setCount(count=>count+1));

      //   }
      //   else{
      //       setIsThreshold(false)

      //       setCount(count=>count+1)
      //   }
      // });
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
