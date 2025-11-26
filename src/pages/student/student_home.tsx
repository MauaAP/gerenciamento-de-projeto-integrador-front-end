import NavBar from "../../components/navBar";
import PricipalScheduled from "../../components/principalScheduled";
import { SlideBarContextProvider } from "../../contexts/slideBarContext";
import type { MenuItems } from "../../services/menuItems";
import type { PresentationInterface } from "../../services/interface/PresentationInterface";
import { useState, useEffect } from 'react';
import { getPresentation } from "../../api/repository/presentation/getPresentation";

const defaultPresentation: PresentationInterface[] = [
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
            course: "Nenhum curso"
        },
        examinationBoard: {
            professorNameList: ["Nenhum professor"]
        }
    }
]

export default function StudentHome({ menuItems }: { menuItems: MenuItems[] }) {
    const [presentations, setPresentations] = useState(defaultPresentation)
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
    
            async function fetchPresentations() {
                try {
                    const data = await getPresentation({status: "SCHEDULED"}); 
        
                    if (data && data.length > 0) {
                        setPresentations(data);
                    }
                    else {
                        setPresentations(defaultPresentation);
                    }
                }
                catch (error) {
                    console.error("Error fetching presentations:", error);
                    setPresentations(defaultPresentation);
                } 
                finally {
                    setIsLoading(false);
                }
            }
    
            fetchPresentations();
        }, []); 

    
    return (
        <SlideBarContextProvider>
            <main className="flex flex-col bg-white w-full h-screen">
                <NavBar menuItems={menuItems} />
                {isLoading ? (
                        // Se 'isLoading' for true, mostre esta div de carregamento
                        <div className="flex flex-1 justify-center items-center">
                            <p className="text-xl text-gray-500">Carregando Apresentações...</p>
                        </div>
                    ) : (

                        <div className="flex flex-1 justify-center items-center">
                            <PricipalScheduled presentation={presentations[0]}/>
                        </div>
                    )}
            </main>
        </SlideBarContextProvider>
    )
}