import React from "react";
import Pagination from "react-js-pagination";
import './Paging.scss';


  const Paging = (props) => {
     const setPage = props.setPage
     const totalcount = props.totalcount
    const page = props.page
  const handlePageChange = (page) => 
  { setPage(page);
    
  }; 
 
  return  ( <Pagination
     activePage={page}
    itemsCountPerPage={12} 
     totalItemsCount={totalcount} 
     pageRangeDisplayed={5} 
     prevPageText={"‹"} 
     nextPageText={"›"} 
     onChange={handlePageChange}
      /> 
      );
     }; 

     export default Paging;