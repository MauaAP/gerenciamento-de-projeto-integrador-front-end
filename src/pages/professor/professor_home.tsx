// import { useRef } from "react";
import NavBar from "../../components/navBar";
import { SlideBarContextProvider } from "../../contexts/slideBarContext";
import type { MenuItems } from "../../services/menuItems";
import type { PresentationInterface } from "../../services/interface/PresentationInterface";
import { ScheduledDisplayContextProvider } from "../../contexts/scheduledDisplayContext";
import Scheduled from "../../components/scheduled";
import { useState, useEffect } from 'react';
import { getPresentation } from "../../api/repository/presentation/getPresentation";

const defaultPresentations: PresentationInterface[]= [
    {
        id: "1",
        date: 1762786800000,
        classroomName: "U",
        status: "SCHEDULED",
        group: {
            codSubj: "TTI101",
            userNameList: ["Nenhum aluno"],
            yearSem: 202401,
            project: {
                title: "Nenhum projeto",
                partnerName: "Maua",
                extensionHours: 1
            },
            courseName: "Nenhum curso"
        },
        examinationBoard: {
            professorNameList: ["Nenhum professor"]
        }
    }
]


export default function ProfessorHome({ menuItems }: { menuItems: MenuItems[] }) {

    const [presentations, setPresentations] = useState(defaultPresentations);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPresentations = async () => {
        try {
            const data = await getPresentation({status: "SCHEDULED"}); 

            if (data && data.length > 0) {
                setPresentations(data);
            }
            else {
                setPresentations(defaultPresentations);
            }
        }
        catch (error) {
            console.error("Error fetching presentations:", error);
            setPresentations(defaultPresentations);
        } 
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPresentations();
    }, []); 
    
    return (
        <SlideBarContextProvider>
            <ScheduledDisplayContextProvider presentationList={ presentations } reloadFn={fetchPresentations}>
                
                <main className="flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/30 w-full h-screen overflow-hidden">
                    <NavBar menuItems={menuItems} />
                    {isLoading ? (
                        // Se 'isLoading' for true, mostre esta div de carregamento
                        <div className="flex flex-1 justify-center items-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-blue-900/60 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-xl text-gray-600 font-medium">Carregando Apresentações...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto">
                            <Scheduled/>
                        </div>
                    )}
                </main>
            </ScheduledDisplayContextProvider>
        </SlideBarContextProvider>
    )
}