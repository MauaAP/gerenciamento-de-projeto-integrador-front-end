// import { useRef } from "react";
import NavBar from "../../components/navBar";
import Scheduled from "../../components/scheduled";
import { SlideBarContextProvider } from "../../contexts/slideBarContext";
import type { MenuItems } from "../../services/menuItems";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

// const scrollRef = useRef(null);

// const scrollUp = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ top: -100, behavior: "smooth" });
//     }
//   };

//   const scrollDown = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ top: 100, behavior: "smooth" });
//     }
//   };

export default function ProfessorHome({menuItems} : {menuItems: MenuItems[]}){
    return(
        <SlideBarContextProvider>
            <main className="bg-white w-full h-screen">
                <NavBar menuItems={menuItems}/>
                <div className="flex h-screen justify-center items-center space-x-6">
                    <Scheduled/>
                    <div className="flex flex-col space-y-4 w-100 py-5 items-center justify-center max-h-108">
                        <FaAngleUp className="cursor-pointer text-2xl"/>
                        {/* scroll carosel */}
                        <div className="w-full space-y-3 text-center overflow-y-hidden max-h-130">
                            <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-gray-100 h-25 justify-center flex items-center">
                                <div >
                                    <h2>Desenvolvendo jogo Poliedro</h2>
                                    <h3>Sexta-feira, Nov 10</h3>
                                    <h1 className="text-2xl font-bold">10:30 - 11:00</h1>
                                </div>
                            </div>
                            <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-gray-100 h-25 justify-center flex items-center">
                                <div >
                                    <h2>Desenvolvendo jogo Poliedro</h2>
                                    <h3>Sexta-feira, Nov 10</h3>
                                    <h1 className="text-2xl font-bold">11:00 - 11:30</h1>
                                </div>
                            </div>
                            <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-gray-100 h-25 justify-center flex items-center">
                                <div >
                                    <h2>Desenvolvendo jogo Poliedro</h2>
                                    <h3>Sexta-feira, Nov 10</h3>
                                    <h1 className="text-2xl font-bold">11:30 - 12:00</h1>
                                </div>
                            </div>
                            <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-gray-100 h-25 justify-center flex items-center">
                                <div >
                                    <h2>Desenvolvendo jogo Poliedro</h2>
                                    <h3>Sexta-feira, Nov 10</h3>
                                    <h1 className="text-2xl font-bold">11:30 - 12:00</h1>
                                </div>
                            </div>
                            <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-gray-100 h-25 justify-center flex items-center">
                                <div >
                                    <h2>Desenvolvendo jogo Poliedro</h2>
                                    <h3>Sexta-feira, Nov 10</h3>
                                    <h1 className="text-2xl font-bold">11:30 - 12:00</h1>
                                </div>
                            </div>
                        </div>
                        <FaAngleDown className="cursor-pointer text-2xl"/>
                    </div>
                </div>
            </main>
        </SlideBarContextProvider>
    )
}