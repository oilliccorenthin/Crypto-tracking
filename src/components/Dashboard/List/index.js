import React, { useEffect, useState } from "react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { Tooltip } from "@mui/material";
import { convertNumber } from "../../../functions/convertNumber";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./styles.css";

function List({ coin, delay }) {
  // Gestion de la watchlist et vérification de l’ajout dans le localStorage
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist.includes(coin.id));

  // Animation du changement de prix en fonction de l’évolution
  const priceChange = coin.price_change_percentage_24h.toFixed(2);
  const isPricePositive = coin.price_change_percentage_24h >= 0;

  useEffect(() => {
    // Suppression des colonnes non nécessaires sur écran petit
    if (window.innerWidth < 850) {
      document.querySelectorAll(".td-total-volume").forEach(cell => cell.remove());
    }
  }, []);

  // Gestion de l'ajout ou de la suppression de la watchlist
  const handleWatchlistToggle = (e) => {
    e.preventDefault(); // Empêche le lien d'être suivi
    if (isCoinAdded) {
      removeItemToWatchlist(e, coin.id, setIsCoinAdded);
    } else {
      saveItemToWatchlist(e, coin.id);
      setIsCoinAdded(true);
    }
  };

  return (
    <Link to={`/coin/${coin.id}`}>
      <motion.tr
        className={`list-row ${!isPricePositive && "list-container-red"}`}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        <Tooltip title="Coin Logo" placement="bottom-start">
          <td className="td-image">
            <img src={coin.image} alt={coin.name} className="coin-logo" />
          </td>
        </Tooltip>

        <Tooltip title="Coin Info" placement="bottom-start">
          <td>
            <div className="name-col">
              <p className="coin-symbol">{coin.symbol}</p>
              <p className="coin-name">{coin.name}</p>
            </div>
          </td>
        </Tooltip>

        <Tooltip title="Price Change (24h)" placement="bottom-start">
          <td className="chip-flex">
            <div className={`price-chip ${isPricePositive ? '' : 'chip-red'}`}>
              {priceChange}%
            </div>
            <div className={`icon-chip td-icon ${isPricePositive ? '' : 'chip-red'}`}>
              {isPricePositive ? <TrendingUpRoundedIcon /> : <TrendingDownRoundedIcon />}
            </div>
          </td>
        </Tooltip>

        <Tooltip title="Current Price" placement="bottom">
          <td>
            <h3 className={`coin-price td-center-align ${isPricePositive ? '' : 'text-red'}`}>
              ${coin.current_price.toLocaleString("en")}
            </h3>
          </td>
        </Tooltip>

        <Tooltip title="Total Volume" placement="bottom">
          <td className="td-total-volume td-center-align">
            {coin.total_volume.toLocaleString("en")}
          </td>
        </Tooltip>

        <Tooltip title="Market Cap" placement="bottom">
          <td className="desktop-td-mkt td-center-align">
            ${coin.market_cap.toLocaleString("en")}
          </td>
        </Tooltip>
        
        <Tooltip title="Market Cap" placement="bottom">
          <td className="mobile-td-mkt td-center-align">
            ${convertNumber(coin.market_cap)}
          </td>
        </Tooltip>

        <Tooltip title="Favorite" placement="bottom">
        <td className="watchlist-icon" onClick={handleWatchlistToggle}>
          {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
        </td>
        </Tooltip>
        
      </motion.tr>
    </Link>
  );
}

export default List;
