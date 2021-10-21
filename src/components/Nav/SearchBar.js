import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from 'react';
import SearchToolBox from "../SearchToolBox/SearchToolBox";
import { getAutoComplete } from "../../util/APIUtils";

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
  const [count, setCount] = useState(0)
  const regexSearchText = /^[가-힣A-Za-z0-9_]{0,30}$/;

  const clearState = () => {
    if (document.querySelector(".SearchToolBox")) {
      document.querySelectorAll(`.result`).forEach(el => {
        el.classList.remove("focus")
      });
      setCount(0)
    }
  }
  const setValue = useCallback(_.debounce((value) => setData(value), 100))
  const onChange = (e) => {
    setInputText(e.currentTarget.value)
    if (regexSearchText.test(e.currentTarget.value)) {
      setValue(e.currentTarget.value)
    }
  }
  const getResult = () => {
    switch(keyword){
      case "tag":getAutoComplete(inputText,keyword).then(response=>setResults(response.hashTagForms));break;
      case "brand":getAutoComplete(inputText,keyword).then(response=>setResults(response.brandForms));break;
      case "user":getAutoComplete(inputText,keyword).then(response=>setResults(response.userForms));break;
      default:break;
    }
  }
  const textChange = (e) => {
    if (e.keyCode === 13) {
      if (document.querySelector(`.result.focus`)) {
        setInputText(document.querySelector(`.result.focus`).innerText)
      }
    }
    if (e.keyCode === 40) {
      if (results) {
        if (count < results.length) {
          document.querySelectorAll(`.result`).forEach(el => {
            el.classList.remove("focus")
          });
          document.querySelector(`.result-${count}`).classList.add("focus")
          setCount(count + 1)
        }
        else {
          document.querySelectorAll(`.result`).forEach(el => {
            el.classList.remove("focus")
          });
          document.querySelector(`.result-0`).classList.add("focus")
          setCount(1)
        }
      }
    }
    if (e.keyCode === 38) {
      if (count > 1) {
        document.querySelectorAll(`.result`).forEach(el => {
          el.classList.remove("focus")
        });
        document.querySelector(`.result-${count - 2}`).classList.add("focus")
        setCount(count => count - 1)
      }
      else {
        document.querySelectorAll(`.result`).forEach(el => {
          el.classList.remove("focus")
        });

        document.querySelector(`.result-${results.length - 1}`).classList.add("focus")
        setCount(results.length)
      }
    }
  }

  useEffect(() => {
    if (inputText && keyword) {
      getResult()
    }
    else {
      setResults(null)
    }
  }, [inputText, keyword])

  useEffect(() => {
    if (document.querySelector(`.result-${count}`)) {
      // document.querySelector(`.result-${count}`).classList.add("focus")
      // if(document.querySelector('.result.focus')){
      //   setInputText(document.querySelector('.result.focus').innerText)
      // }
    }
  }, [count])


  return (
    <div className="SearchBar">
      <div className="search-section">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          onClick={clickSearchBar}
          onChange={onChange}
          onKeyDown={textChange}
          onBlur={clearState}
          placeholder=""
          value={inputText}
        />
      </div>
      <SearchToolBox {...props} setKeyword={setKeyword} results={results} />
    </div>
  );
}
