import axios from "axios";
import { cryptoCache } from "../utils/cryptoCache";

export const getCoinPrices = async (id, currency, days, interval, priceType) => {
    const currentTime = Date.now();

    // Initialiser la structure de cache imbriquée si elle n'existe pas encore
    if (!cryptoCache.data.prices[id]) cryptoCache.data.prices[id] = {};
    if (!cryptoCache.data.prices[id][days]) cryptoCache.data.prices[id][days] = {};
    if (!cryptoCache.lastFetchTime.prices[id]) cryptoCache.lastFetchTime.prices[id] = {};
    if (!cryptoCache.lastFetchTime.prices[id][days]) cryptoCache.lastFetchTime.prices[id][days] = {};

    // Vérifie si les données pour cette combinaison `id`, `days`, `priceType` existent et sont encore valides
    if (
        cryptoCache.data.prices[id][days][priceType] &&
        cryptoCache.lastFetchTime.prices[id][days][priceType] &&
        (currentTime - cryptoCache.lastFetchTime.prices[id][days][priceType] < 60000)
    ) {
        console.log("Using cached prices for", id, "with days:", days, "and priceType:", priceType);
        return cryptoCache.data.prices[id][days][priceType]; // Retourne les données du cache
    }

    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
            { params: { vs_currency: currency, days: days, interval: interval } }
        );

        const prices = response.data[priceType];

        // Cache la réponse par `id`, `days`, et `priceType`
        if (!cryptoCache.data.prices[id][days]) cryptoCache.data.prices[id][days] = {};
        cryptoCache.data.prices[id][days][priceType] = prices;
        if (!cryptoCache.lastFetchTime.prices[id][days]) cryptoCache.lastFetchTime.prices[id][days] = {};
        cryptoCache.lastFetchTime.prices[id][days][priceType] = Date.now();

        return prices;
    } catch (error) {
        console.log("ERROR>>>", error);
        return [];
    }
};
