import { convertDate } from "./convertDate";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getColor = () => {
    return getComputedStyle(document.documentElement).getPropertyValue('--orange').trim();
  };

export const settingChartData  = (setChartData, prices1, prices2, cryptoName1, cryptoName2) => {
    if(prices2) {
        setChartData({
            labels: prices1.map((price) => convertDate(price[0])),
            datasets: [
                {
                    label: capitalizeFirstLetter(cryptoName1),
                    data: prices1.map((price) => price[1]),
                    borderColor: getColor(),
                    borderWidth: 2,
                    fill: false,
                    tension: 0.25,
                    pointRadius: 0,
                    yAxisID:'crypto1'
                },
                {
                    label: capitalizeFirstLetter(cryptoName2),
                    data: prices2.map((price) => price[1]),
                    borderColor: "#61c96f",
                    borderWidth: 2,
                    fill: false,
                    tension: 0.25,
                    pointRadius: 0,
                    yAxisID:'crypto2'
                },
            ],
        })
    } else {
        setChartData({
            labels: prices1.map((price) => convertDate(price[0])),
            datasets: [
                {
                    data: prices1.map((price) => price[1]),
                    borderColor: getColor(),
                    borderWidth: 2,
                    fill: true,
                    tension: 0.25,
                    backgroundColor: "rgba(255, 111, 32,0.1)",
                    pointRadius: 0,
                    yAxisID:'crypto1'
                },
            ],
        })
    }
    return
}