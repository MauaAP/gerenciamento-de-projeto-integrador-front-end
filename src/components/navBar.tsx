import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { SlideBarContext } from "../contexts/slideBarContext";
import { SlideBar } from "./slideBar";

export default function NavBar() {
    const slideBarContext = useContext(SlideBarContext)


    const toggleMenu = () => {
        slideBarContext?.setIsOpen(!(slideBarContext.isOpen));
        console.log(slideBarContext?.isOpen)
    }

    return (
        <nav className="flex justify-between items-center text-white bg-blue-900/60 w-full py-4 px-6">
            <div className="flex items-center gap-x-3">
                <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center">
                    <FaUserCircle className="text-2xl" />
                </div>
                <div>
                    <h1 className="font-semibold text-lg">Professor(a)</h1>
                    <p className="text-sm opacity-90">Bossini</p>
                </div>
            </div>
            <button
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
                onClick={toggleMenu}
            >
                <IoMenu className="text-2xl" />
            </button>
            <SlideBar></SlideBar>
        </nav>
    )
}