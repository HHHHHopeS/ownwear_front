import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchToolBox from "../SearchToolBox/SearchToolBox";
export default function SearchBar() {
  function clickSearchBar() {
    document.querySelector(".blur-section").setAttribute("style","display:block")
    document.querySelector(".blur-section").classList.remove("noblur")
    document.querySelector(".blur-section").classList.add("blur")
    document.querySelector(".SearchToolBox").classList.add("active")
    document.querySelector(".SearchBar").classList.add("active")
  }
  
  return (
    <div className="SearchBar">
      <div className="search-section">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" onClick={clickSearchBar} />
      </div>
      <SearchToolBox />
    </div>
  );
}
