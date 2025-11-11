import NavBar from "../../components/navBar";
import Scheduled from "../../components/scheduled";
import { SlideBarContextProvider } from "../../contexts/slideBarContext";
import type { MenuItems } from "../../services/menuItems";

export default function StudentHome({menuItems} : {menuItems: MenuItems[]}){
    return(
        <SlideBarContextProvider>
            <main className="bg-white w-full h-screen">
                <NavBar menuItems={menuItems}/>
                <div className="flex h-screen justify-center items-center">
                    <Scheduled/>
                </div>
            </main>
        </SlideBarContextProvider>
    )
}