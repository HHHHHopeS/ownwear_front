import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router";
import {
  useDidCache,
  useDidRecover,
  getCachingKeys,
} from "react-router-cache-route";
import _ from "lodash";
import { data } from "./sampleData";
import "./Ranking.scss";
import { getRankingData } from "../../util/APIUtils";
import LoadingIndicator from "../../common/LoadingIndicator";
import ImgBox from "../ImgBox/ImgBox";
import ScrollHandler from "../../common/ScrollHandler";

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
    return <div className="TopUser"></div>;
  };
  const TopBrand = props => {
    return <div className="TopBrands"></div>;
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
  }, []);
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
          {...list, [type]: { [filter]: [...list[type][filter], ...data] } },
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
