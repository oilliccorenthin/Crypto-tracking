import React from 'react';
import "./styles.css";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SelectDays({days, handleDaysChange, Tag}) {
  

  return (
    <div className='select-days'>
        {!Tag && <p>Price Change In</p>}
        <Select
            sx={{
                height:"2.5rem",
                color:"var(--white) !important",
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--white)",
                },
                "& .MuiSvgIcon-root": {
                    color: "var(--white)",
                },
                "&:hover": {
                    "&& fieldset": {
                        borderColor: "var(--blue)",
                    },
                },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={days}
            label="Days"
            onChange={handleDaysChange}
        >
          <MenuItem value={7}>7 Jours</MenuItem>
          <MenuItem value={30}>30 Jours</MenuItem>
          <MenuItem value={60}>60 Jours</MenuItem>
          <MenuItem value={90}>90 Jours</MenuItem>
          <MenuItem value={120}>120 Jours</MenuItem>
          <MenuItem value={365}>365 Jours</MenuItem>
        </Select>
    </div>
  );
}
