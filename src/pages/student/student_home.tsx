import NavBar from "../../components/navBar";
import PricipalScheduled from "../../components/principalScheduled";
import { SlideBarContextProvider } from "../../contexts/slideBarContext";
import type { MenuItems } from "../../services/menuItems";
import type { PresentationInterface } from "../../services/interface/PresentationInterface";

const presentation: PresentationInterface = {
    id: "1",
    date: 1762786800000,
    classRoomName: "U27",
    status: "SCHEDULED",
    group: {
        codSubj: "TTI101",
        userNameList: ["Guilherme", "Luca", "Gabriel", "Lucas", "Rafael"],
        yearSem: 202401,
        project: {
            title: "Desenvolvendo jogo Poliedro",
            partnerName: "Maua",
            extensionHours: 20
        },
        courseName: "Tecnologia em Análise e Desenvolvimento de Sistemas"
    },
    examinationBoard: {
        professorNameList: ["Rudulf", "Alex", "Ana Paula"]
    }
}

export default function StudentHome({ menuItems }: { menuItems: MenuItems[] }) {
    return (
        <SlideBarContextProvider>
            <main className="flex flex-col bg-white w-full h-screen">
                <NavBar menuItems={menuItems} />
                <div className="flex flex-1 justify-center items-center">
                    <PricipalScheduled presentation={presentation}/>
                </div>
            </main>
        </SlideBarContextProvider>
    )
}