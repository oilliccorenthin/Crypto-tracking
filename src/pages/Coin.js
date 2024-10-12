import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from '../components/Common/Loader';
import { coinObject } from '../functions/convertObject';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo/index.js';
import { getCoinData } from '../functions/getCoinData.js';
import { getCoinPrices } from '../functions/getCoinPrices.js';
import LineChart from "../components/Coin/LineChart/index.js";
import SelectDays from "../components/Coin/SelectDays/index.js";
import { settingChartData } from "../functions/settingChartData.js";
import PriceType from "../components/Coin/PriceType/index.js";
import BackToTop from "../components/Common/BackToTop/index.js";
import Footer from '../components/Common/Footer';

function CoinPage() {
    const { id } = useParams()
    const currency = 'usd'
    const interval = 'daily'
    const [isLoading, setIsloading] = useState(true)
    const [coinData, setCoinData] = useState()
    const [days, setDays] = useState(120)
    const [chartData, setChartData] = useState({})
    const [priceType, setPriceType] = useState('prices')

    // Log when the component mounts and updates with new id
    useEffect(() => {
        if (id) {
            getData()
        }
    }, [id]);

    // Main data fetching function
    async function getData() {
        
        const data = await getCoinData(id);

        if (data) {
            coinObject(setCoinData, data)

            const prices = await getCoinPrices(id, currency, days, interval, priceType)

            if (prices.length > 0) {
                settingChartData(setChartData, prices)
                setIsloading(false);
            } else {
                console.log("No prices data returned.")
            }
        }
    }

    // Handle days selection change
    const handleDaysChange = async (event) => {
        setIsloading(true)
        setDays(event.target.value)

        const prices = await getCoinPrices(id, currency, event.target.value, interval, priceType);

        if (prices.length > 0) {
            settingChartData(setChartData, prices)
            setIsloading(false)
        } else {
            console.log("No prices data returned for new days.");
        }
    }

    // Handle price type change (prices, market cap, volume, etc.)
    const handlePriceTagChange = async (event, newType) => {
        setIsloading(true)
        setPriceType(newType)

        const prices = await getCoinPrices(id, currency, days, interval, newType);

        if (prices.length > 0) {
            settingChartData(setChartData, prices);
            setIsloading(false)
        } else {
            console.log("No prices data returned for new price type.")
        }
    };

    return (
        <div>
            <Header />
            <BackToTop />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className='grey-wrapper no-hover'>
                        <List coin={coinData} />
                    </div>
                    <div className="grey-wrapper">
                        <SelectDays days={days} handleDaysChange={handleDaysChange} />
                        <PriceType priceType={priceType} handlePriceTagChange={handlePriceTagChange} />
                        <LineChart chartData={chartData} priceType={priceType} />
                    </div>
                    <div className="info-no-data">
                        <p>Si rien ne s'affiche sur le graphique, patientez une minute ; l'API gratuite ne permet que peu de requêtes 😉</p>
                    </div>
                    <CoinInfo heading={coinData?.name} desc={coinData?.desc} />
                </>
            )}
            <Footer />
        </div>
    );
}

export default CoinPage;
