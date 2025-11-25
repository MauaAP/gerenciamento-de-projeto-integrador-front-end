import { useContext } from "react";
import type { PresentationInterface } from "../services/interface/PresentationInterface";
import { formatTimestamp } from "./functions/formatTimestamp";
import { ScheduledDisplayContext } from "../contexts/scheduledDisplayContext";
import { FaCalendarAlt, FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";

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
        <div 
            className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl border-2 border-gray-200 hover:border-blue-900/60 cursor-pointer group overflow-hidden"
            onClick={() => handleSelectedPresentation(presentation.id)}
        >
            <div className="p-4 flex flex-col gap-2 relative">
                {/* Indicador de seleção */}
                <div className="absolute top-0 right-0 w-1 h-full bg-blue-900/60 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                
                {/* Título do Projeto */}
                <h2 className="text-sm font-bold text-gray-900 group-hover:text-blue-900/60 transition-colors overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                }}>
                    {presentation.group.project.title}
                </h2>
                
                {/* Data e Hora */}
                <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt className="text-xs text-blue-900/60" />
                    <div className="flex flex-col">
                        <span className="text-xs font-medium">{formattedTimestamp[0]}</span>
                        <span className="text-base font-bold text-gray-900">{formattedTimestamp[1]}</span>
                    </div>
                </div>

                {/* Sala */}
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <FaMapMarkerAlt className="text-blue-900/60" />
                    <span className="font-medium">Sala {presentation.classroomName}</span>
                </div>

                {/* Código da Disciplina */}
                <div className="mt-1 pt-2 border-t border-gray-100">
                    <span className="text-xs font-semibold text-blue-900/60">{presentation.group.codSubj}</span>
                </div>

                {/* Ícone de ação */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaChevronRight className="text-blue-900/60 text-sm" />
                </div>
            </div>
        </div>
    )
}