import Header from '../Components/Header'
import Sidebar from '../Components/Side-Bar';
import { DrawerProvider } from '../Components/Side-Bar-Context';
import Take_notes from '../Components/Take_notes';
import { Outlet } from 'react-router-dom';

function FunDoo(){
    return(
        <>
        <DrawerProvider>
        <Header/>
        <Sidebar/>
        <Outlet/>
        </DrawerProvider>
        
        </>
    );
}

export default FunDoo;