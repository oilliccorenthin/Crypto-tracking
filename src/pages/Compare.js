import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import SelectCoins from "../components/Compare/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import { coinObject } from "../functions/convertObject";
import { getCoinPrices } from "../functions/getCoinPrices";
import { getCoinData } from "../functions/getCoinData";
import { get100Coins } from "../functions/get100Coins"; 
import { settingChartData } from "../functions/settingChartData"; 
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import LineChart from "../components/Coin/LineChart";
import PriceType from "../components/Coin/PriceType/index.js";
import Footer from "../components/Common/Footer/index.js";
import BackToTop from "../components/Common/BackToTop/index.js";

function ComparePage() {
    const currency = 'usd';
    const interval = 'daily';

    const [isLoading, setIsloading] = useState(true);
    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum");
    const [days, setDays] = useState(30);
    const [crypto1Data, setCrypto1Data] = useState({});
    const [crypto2Data, setCrypto2Data] = useState({});
    const [priceType, setPriceType] = useState('prices');
    const [initialLoad, setInitialLoad] = useState(true);
    const [chartData, setChartData] = useState({})

    function handleDaysChange(event) {
        setDays(event.target.value);
    }

    const handlePriceTagChange = async (event, newType) => {
        if (newType === priceType) return; 

        setIsloading(true);
        setPriceType(newType);
    
    
        // Récupérer les nouvelles données de prix en fonction du nouveau type de prix
        const prices1 = await getCoinPrices(crypto1, currency, days, interval, newType);
        const prices2 = await getCoinPrices(crypto2, currency, days, interval, newType);
    
        if (prices1 && prices2) {
            settingChartData(setChartData, prices1, prices2, crypto1, crypto2);
        } else {
            console.log("No prices data returned for new price type.");
        }
    
        setIsloading(false);
    };
    

    useEffect(() => {
        const fetchInitialData = async () => {
            await get100Coins();
            getData();
        }
        fetchInitialData();
    }, [crypto1, crypto2, days])

    useEffect(() => {
        if (!initialLoad) {
            getData();
        } else {
            setInitialLoad(false);
        }
    }, [crypto1, crypto2, days, priceType]);

    async function getData() {
        setIsloading(true);
        console.log("Fetching data for", crypto1, crypto2);

        const crypto1Data = await fetchWithRetry(() => getCoinData(crypto1));
        const crypto2Data = await fetchWithRetry(() => getCoinData(crypto2));

        if (crypto1Data) coinObject(setCrypto1Data, crypto1Data);
        if (crypto2Data) coinObject(setCrypto2Data, crypto2Data);

        if (crypto1Data && crypto2Data) {
            const prices1 = await getCoinPrices(crypto1, currency, days, interval, priceType);
            const prices2 = await getCoinPrices(crypto2, currency, days, interval, priceType);

            if (prices1 && prices2) {
                console.log("BOTH PRICES FETCHED", crypto1, crypto2);
                settingChartData(setChartData,prices1, prices2, crypto1, crypto2)
            }
        }

        setIsloading(false); // `isLoading` devient `false` après que toutes les données sont traitées
    }

    async function fetchWithRetry(apiCall, retries = 3, delay = 30000) {
        for (let i = 0; i < retries; i++) {
            try {
                return await apiCall();
            } catch (error) {
                if (i < retries - 1) {
                    console.log(`Retrying... Attempt ${i + 2}`);
                    await new Promise(res => setTimeout(res, delay));
                } else {
                    console.error("API call failed after all retries:", error);
                    return null;
                }
            }
        }
    }

    const handleCoinChange = (event, notFirst) => {
        if (!notFirst) {
            setCrypto1(event.target.value);
        } else {
            setCrypto2(event.target.value);
        }
    }

    return (
        <div>
            <Header />
            <BackToTop />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className='grey-wrapper no-hover'>
                        <List coin={crypto1Data} />
                        <List coin={crypto2Data} />
                    </div>
                    <div className='grey-wrapper no-hover'>
                        <div className="coins-days-flex">
                            <SelectCoins 
                                crypto1={crypto1} 
                                crypto2={crypto2} 
                                handleCoinChange={handleCoinChange}
                            />
                            <SelectDays 
                                days={days} 
                                handleDaysChange={handleDaysChange} 
                                Tag={true}
                            />
                        </div>
                    </div>
                    <div className="grey-wrapper">
                        <PriceType priceType={priceType} handlePriceTagChange={handlePriceTagChange}/>
                        <LineChart chartData={chartData} priceType={priceType} multiAxis={true}/>
                    </div>
                    <div className="info-no-data">
                        <p>Si rien ne s'affiche sur le graphique, patientez une minute ; l'API gratuite ne permet que peu de requêtes 😉</p>
                    </div>
                    <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc}/>
                    <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc}/>
                </>
            )}
            <Footer />
        </div>
    );
}

export default ComparePage;
