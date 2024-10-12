import React from 'react';
import "./styles.css";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function Search({ search, onSearchChange }) {

    return(
        <div className='search-flex'>
            <SearchRoundedIcon  />
            <input 
                placeholder='Recherchez votre crypto...' 
                type='text' value={search} 
                onChange={(e) => onSearchChange(e)}/>
        </div>
    )
}

export default Search;