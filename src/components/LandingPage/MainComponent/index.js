import React from 'react';
import "./styles.css";
import Button from "../../Common/Button";
import iphone from "../../../assets/iphone.png";
import gradient from "../../../assets/gradient.png";

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function MainComponent() {
    return  (
        <div className='flex-info'>
            <div className='left-component'>
                <motion.h1 
                    className='track-crypto-heading' 
                    initial={{ opacity: 0, scaleY: 0 }} 
                    animate={{ opacity: 1, scaleY: 1 }} 
                    transition={{ duration: 1 }}
                >
                    <span>S</span>
                    <span>p</span>
                    <span>y</span>
                    <span>C</span>
                    <span>r</span>
                    <span>y</span>
                    <span>p</span>
                    <span>t</span>
                    <span>o</span>
                </motion.h1>
                <motion.h1 
                    className='real-time-heading'
                    initial={{ opacity: 0, x: 50 }} 
                    animate={{ opacity: 1, x:0 }} 
                    transition={{ duration: 3, delay: 2 }}

                >
                    En temps réel.
                </motion.h1>
                <motion.p 
                    className='info-text'
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 1, delay: 1 }}
                >
                    Suivez les crypto-monnaies en temps réel via une API publique. Visitez le tableau de bord pour le faire !
                </motion.p>
                <motion.div 
                    className='btn-flex'
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 1, delay: 1 }}
                >
                    <Link to={`/dashboard`}>
                        <Button 
                            text={"Tableau De Bord"}
                            outlined={false}
                            onClick={()=>console.log('Dashboard redirecting')}  
                        />
                    </Link>
                    <Button text={"Partager"} outlined={true} />
                </motion.div>
            </div>
            <div className='phone-container'>
                <motion.img 
                    src={iphone}
                    alt='iphone-mobile' 
                    className='iphone'
                    initial={{ y: -10 }}
                    animate={{ y: 10 }}
                    transition={{
                        type:  "smooth",
                        repeatType: "mirror",
                        duration: 2,
                        repeat: Infinity
                    }}
                />
                <img src={gradient} alt="background-phone" className='gradient'/>
            </div>
        </div>
    );
}


export default MainComponent;