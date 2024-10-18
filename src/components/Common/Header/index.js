import React from 'react';
import "./styles.css";
import AnchorTemporaryDrawer from './drawer.js';
import Button from '../Button/index.js';
import { Link } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/index.js';

function Header() {
    return <div className='navbar'>
        
        <Link to='/'>
            <h1 className='logo'>
                SpyCrypto <span style={{ color: "var(--orange)" }}>.</span>
            </h1>
        </Link>
        <div className='links'>
            <ThemeToggle />
            <Link to='/'>
                <p className='link'>Accueil</p>
            </Link>
            <Link to='/compare'>
                <p className='link'>Comparer</p>
            </Link>
            <Link to='/watchlist'>
                <p className='link'>Watchlist</p>
            </Link>
            <Link to='/dashboard'>
                <Button 
                    text={"Tableau De Bord"}
                    outlined={false} 
                    onClick={()=>console.log('Dashboard redirecting')} 
                    
                />
            </Link>
        </div>
        <div className='mobile-drawer'>
            <AnchorTemporaryDrawer/>
        </div>
    </div>
};

export default Header;