import { useContext } from "react";
import type { PresentationInterface } from "../services/interface/PresentationInterface";
import { formatTimestamp } from "./functions/formatTimestamp";
import { ScheduledDisplayContext } from "../contexts/scheduledDisplayContext";

export default function SecondaryScheduled({presentation}: {presentation: PresentationInterface}){
    const scheduledDisplayContext = useContext(ScheduledDisplayContext);

    const formattedTimestamp= formatTimestamp(presentation.date);

    const handleSelectedPresentation = (clickedId: string) => {
        // takes the selected presentation by the clickedId
        const selectedPresentation= scheduledDisplayContext!.presentations.find(p => p.id === clickedId);

        scheduledDisplayContext!.setPrincipalPresentation(selectedPresentation!);

        const newCarouselPresentations= scheduledDisplayContext!.presentations.filter(p => p.id !== clickedId);

        scheduledDisplayContext!.setCarouselPresentations(newCarouselPresentations);
    }

    return (
        <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-gray-100 h-25 justify-center flex items-center cursor-pointer" onClick= {()=> handleSelectedPresentation(presentation.id)} >
            <div >
                <h2>{presentation.group.project.title}</h2>
                <h3>{formattedTimestamp[0]}</h3>
                <h1 className="text-2xl font-bold">{formattedTimestamp[1]}</h1>
            </div>
        </div>
    )
}