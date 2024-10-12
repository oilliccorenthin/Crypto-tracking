import React from 'react';
import "./styles.css";
import AnchorTemporaryDrawer from './drawer.js';
import Button from '../Button/index.js';
import { Link } from 'react-router-dom';

function Header() {
    return <div className='navbar'>
        
        <Link to='/'>
            <h1 className='logo'>
                SpyCrypto <span style={{ color: "var(--orange)" }}>.</span>
            </h1>
        </Link>
        <div className='links'>
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
                    text={"Tableau de bord"}
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