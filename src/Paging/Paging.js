import React, { useState } from "react"; 
import './Paging.scss'; 
import Pagination from "react-js-pagination"; 


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