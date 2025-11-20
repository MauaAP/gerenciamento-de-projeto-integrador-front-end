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

    useEffect(() => {

        async function fetchPresentations() {
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
        }

        fetchPresentations();
    }, []); 
    
    return (
        <SlideBarContextProvider>
            <ScheduledDisplayContextProvider presentationList={ presentations }>
                
                <main className="flex flex-col bg-white w-full h-screen">
                    <NavBar menuItems={menuItems} />
                    {isLoading ? (
                        // Se 'isLoading' for true, mostre esta div de carregamento
                        <div className="flex flex-1 justify-center items-center">
                            <p className="text-xl text-gray-500">Carregando Apresentações...</p>
                        </div>
                    ) : (
                        <Scheduled/>
                    )}
                </main>
            </ScheduledDisplayContextProvider>
        </SlideBarContextProvider>
    )
}