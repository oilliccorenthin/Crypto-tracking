import React, { useEffect } from "react";
import './styles.css';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

function BackToTop() {
    useEffect(() => {
        const mybutton = document.getElementById("myBtn");

        const scrollFunction = () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                mybutton.classList.add("visible"); 
            } else {
                mybutton.classList.remove("visible");
            }
        };

        window.addEventListener("scroll", scrollFunction);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", scrollFunction);
        };
    }, []);

    
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    }

    return (
        <div className="back-to-top-btn" id="myBtn" onClick={topFunction}>
            <ArrowUpwardRoundedIcon style={{ color: 'var(--blue)' }} />
        </div>
    )
}

export default BackToTop;
