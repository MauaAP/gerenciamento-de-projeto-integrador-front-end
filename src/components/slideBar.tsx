import { useContext } from "react"
import { SlideBarContext } from "../contexts/slideBarContext"



export function SlideBar(){
    const slideBarContext = useContext(SlideBarContext)
    
    const toggleMenu= () => {
        slideBarContext?.setIsOpen(!(slideBarContext.isOpen));
    }
    return(
        <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                slideBarContext?.isOpen? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleMenu}
        />
    )
}