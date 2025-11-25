import { useContext, useRef, useState, useEffect } from "react";
import { ScheduledDisplayContext } from "../contexts/scheduledDisplayContext";
import { FaAngleUp, FaAngleDown, FaList } from "react-icons/fa";
import PricipalScheduled from "./principalScheduled";
import SecondaryScheduled from "./secondaryScheduled";


export default function Scheduled() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);

    const scheduledDisplayContext = useContext(ScheduledDisplayContext);

    const checkScrollability = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setCanScrollUp(scrollTop > 0);
        setCanScrollDown(scrollTop < scrollHeight - clientHeight - 10);
    };

    useEffect(() => {
        checkScrollability();
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', checkScrollability);
            // Verifica após renderização
            setTimeout(checkScrollability, 100);
        }
        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', checkScrollability);
            }
        };
    }, [scheduledDisplayContext?.carouselPresentations?.length]);

    const scrollUp = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ top: -200, behavior: "smooth" });
    };

    const scrollDown = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ top: 200, behavior: "smooth" });
    };

    if (!scheduledDisplayContext) {
        return null;
    }

    const { principalPresentation, carouselPresentations } = scheduledDisplayContext;
    const hasPresentations = carouselPresentations.length > 0;

    return (
        <div className="flex flex-1 justify-center items-start gap-6 lg:gap-8 p-4 md:p-6 lg:p-8 overflow-hidden flex-col lg:flex-row">
            {/* Card Principal */}
            <div className="flex-shrink-0 w-full lg:w-auto">
                <PricipalScheduled presentation={principalPresentation} />
            </div>
            
            {/* Lista Lateral de Apresentações */}
            {hasPresentations ? (
                <div className="flex flex-col w-full lg:w-full max-w-sm flex-shrink-0">
                    {/* Header da Lista */}
                    <div className="bg-gradient-to-r from-blue-900/60 to-blue-700/60 rounded-t-xl px-5 py-4 min-h-[60px] flex items-center shadow-md">
                        <div className="flex items-center gap-2 text-white w-full">
                            <FaList className="text-lg" />
                            <h3 className="font-bold text-lg">Outras Apresentações</h3>
                            <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs font-semibold">
                                {carouselPresentations.length}
                            </span>
                        </div>
                    </div>

                    {/* Container com Scroll */}
                    <div className="flex flex-col bg-white rounded-b-xl border-x border-b border-gray-200 shadow-lg overflow-hidden" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                        {/* Botão Scroll Up */}
                        {canScrollUp && (
                            <button
                                onClick={scrollUp}
                                className="flex items-center justify-center py-2 bg-gray-50 hover:bg-gray-100 border-b border-gray-200 transition-colors group"
                                aria-label="Rolar para cima"
                            >
                                <FaAngleUp className="text-gray-600 group-hover:text-blue-900/60 text-xl transition-colors" />
                            </button>
                        )}

                        {/* Lista Scrollável */}
                        <div 
                            ref={scrollRef} 
                            className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
                            style={{
                                scrollbarWidth: 'thin',
                            }}
                        >
                            {carouselPresentations.map((presentation) => (
                                <SecondaryScheduled key={presentation.id} presentation={presentation}/>
                            ))}
                        </div>

                        {/* Botão Scroll Down */}
                        {canScrollDown && (
                            <button
                                onClick={scrollDown}
                                className="flex items-center justify-center py-2 bg-gray-50 hover:bg-gray-100 border-t border-gray-200 transition-colors group"
                                aria-label="Rolar para baixo"
                            >
                                <FaAngleDown className="text-gray-600 group-hover:text-blue-900/60 text-xl transition-colors" />
                            </button>
                        )}
                    </div>

                    {/* Indicador de Scroll (se necessário) */}
                    {canScrollUp || canScrollDown ? (
                        <p className="text-xs text-gray-500 text-center mt-2 bg-white px-2 py-1">
                            Use os botões ou arraste para navegar
                        </p>
                    ) : null}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center w-full max-w-sm self-start bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8">
                    <FaList className="text-4xl text-gray-400 mb-3" />
                    <p className="text-gray-500 font-medium text-center">
                        Não há outras apresentações agendadas
                    </p>
                </div>
            )}
        </div>
    )
}