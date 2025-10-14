import NavBar from "../../components/navBar";
import Scheduled from "../../components/scheduled";
import { SlideBarContextProvider } from "../../contexts/slideBarContext";

export default function ProfessorHome(){
    return(
        <SlideBarContextProvider>
            <main className="bg-white w-full h-screen">
                <NavBar/>
                <div className="flex h-screen justify-center items-center">
                    <Scheduled/>
                </div>
            </main>
        </SlideBarContextProvider>
    )
}