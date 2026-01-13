import Header from '../Components/Header'
import Sidebar from '../Components/Side-Bar';
import { DrawerProvider } from '../Components/Side-Bar-Context';

function FunDoo(){
    return(
        <>
        <DrawerProvider>
        <Header/>
        <Sidebar/>
        </DrawerProvider>
        </>
    );
}

export default FunDoo;