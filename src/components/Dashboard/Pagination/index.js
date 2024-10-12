import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import  './styles.css'

export default function PaginationControlled({ page, handlePageChange }) {

  return (
    <div  className="pagination-component">
      <Pagination 
        count={10} 
        page={page} 
        onChange={(event, value) => handlePageChange(event, value)}
        sx={{
            color: "var(--white)",
            "& .Mui-selected": {
                backgroundColor: "var(--orange) !important",
                color: "#fff !important",
                borderColor: "var(--orange) !important",
            },
            "& .MuiPaginationItem-ellipsis":{
                border: "0px solid var(--grey) !important",
            },
            "& .MuiPaginationItem-text": {
                color: "var(--white)",
                border: "1px solid var(--grey)"
            }
        }}
        />
    </div>
  );
}