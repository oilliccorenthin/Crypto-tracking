import React, { useState } from "react";
import './styles.css';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import StarIcon from "@mui/icons-material/Star";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";

function Grid({ coin, delay }) {
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));
    const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id)); // State pour savoir si la crypto est ajoutée à la watchlist

    const priceChange = coin.price_change_percentage_24h.toFixed(2);
    const isPricePositive = coin.price_change_percentage_24h > 0; 
    const priceChipClass = isPricePositive ? '' : 'chip-red'; // Classe pour les changements de prix négatifs

    function nameOrSymbol(name, symbol) {
        return name.length > 10 ? symbol : name;
      }

    return (
        <Link to={`/coin/${coin.id}`}>
            <motion.div
                className={`grid ${coin.price_change_percentage_24h < 0 && "grid-red"}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: delay }}
            >
                <div className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`}>
                    <div className="info-flex">
                        <img src={coin.image} alt={coin.name} className="coin-logo" />
                        <div className="name-col">
                            <p className="coin-symbol">{coin.symbol}</p>
                            <p className="coin-name">{nameOrSymbol(coin.name, coin.symbol)}</p>
                        </div>
                        <div
                            className={`watchlist-icon ${coin.price_change_percentage_24h < 0 && "watchlist-icon-red"}`}
                            onClick={(e) => {
                                e.stopPropagation(); // Empêche le clic sur le lien
                                if (isCoinAdded) {
                                    // Enlever la crypto de la watchlist
                                    removeItemToWatchlist(e, coin.id, setIsCoinAdded);
                                } else {
                                    // Ajouter la crypto à la watchlist
                                    setIsCoinAdded(true);
                                    saveItemToWatchlist(e, coin.id);
                                }
                            }}
                        >
                            {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
                        </div>
                    </div>
                    <div className="chip-flex">
                        <div className={`price-chip ${priceChipClass}`}>
                            {priceChange}%
                        </div>
                        {isPricePositive ? (
                            <div className={`icon-chip ${priceChipClass}`}><TrendingUpRoundedIcon /></div>
                        ) : (
                            <div className={`icon-chip ${priceChipClass}`}><TrendingDownRoundedIcon /></div>
                        )}
                    </div>
                    <div className="info-container">
                        <h3 
                            className="coin-price" 
                            style={{
                                color: coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)",
                            }}
                        >
                            ${coin.current_price.toLocaleString('en')}
                        </h3>
                        <p className='last_info'>
                            Total Volume: {coin.total_volume.toLocaleString('en')}
                        </p>
                        <p className='last_info'>
                            Market Cap: ${coin.market_cap.toLocaleString('en')}
                        </p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

export default Grid;
