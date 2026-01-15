import Header from '../Components/Header'
import Sidebar from '../Components/Side-Bar';
import { DrawerProvider } from '../Components/Side-Bar-Context';
import Take_notes from '../Components/Take_notes';

function FunDoo(){
    return(
        <>
        <DrawerProvider>
        <Header/>
        <Take_notes/>
        <Sidebar/>
        </DrawerProvider>
        </>
    );
}

export default FunDoo;