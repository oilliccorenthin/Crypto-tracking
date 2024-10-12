// src/utils/cache.js
export const cryptoCache = {
    data: {
        coins: {},
        prices: {}, // Cache for prices
        coinData: {} // Cache for datas
    },
    lastFetchTime: {
        coins: null,
        prices: {}, // Timestamp 
        coinData: {} // Timestamp
    },
};
