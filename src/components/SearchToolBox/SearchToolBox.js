import { faHashtag, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchToolBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchToolBox(props) {
  const loseSearchBar = props.loseSearchBar;
  const results = props.results;
  const setKeyword = props.setKeyword;

  const [active, setActive] = useState(0);

  const clickTab = (index, e) => {
    setKeyword(e.currentTarget.innerText.toLowerCase());
    setActive(index);
  };

  return (
    <div className="SearchToolBox">
      <div className="title-tab">
        <button
          className={active === 0 ? "tabs active-tabs" : "tabs"}
          onClick={e => clickTab(0, e)}
        >
          Tag
        </button>
        <button
          className={active === 1 ? "tabs active-tabs" : "tabs"}
          onClick={e => clickTab(1, e)}
        >
          User
        </button>
        <button
          className={active === 2 ? "tabs active-tabs" : "tabs"}
          onClick={e => clickTab(2, e)}
        >
          Brand
        </button>
      </div>
      <div className="content-tab">
        <div className={active === 0 ? "content active-content" : "content"}>
          <ol>
            {results
              ? results.map((data, index) => (
                  <li
                    key={data.hashtag_id}
                    className={"result result-" + index}
                  >
                      <div className="left">
                          <FontAwesomeIcon icon={faSearch}/>
                      </div>
                    <div className="right">
                        <Link
                          onClick={loseSearchBar}
                          to={"/list/hashtag/" + data.hashtagname + "/1"}
                        >
                          {data.hashtagname}
                        </Link>
                        <span>
                          #
                          {data.hashtagname}
                        </span>
                    </div>
                  </li>
                ))
              : null}
          </ol>
        </div>
        <div className={active === 1 ? "content active-content" : "content"}>
        <ol>
            {results
              ? results.map((data, index) => (
                  <li
                    key={data.userid}
                    className={"result result-" + index}
                  >
                      <div className="left">
                          <FontAwesomeIcon icon={faSearch}/>
                      </div>
                    <div className="right">
                        <Link
                          onClick={loseSearchBar}
                          to={"/list/user/" + data.username + "/1"}
                        >
                          {data.username}
                        </Link>
                        <span>
                          #
                          {data.username}
                        </span>
                    </div>
                  </li>
                ))
              : null}
          </ol>
        </div>
        <div className={active === 2 ? "content active-content" : "content"}>
        <ol>
            {results
              ? results.map((data, index) => (
                  <li
                    key={data.brandid}
                    className={"result result-" + index}
                  >
                      <div className="left">
                          <FontAwesomeIcon icon={faSearch}/>
                      </div>
                    <div className="right">
                        <Link
                          onClick={loseSearchBar}
                          to={"/list/brand/" + data.brandname + "/1"}
                        >
                          {data.brandname}
                        </Link>
                        <span>
                          #
                          {data.brandname}
                        </span>
                    </div>
                  </li>
                ))
              : null}
          </ol>
        </div>
      </div>
    </div>
  );
}
