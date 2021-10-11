import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchToolBox from "../SearchToolBox/SearchToolBox";
import { useCallback, useEffect, useRef, useState } from "react"
import { getAutoComplete } from "../../util/APIUtils";
import React from 'react'
import _ from "lodash"

export default function SearchBar(props) {
  function clickSearchBar() {
    document.querySelector(".blur-section").setAttribute("style", "display:block")
    document.querySelector(".blur-section").classList.remove("noblur")
    document.querySelector(".blur-section").classList.add("blur")
    document.querySelector(".SearchToolBox").classList.add("active")
    document.querySelector(".SearchBar").classList.add("active")
    setKeyword("tag")
  }
  const keyword = props.keyword
  const setKeyword = props.setKeyword
  const [inputText, setInputText] = useState("")
  const [data, setData] = useState("")
  const [results, setResults] = useState(null)

  const regexSearchText = /^[가-힣A-Za-z0-9_]{0,30}$/;

  const setValue = useCallback(_.debounce((value) => setData(value), 100))

  const onChange = (e) => {
    setInputText(e.currentTarget.value)
    if (regexSearchText.test(e.currentTarget.value)) {
      setValue(e.currentTarget.value)
    }
  }

  const getResult = () => {
    // getAutoComplete(inputText, keyword).then(response => setResults(JSON.stringify(response)))
    setResults(
      [{ brandname: "nike" },
      { brandname: "nike1" },
      { brandname: "nike2" }]
    )
  }

  useEffect(() => {
    if (inputText && keyword) {
      getResult()
    }
  }, [inputText, keyword])
  const textChange=(e)=>{
    if(e.keyCode ===40){
      console.log("아래키")
      console.log(document.querySelector("a").innerHTML)
    }
    if(e.keyCode ===38){
      console.log("위키")
    }
  }



  return (
    <div className="SearchBar">
      <div className="search-section">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          onClick={clickSearchBar}
          onChange={onChange}
          placeholder=""
          value={inputText}
          onKeyDown={textChange}
        />
      </div>
      <SearchToolBox setKeyword={setKeyword} results={results} />
    </div>
  );
}
