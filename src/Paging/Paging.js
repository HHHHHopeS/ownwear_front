import React, { useState } from "react"; 
import './Paging.scss'; 
import Pagination from "react-js-pagination"; 


  const Paging = (props) => {
     const pageno = props.pageno
     const totalcount = props.totalcount
   const [page, setPage] = useState(1); 
  const handlePageChange = (page) => 
  { setPage(page);
    
  }; 
 
  return  ( <Pagination
     activePage={page}
      itemsCountPerPage={12} 
     totalItemsCount={50000} 
     pageRangeDisplayed={5} 
     prevPageText={"‹"} 
     nextPageText={"›"} 
     onChange={handlePageChange}
      /> 
      );
     }; 

     export default Paging;