import axios from "axios";
import { cryptoCache } from "../utils/cryptoCache";

export const get100Coins = async () => {
    const cacheKey = "100coins";
    const cacheExpiry = 60 * 1000; // Durée de vie du cache en millisecondes (ici 60 secondes)

    // Vérifier si les données sont dans le cache et toujours valides
    if (cryptoCache[cacheKey] && Date.now() - cryptoCache[cacheKey].timestamp < cacheExpiry) {
        console.log("Using cached data for 100 coins");
        return cryptoCache[cacheKey].data;
    }
    
    // Sinon, faire la requête API
    const apiKey = process.env.REACT_APP_CG_API_KEY;
    const currency = 'usd';
    const order = 'market_cap_desc';
    const nb = '100';
    const sparkline = 'false';

    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=${apiKey}&vs_currency=${currency}&order=${order}&per_page=${nb}&sparkline=${sparkline}`
        );
        console.log("get100Coins.js did 1 request with API Key");
        
        // Stocker les données et l'heure dans le cache
        cryptoCache[cacheKey] = {
            data: response.data,
            timestamp: Date.now()
        };
        
        return response.data;
    } catch (error) {
        console.log("ERROR>>>", error);
    }
};
