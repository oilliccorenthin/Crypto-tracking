import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import TabsComponent from '../components/Dashboard/Tabs';
import Search from '../components/Dashboard/Search';
import Pagination from '../components/Dashboard/Pagination';
import BackToTop from '../components/Common/BackToTop';
import { get100Coins } from '../functions/get100Coins';
import Footer from '../components/Common/Footer';

function DashboardPage() {
    
    const [coins,setCoins] =  useState([])
    const [paginatedCoins,setPaginatedCoins] =  useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] =  useState(1)
    const [isLoading, setIsloading] = useState(true)
    
    const handlePageChange = (event, value) => {
        setPage(value)
        var previousIndex = (value - 1) * 10
        setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10))
    } 
    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    var filteredCoins = coins.filter((item) => 
        item.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLocaleLowerCase())
    )
    

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        const myCoins = await get100Coins()
        if (myCoins) {
            setCoins(myCoins)
            setPaginatedCoins(myCoins.slice(0, 10))
            setIsloading(false)
        }
        
    }
    

    return (
        <>
            <Header />
            <BackToTop />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Search search={search} onSearchChange={onSearchChange} />
                    <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
                    {!search && (
                        <Pagination page={page} handlePageChange={handlePageChange} />
                    )}
                </>
            )}
            <Footer />
        </>
    );
    
}

export default DashboardPage;