import axios from "axios";
import { cryptoCache } from "../utils/cryptoCache";

export const getCoinData = async (id) => {
    const currentTime = Date.now();

    // Vérifie si les données sont dans le cache et si moins de 60 secondes se sont écoulées
    if (cryptoCache.data.coinData[id] && cryptoCache.lastFetchTime.coinData[id] && 
        (currentTime - cryptoCache.lastFetchTime.coinData[id] < 60000)) {
        console.log("Using cached data for", id);
        return cryptoCache.data.coinData[id]; // Retourne les données du cache
    }

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        console.log("getCoinData.js did 1 request");

        // Utilisation de setTimeout pour ajouter un délai de 200 ms
        const coinData = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(response.data);
            }, 200); // 200 ms de délai
        });

        // Met à jour le cache avec les nouvelles données et le timestamp
        cryptoCache.data.coinData[id] = coinData;
        cryptoCache.lastFetchTime.coinData[id] = Date.now(); // Enregistre le temps de fetch
        return coinData;
    } catch (error) {
        console.log("ERROR>>>", error);
        return null; // Retourne null en cas d'erreur
    }
};
