import React, { useEffect, useState } from "react";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";
import Footer from "../components/Common/Footer";
import BackToTop from "../components/Common/BackToTop";
import { Link } from "react-router-dom";

function Watchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    if (watchlist) {
      getData();
    }
  }, []);

  const getData = async () => {
    const allCoins = await get100Coins();
    if (allCoins) {
      setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <BackToTop />
        <div style={{ flexGrow: 1 }}>
        {watchlist?.length > 0 ? (
          <TabsComponent coins={coins} />
        ) : (
          <div style={ {padding: "9rem"} }>
            <h1 style={{ textAlign: "center"}}>
              Oups ! Vous n'avez aucune crypto dans votre watchlist !
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
              }}
            >
              <a href="/dashboard">
              <Link to={`/dashboard`}>
                        <Button 
                            text={"Tableau de bord"}
                            outlined={false}
                            onClick={()=>console.log('Dashboard redirecting')}  
                        />
              </Link>
              </a>
            </div>
          </div>
        )}
        </div>
      <Footer />
      
    </div>
    
  );
}

export default Watchlist;