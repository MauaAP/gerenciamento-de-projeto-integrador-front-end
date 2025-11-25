import { useContext, useRef } from "react";
import { ScheduledDisplayContext } from "../contexts/scheduledDisplayContext";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import PricipalScheduled from "./principalScheduled";
import SecondaryScheduled from "./secondaryScheduled";


export default function Scheduled() {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scrollUp = () => {
        if (!scrollRef.current) return;
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ top: -100, behavior: "smooth" });
        }
    };

    const scrollDown = () => {
        if (!scrollRef.current) return;
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ top: 100, behavior: "smooth" });
        }
    };

    const scheduledDisplayContext = useContext(ScheduledDisplayContext)

    return (
        <div className="flex flex-1 justify-center items-center space-x-6">
            <PricipalScheduled presentation={scheduledDisplayContext!.principalPresentation} />
            
            {(scheduledDisplayContext?.carouselPresentations)!.length ? (
                
                <div className="flex flex-col space-y-4 w-100 py-5 items-center justify-center max-h-110">
                    <FaAngleUp className="cursor-pointer text-2xl" onClick={scrollUp} />
                    
                    <div ref={scrollRef} className="w-full space-y-3 text-center overflow-y-hidden">
                        
                        {scheduledDisplayContext?.carouselPresentations.map((presentation) => (
                            <SecondaryScheduled key={presentation.id} presentation={presentation}/>
                        ))}
                    </div>

                    <FaAngleDown className="cursor-pointer text-2xl" onClick={scrollDown} />
                </div>

            ) : (
                null
            )}

            {/* <div className="flex flex-col space-y-4 w-100 py-5 items-center justify-center max-h-110">
                <FaAngleUp className="cursor-pointer text-2xl" onClick={scrollUp} />
                {/* scroll carosel
                <div ref={scrollRef} className="w-full space-y-3 text-center overflow-y-hidden" {...() => {
                    if ((scheduledDisplayContext?.carouselPresentations)!.length > 0) {
                        return { className: "display-none"}
                    }
                }}>
                    {(scheduledDisplayContext?.carouselPresentations)!.length > 0 ? scheduledDisplayContext?.carouselPresentations.map((presentation) => (
                        <SecondaryScheduled key={presentation.id} presentation={presentation}/>
                    )) : null}
                </div>
                <FaAngleDown className="cursor-pointer text-2xl" onClick={scrollDown} />
            </div> */}

        </div>
    )
}