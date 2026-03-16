import React, { useEffect, useState } from 'react';

import Header from '../Components/Header'
import Sidebar from '../Components/Side-Bar';
import { DrawerProvider } from '../Components/Side-Bar-Context';

import { Outlet } from 'react-router-dom';


export const SearchContext = React.createContext();

function FunDoo(){

    const [searchText, setSearchText] = useState("");

    useEffect(()=>{

        const handleSearch = (event)=>{
            setSearchText(event.detail);
        };

        window.addEventListener("noteSearch",handleSearch);

        return ()=>{
            window.removeEventListener("noteSearch",handleSearch);
        }

    },[])

    return(
        <>
        <DrawerProvider>

        <SearchContext.Provider value={searchText}>

        <Header/>
        <Sidebar/>

        <Outlet/>

        </SearchContext.Provider>

        </DrawerProvider>
        </>
    );
}

export default FunDoo;

