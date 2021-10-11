import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router";
import _ from "lodash";

import "./Ranking.scss";
import { getRankingData } from "../../util/APIUtils";
import LoadingIndicator from "../../common/LoadingIndicator";
export default function Ranking(props) {
  const [list, setList] = useState([]);
  const [isThreshold, setIsThreshold] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMaxCount, setIsMaxCount] = useState(false);

  const [count, setCount] = useState(0);
  const { pathname } = useLocation();

  const TopLikes = props => {
    return <div className="TopLikes"></div>;
  };
  const TopUser = props => {
    return <div className="TopUser"></div>;
  };
  const TopBrand = props => {
    return <div className="TopBrands"></div>;
  };

  useEffect(() => {
    const type = pathname.split("/")[2];
    const filter = pathname.split("/")[3];

    setLoading(true);
    getRankingData(type, filter, count)
      .then(res => {
        if (res.ok) {
          setList(
            res,
            setCount(count => count + 1),
            setLoading(false)
          );
        } else {
          console.log(res);
          setLoading(false);
          // props.history.push("/404")
          setCount(count=> count+1)
        }
      })
      .catch(err => {
        console.log(err);
      });
    //   const request = Object.assign({},{})
    // getRankingList()
  }, [pathname]);
  useEffect(() => {
    if(count===9){
        setIsMaxCount(true)
    }
    const type = pathname.split("/")[2];
    const filter = pathname.split("/")[3];
    console.log(isThreshold)
    console.log(isMaxCount)
    console.log(count)
    if (!isThreshold && !isMaxCount) {
      window.onscroll = _.debounce(e => {
        setIsThreshold(
          window.innerHeight + document.documentElement.scrollTop >=
            document.body.offsetHeight
        );
      });
    }
    if (isThreshold && !isMaxCount) {
      getRankingData(type, filter, count).then(res => {
        if (res.ok) {
          setList(list => [...list, res.ok.content],setIsThreshold(false),setCount(count=>count+1));

        }
        else{
            setIsThreshold(false)

            setCount(count=>count+1)
        }
      });
      
    }
    return () => (window.onscroll = null);
  }, [isThreshold]);
  if (loading) {
    return (
      <div style={{ height: "100vh" }}>
        <LoadingIndicator />
      </div>
    );
  }
  return (
    <div className="Ranking">
      <Switch>
        <Route exact path="/ranking/likes/:id" component={TopLikes} />
        <Route exact path="/ranking/user/:id" component={TopUser} />
        <Route exact path="/ranking/brand/:id" component={TopBrand} />
      </Switch>
    </div>
  );
}
