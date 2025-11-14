// import { useRef } from "react";
import NavBar from "../../components/navBar";
import { SlideBarContextProvider } from "../../contexts/slideBarContext";
import type { MenuItems } from "../../services/menuItems";
import type { PresentationInterface } from "../../services/interface/PresentationInterface";
import { ScheduledDisplayContextProvider } from "../../contexts/scheduledDisplayContext";
import Scheduled from "../../components/scheduled";

const testPresentations: PresentationInterface[]= [
    {
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
    },
    {
        id: "2",
        date: 1762788600000,
        classRoomName: "U28",
        status: "SCHEDULED",
        group: {
            codSubj: "TTI102",
            userNameList: ["Ana", "Beatriz", "Carla", "Daniela", "Elisa"],
            yearSem: 202401,
            project: {
                title: "Aplicativo de Gestão Financeira",
                partnerName: "Maua",
                extensionHours: 15
            },
            courseName: "Tecnologia em Análise e Desenvolvimento de Sistemas"
        },
        examinationBoard: {
            professorNameList: ["Bruno", "Carla", "Diego"]
        }
    },
    {
        id: "3",
        date: 1762790400000,
        classRoomName: "U29",
        status: "SCHEDULED",
        group: {
            codSubj: "TTI103",
            userNameList: ["Felipe", "Gabriel", "Hugo", "Igor", "João"],
            yearSem: 202401,
            project: {
                title: "Plataforma de E-commerce Sustentável",
                partnerName: "Maua",
                extensionHours: 25
            },
            courseName: "Tecnologia em Análise e Desenvolvimento de Sistemas"
        },
        examinationBoard: {
            professorNameList: ["Eduardo", "Fernanda", "Gustavo"]
        }
    },
    {
        id: "4",
        date: 1762792200000,
        classRoomName: "U30",
        status: "SCHEDULED",
        group: {
            codSubj: "TTI104",
            userNameList: ["Karen", "Larissa", "Mariana", "Natália", "Olívia"],
            yearSem: 202401,
            project: {
                title: "Sistema de Monitoramento Ambiental",
                partnerName: "Maua",
                extensionHours: 30
            },
            courseName: "Tecnologia em Análise e Desenvolvimento de Sistemas"
        },
        examinationBoard: {
            professorNameList: ["Helena", "Isabela", "Júlia"]
        }
    },
    {
        id: "5",
        date: 1762794000000,
        classRoomName: "U31",
        status: "SCHEDULED",
        group: {
            codSubj: "TTI105",
            userNameList: ["Pedro", "Quintino", "Rafael", "Samuel", "Tiago"],
            yearSem: 202401,
            project: {
                title: "Aplicativo de Saúde Mental",
                partnerName: "Maua",
                extensionHours: 18
            },
            courseName: "Tecnologia em Análise e Desenvolvimento de Sistemas"
        },
        examinationBoard: {
            professorNameList: ["Larissa", "Marcos", "Natalia"]
        }
    }
]

export default function ProfessorHome({ menuItems }: { menuItems: MenuItems[] }) {
    return (
        <SlideBarContextProvider>
            <ScheduledDisplayContextProvider presentationList={testPresentations}>
                <main className="flex flex-col bg-white w-full h-screen">
                    <NavBar menuItems={menuItems} />
                    <Scheduled/>
                </main>
            </ScheduledDisplayContextProvider>
        </SlideBarContextProvider>
    )
}