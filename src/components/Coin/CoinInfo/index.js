import React, { useState } from "react";
import "./styles.css";

function CoinInfo({heading, desc}) {

    const maxShort = 140 //maximum characters visible in basic view
    const shortDesc = desc.slice(0, maxShort) + "... <p style='color:var(--grey)'> Read More...</p>"
    const longDesc  = desc + "<p style='color:var(--grey)'> Read Less...</p>"
    const [flag, setFlag] = useState(false)
    const descriptionText = desc && desc.trim() !== "" 
    ? desc 
    : "No description available";

    return (
        <div className="grey-wrapper">
            <h2 className="coin-info-heading">{heading}</h2>
            {desc.length>maxShort ? (
                <p 
                    onClick={()=>setFlag(!flag)}
                    className="coin-info-desc"
                    dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longDesc }}
                />
                ) : (
                    desc.length> 0 ? (
                    <p 
                        dangerouslySetInnerHTML={{ __html: longDesc  }}
                    />  
                    ) : (
                        <p style={{padding: "1.5rem"}}>{descriptionText}</p>

                ) 
            )}
        </div>
    )
}

export default CoinInfo;