import { useState, useContext } from "react";
import type { PresentationInterface } from "../services/interface/PresentationInterface";
import { formatTimestamp } from "./functions/formatTimestamp";
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import { ScheduledDisplayContext } from "../contexts/scheduledDisplayContext";
import { updatePresentation } from "../api/repository/presentation/updatePresentation";
import { toast } from "react-toastify";

export default function PricipalScheduled({presentation}: {presentation: PresentationInterface}){
    const formattedTimestamp= formatTimestamp(presentation.date);
    const scheduledDisplayContext = useContext(ScheduledDisplayContext);
    const [isCompleting, setIsCompleting] = useState(false);

    const handleCompletePresentation = async () => {
        if (!scheduledDisplayContext) return;
        
        // Verificar se já está completada
        if (presentation.status === "COMPLETED") {
            toast.info("Esta apresentação já foi concluída.");
            return;
        }

        setIsCompleting(true);
        
        try {
            // Atualizar o status na API
            await updatePresentation({
                id: presentation.id,
                status: "COMPLETED"
            });

            toast.success("Apresentação concluída com sucesso!");

            // Recarregar a lista de apresentações da API
            if (scheduledDisplayContext.reloadPresentations) {
                await scheduledDisplayContext.reloadPresentations();
            }
        } catch (error) {
            console.error("Erro ao concluir apresentação:", error);
            toast.error("Erro ao concluir apresentação. Tente novamente.");
        } finally {
            setIsCompleting(false);
        }
    };

    return (
        <section className="bg-gradient-to-br from-white to-gray-50 shadow-2xl hover:shadow-3xl transition-all duration-300 w-full max-w-2xl rounded-3xl border border-gray-200 overflow-hidden">
            {/* Header com status */}
            <div className={`px-6 py-4 min-h-[60px] flex items-center ${
                presentation.status === "COMPLETED" 
                    ? "bg-gradient-to-r from-green-600 to-green-700" 
                    : "bg-gradient-to-r from-blue-900/60 to-blue-700/60"
            }`}>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                            presentation.status === "COMPLETED" 
                                ? "bg-white" 
                                : "bg-green-400 animate-pulse"
                        }`}></div>
                        <span className="text-white font-semibold text-sm uppercase tracking-wide">
                            {presentation.status === "COMPLETED" ? "Concluída" : "Agendada"}
                        </span>
                    </div>
                    <span className="text-white/80 text-sm font-medium">{presentation.group.codSubj}</span>
                </div>
            </div>

            <div className="flex flex-col gap-6 px-8 py-8">
                {/* Título do Projeto */}
                <div className="flex flex-col items-center gap-3 border-b border-gray-200 pb-6">
                    <h2 className="text-2xl font-bold text-gray-900 text-center leading-tight">
                        {presentation.group.project.title}
                    </h2>
                    <p className="text-gray-600 font-medium">Projeto Integrador - {presentation.group.codSubj}</p>
                </div>

                {/* Data e Hora */}
                <div className="flex flex-col items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-900/60 mb-1">
                        <FaCalendarAlt className="text-lg" />
                        <span className="text-sm font-semibold uppercase tracking-wide">{formattedTimestamp[0]}</span>
                    </div>
                    <h1 className="text-4xl font-bold text-blue-900">{formattedTimestamp[1]}</h1>
                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                        <FaMapMarkerAlt className="text-sm" />
                        <span className="font-medium">Sala {presentation.classroomName}</span>
                    </div>
                </div>

                {/* Informações da Banca e Grupo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Banca Examinadora */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-3">
                            <FaChalkboardTeacher className="text-blue-900/60 text-lg" />
                            <h3 className="text-sm font-bold text-blue-900/60 uppercase tracking-wide">Banca Examinadora</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            {presentation.examinationBoard.professorNameList.length > 0 ? (
                                presentation.examinationBoard.professorNameList.map((professor, index) => (
                                    <div 
                                        key={index}
                                        className="text-gray-800 text-sm font-medium bg-gray-50 rounded-lg px-3 py-2 border border-gray-100"
                                    >
                                        {professor}
                                    </div>
                                ))
                            ) : (
                                <span className="text-gray-400 text-sm italic">Nenhum professor</span>
                            )}
                        </div>
                    </div>

                    {/* Grupo */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-3">
                            <FaUsers className="text-blue-900/60 text-lg" />
                            <h3 className="text-sm font-bold text-blue-900/60 uppercase tracking-wide">Grupo</h3>
                        </div>
                        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                            {presentation.group.userNameList.length > 0 ? (
                                presentation.group.userNameList.map((student, index) => (
                                    <div 
                                        key={index}
                                        className="text-gray-800 text-sm font-medium bg-gray-50 rounded-lg px-3 py-2 border border-gray-100"
                                    >
                                        {student}
                                    </div>
                                ))
                            ) : (
                                <span className="text-gray-400 text-sm italic">Nenhum aluno</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Informações Adicionais */}
                <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                    <div>
                        <span className="font-semibold">Curso:</span> {presentation.group.courseName}
                    </div>
                    {presentation.group.project.extensionHours && (
                        <div>
                            <span className="font-semibold">Horas:</span> {presentation.group.project.extensionHours}h
                        </div>
                    )}
                </div>

                {/* Botão de Concluir Apresentação */}
                {presentation.status === "COMPLETED" ? (
                    <button
                        disabled
                        className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg cursor-not-allowed flex items-center justify-center gap-3 opacity-75"
                    >
                        <FaCheckCircle className="text-xl" />
                        <span className="text-lg">Apresentação Concluída</span>
                    </button>
                ) : (
                    <button
                        onClick={handleCompletePresentation}
                        disabled={isCompleting}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed"
                    >
                        {isCompleting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-lg">Concluindo...</span>
                            </>
                        ) : (
                            <>
                                <FaCheckCircle className="text-xl" />
                                <span className="text-lg">Concluir Apresentação</span>
                            </>
                        )}
                    </button>
                )}
            </div>            
        </section>
    )
}