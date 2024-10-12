import React, { useEffect, useState } from 'react';
import "./styles.css";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { get100Coins } from '../../../functions/get100Coins';

export default function SelectCoins({ crypto1, crypto2, handleCoinChange }) {
    const [allCoins, setAllCoins] = useState([]);
    
    const style = {
        height: "2.5rem",
        color: "var(--whith)",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)",
        },
        "& .MuiSvgIcon-root": {
            color: "var(--white)",
        },
        "&:hover": {
            "&& fieldset": {
                borderColor: "var(--orange)",
            },
        },
    };

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const myCoins = await get100Coins();
        setAllCoins(myCoins);
    }

    // Vérifie si les valeurs sont disponibles dans allCoins
    const isCrypto1Valid = allCoins.some(coin => coin.id === crypto1);
    const isCrypto2Valid = allCoins.some(coin => coin.id === crypto2);

    return (
        <div className='coins-flex'>
            <p>Crypto 1</p>
            <Select
                sx={style}
                value={isCrypto1Valid ? crypto1 : ''}  // Utilise une chaîne vide si la valeur n'est pas valide
                label="Crypto 1"
                onChange={(event) => handleCoinChange(event, false)}
            >
                {allCoins
                    .filter((item)  => item.id !== crypto2)
                    .map((coin, i) => (
                        <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
                ))}
            </Select>
            <p>Crypto 2</p>
            <Select
                sx={style}
                value={isCrypto2Valid ? crypto2 : ''}  // Utilise une chaîne vide si la valeur n'est pas valide
                label="Crypto 2"
                onChange={(event) => handleCoinChange(event, true)}
            >
                {allCoins
                    .filter((item)  => item.id !== crypto1)
                    .map((coin, i) => (
                        <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
                ))}
            </Select>
        </div>
    );
}
