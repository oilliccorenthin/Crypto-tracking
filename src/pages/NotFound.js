import React from "react";
import Header from "../components/Common/Header";
import Button from "../components/Common/Button";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <>
        <Header />
        <div className="not-found-container">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Oups ! Page non trouvée</h2>
                <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
                <Link to={`/`}>
                        <Button 
                            text={"Retour à la page d'accueil"}
                            outlined={false}
                            onClick={()=>console.log('Home redirecting')}  
                        />
              </Link>
            </div>
        </div>
        </>
    );
}

export default NotFoundPage;
