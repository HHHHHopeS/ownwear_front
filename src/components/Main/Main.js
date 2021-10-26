import _ from "lodash";
import React, { useEffect, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { getIndexDataInit, getIndexMoreData } from "../../util/APIUtils";
import NotFound from "../404/NotFound";
import ImgBox from "../ImgBox/ImgBox";
import "./Main.scss";

export default function Main(props) {
  const { pathname } = useLocation();

  const [data, setData] = useState({
    all: {
      ranking: [],
      new: [],
      brand: [],
      suggestion: [],
      more: [],
    },
    men: {
      ranking: [],
      new: [],
      brand: [],
      suggestion: [],
      more: [],
    },
    women: {
      ranking: [],
      new: [],
      brand: [],
      suggestion: [],
      more: [],
    },
  });


  const [page, setPage] = useState(0);
  const [ids, setIds] = useState({ all: [], men: [], women: [] });
  const [brand, setBrand] = useState([]);
  const [hotuser, setHotuser] = useState([]);
  const [hotTag, setHotTag] = useState([]);
  const [isThreshold, setIsThreshold] = useState(false);
  const [isMaxCount, setIsMaxCount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let url = pathname.split("/")[1];
  // console.log(pathname)
  if (!url) {
    url = "all"
  }
  // console.log(page)
  // console.log(isMaxCount)s
  // console.log(isThreshold)
  const listSection = (value, data) => {
    if (data && data.length > 0) {
      if (value === "ranking") {
        return (
          <div className="list-section">
            <div className="title-section">{value}</div>
            <span className="line"></span>
            <div className="imgbox-section">
              {data ? data.map(boxdata => <ImgBox data={boxdata} />) : null}
            </div>
            <div className="more-button-section">
              <Link to={{ pathname: "/ranking/likes/all" }}>More</Link>
            </div>
          </div>
        )
      }
      else {
        return (
          <div className="list-section">
            <div className="title-section">{value}</div>
            <span className="line"></span>
            <div className="imgbox-section">
              {data ? data.map(boxdata => <ImgBox data={boxdata} />) : null}
            </div>
            {value!=="추천코디"?
              <div className="more-button-section">
                <Link to={{ pathname: `/list/${value==="최신글"?"new/all/1":"brand/"+value}/1` }}>More</Link>
              </div>
              :null
            }
            
          </div>
        );
      }
    }
  };
  //초기데이터
  useEffect(() => {

    setIsLoading(true);
    if (pathname !== "/" && pathname !== "/men" && pathname !== "/women") {
      setIsLoading(false)
      return false
    }
    if (data[url].ranking.length === 0) {

      setIsMaxCount(false)
      setPage(0)

    }
    else if (data[url].brand.length === 0 && data[url].ranking.length !== 0) {
      setIsMaxCount(false)
      setPage(1)

    }
    else if (data[url].suggestion.length === 0 && data[url].brand.length !== 0 && data[url].ranking.length !== 0) {
      setIsMaxCount(false)
      setPage(2)

    }
    else {
      setPage(data[url].suggestion.length / 6 + 2)

    }
    return setIsLoading(false, setIsThreshold(false))
  }, [url]);

  useEffect(() => {

    const newArr = []
    const req = { url, page, ids: ids[url] }
    if (url !== "ranking" && url !== "list") {
      if (!isThreshold && !isMaxCount) {
        window.onscroll = _.debounce(e => {
          setIsThreshold(
            window.innerHeight + document.documentElement.scrollTop >=
            document.body.offsetHeight
          );
        });
      }
      if (page === 4) {
        setIsMaxCount(true);
      }
      if (page === 0) {
        setIsLoading(true)
        getIndexDataInit(url).then(response => {
          setData({ ...data, [url]: { ...data[url], ranking: response.postMap.rank, new: response.postMap.new } },
            setPage(1), setIsLoading(false),
            setBrand(response.brandForms), setHotuser(response.userInfos), setHotTag(response.hashTagForms))

          for (let i = 0; i < response.postMap.new.length; i++) {
            if (response.postMap.new[i].postid) {
              newArr.push(response.postMap.new[i].postid, response.postMap.rank[i].postid)
            }
          }
          setIds({ ...ids, [url]: [...newArr] })
        }).catch(err => console.log(err))
      }
      if (isThreshold && !isLoading && !isMaxCount && page === 1) {
        setIsLoading(true);
        getIndexMoreData(req).then(response => {
          console.log(response)
          setData({ ...data, [url]: { ...data[url], brand: response.brand } }, setIsThreshold(false, setIsLoading(false, setPage(2))))
          for (let i = 0; i < response.brand.length; i++) {
            newArr.push(response.brand[i].postid)
          }
          setIds({ ...ids, [url]: [...ids[url], ...newArr] })
        }).catch(err => console.log(err))
      }
      if (isThreshold && !isLoading && !isMaxCount && page > 1) {
        setIsLoading(true)
        getIndexMoreData(req).then(response => {
          setData({ ...data, [url]: { ...data[url], suggestion: [...data[url].suggestion, ...response.random] } }, setIsLoading(false, setIsThreshold(false), setPage(page + 1)))
          for (let i = 0; i < response.random.length; i++) {
            newArr.push(response.random[i].postid)
          }
          setIds({ ...ids, [url]: [...ids[url], ...newArr] })
        }).catch(err => console.log(err))

      }
    }
    console.log(data)
    return () => (window.onscroll = null);
  }, [isThreshold, isMaxCount, page]);
  // useEffect(() => {
  //   if (!data || currentUrl) {
  //     setIsLoading(true);
  //     setData({ ...data, new: sampleGongyou, ranking: sampleGongyou });
  //     setIsLoading(false);
  //     // getIndexDataInit()
  //     //   .then(response => {
  //     //     console.log(response)
  //     //     console.log(response.brandForms)
  //     //     setBrand(response.brandForms)
  //     //     if (response.postMap.new) {
  //     //       setData(response.postMap.new)
  //     //     }
  //     //     if (response.postMap.ranking) {
  //     //       setData(response.postMap.ranking)
  //     //     }
  //     //   }
  //     //   )
  //   }
  // }, [JSON.stringify(data), currentUrl]);
  //스크롤시 추가데이터
  // useEffect(() => {
  //   const req = { url, page, ids };
  //   // setTimeout(() => setMoreData([...moreData, sampleGongyou]), 1000)
  //   console.log(page);

  //   if (page === 1) {
  //     setData({ ...data, brand: sampleGongyou }, setIsLoading(false));
  //     console.log(2);
  //   }

  //   if (page >= 2) {
  //     setData(
  //       { ...data, suggestion: [...data.suggestion, ...sampleGongyou] },
  //       setIsLoading(false)
  //     );
  //   }
  //   // getIndexMoreData(req).then(response => {
  //   //   console.log(response)
  //   //   if (response.brand) {
  //   //     for (let i = 0; i < response.brand.length; i++) {
  //   //       if (!ids.includes(response.brand[i].postid)) {
  //   //         setIds(ids => [...ids, response.brand[i].postid])
  //   //         setTimeout(() => setMoreData(response.brand), 1000)
  //   //       }
  //   //     }
  //   //   }
  //   //   if (response.random) {
  //   //     for (let i = 0; i < response.random.length; i++) {
  //   //       if (!ids.includes(response.random[i].postid)) {
  //   //         setIds(ids => [...ids, response.random[i].postid])
  //   //         setTimeout(() => setMoreData(response.random), 1000)
  //   //       }
  //   //     }
  //   //   }
  //   // })
  // }, [page]);

  // useEffect(() => {
  //   // if (moreData.length < 4) {

  //   window.addEventListener("scroll", scrollEvent);
  //   // }
  //   return () => window.removeEventListener("scroll", scrollEvent);
  // }, [page]);
  const HotTag = () => {
    return (
      <div>
        {hotTag.map(tag => (
          <Link key={tag.hashtagid} to={`/list/tag/${tag.hashtagName}/1`}>
            <p className="tag-name">#{tag.hashtagName}</p>
          </Link>
        ))}
      </div>
    );
  }

  const Hotuser = () => {
    return (
      <div className="hotuser-info">
        {hotuser.map(user => (
          <div className="user">
            <div className="user-image">
              <Link key={user.index} to={`/profile/${user.username}`}>
                <img src={user.userimg} alt="..." />
              </Link>
            </div>
            <div className="user-info">
              <Link key={user.index} to={`/profile/${user.username}`}>
                <span className="user-profileName">{user.username}</span>
              </Link>
              <div className="follow">
                <FiUserPlus />
                <span className="user-follow">{user.follow}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const HotBrand = () => {

    return (
      <div>
        {brand.map(name => (
          <Link key={name.brandid} to={`/list/brand/${name.brandName}/1`}>
            <p className="brand-name">{name.brandName}</p>
          </Link>
        ))}
      </div>
    );
  };
  console.log(data)
  if (pathname !== "/" && pathname !== "/men" && pathname !== "/women") {
    return (
      <NotFound></NotFound>
    )
  }
  else {
    const confBrandName= (value)=>{


      if(value&&value.length>0){
        const arr = []
        
        value.map(brand=>brand.imgdata.tagData.map(tag=>arr.push(tag.productInfo.brandName)))
        console.log(arr) 
        
        for(let i =0;i<arr.length;i++){
            let index = []
          for(let j=0;j<arr.length;j++){
            if(arr[i]===arr[j]){
              index.push(arr[i])
            }
            
          }
          if(index.length===6){
            return arr[i]
          }
        }
        
        
        
      }
    }
    return (
      <div className="Main">
        <div className="side-section">
          <div className="sidebar-container">
            <div className="sidebar-contentbox-container second">
              <div className="title-more-section">
                <div className="title">
                  <span className="ranking-user">User</span>
                </div>
                <div className="more-button-section">
                  <Link to={"/ranking/user/all"}>More</Link>
                </div>
              </div>
              {Hotuser()}
            </div>
            <div className="sidebar-contentbox-container third">
              <div className="title-more-section">
                <div className="title">
                  <span className="brand-title">Brand</span>
                </div>
                <div className="more-button-section">
                  <Link to={{ pathname: "/ranking/brand/all" }}>More</Link>
                </div>
              </div>
              <ol>{HotBrand()}</ol>
            </div>
            <div className="sidebar-contentbox-container fourth">
              <div className="title-more-section">
                <div className="title">
                  <span className="brand-title">Tag</span>
                </div>
              </div>
              <ol>
                {HotTag()}
              </ol>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="main-section ">
            {listSection("ranking", data[url].ranking)}
            {listSection("최신글", data[url].new)}
            {listSection(confBrandName(data[url].brand), data[url].brand)}
            {listSection("추천코디", data[url].suggestion)}

          </div>
        </div>
      </div>
    );
  }
}
