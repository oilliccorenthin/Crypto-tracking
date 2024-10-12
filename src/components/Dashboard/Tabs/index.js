import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '../Grid';
import './styles.css';
import List from '../List';

function TabsComponent({ coins }) {
  const [value, setValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const style = {
    color: 'var(--white)',
    width: '50vw',
    fontSize: '1.2rem',
    fontWeight: 600,
    fontFamily: 'Inter',
    textTransform: 'capitallize',
  }

  const theme = createTheme({
    palette: {
        primary: {
            main: '#3a80e9',
        }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
          <TabList onChange={handleChange} variant='fullWidth'>
            <Tab label="Grille" value="grid" sx={style} />
            <Tab label="Liste" value="list" sx={style}/>
          </TabList>
        <TabPanel value="grid">
            <div className='grid-flex'>
                {coins.map((coin,i) =>  {
                    return (
                        <Grid coin={coin} delay={(i % 5) * 0.2} key={i}/>
                    )
                })}
            </div>
        </TabPanel>
        <TabPanel value="list">
            <table className="list-table">
                {coins.map((item, i) => {
                  return <List coin={item} delay={(i % 10) * 0.15} key={i}/>
                })}
            </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}

export default TabsComponent;