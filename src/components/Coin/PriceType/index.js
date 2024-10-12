import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import  "./styles.css";

export default function TogglePriceType({priceType, handlePriceTagChange}) {

  const handleToggleChange = (event, newType) => {
    if (newType !== null && newType !== priceType) {
      handlePriceTagChange(event, newType);
    }
  };

  return (
    <div className='toggle-prices'>
        <ToggleButtonGroup
            value={priceType}
            exclusive
            onChange={handleToggleChange} 
            sx={{
                height:"2.5rem",
                borderColor: "var(--blue)",
                border: "unset !important",
                "& .Mui-selected": {
                    color:"var(--blue) !important",
                },
                "& .MuiToggleButtonGroup-grouped": {
                    color: "var(--blue)",
                    border: "1px solid",
                    borderColor: "unset",
                },
                "& .MuiToggleButton-standard": {
                    color: "var(--blue)",
                },
            }}
        >
        <ToggleButton value="prices" className='toggle-btn'>
            <p>Price</p>
        </ToggleButton>
        <ToggleButton value="market_caps" className='toggle-btn'>
            <p>Market Cap</p>
        </ToggleButton>
        <ToggleButton value="total_volumes" className='toggle-btn'>
            <p>Total Volume</p>
        </ToggleButton>
        </ToggleButtonGroup>
    </div>
  );
}
