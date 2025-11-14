import { createContext, useState, type Dispatch, type SetStateAction } from "react";
import type { PresentationInterface } from "../services/interface/PresentationInterface";

// const presentationNotReceived: PresentationInterface= {
//     id: "",
//     date: 0,
//     classRoomName: "",
//     status: "SCHEDULED",
//     group: {
//         codSubj: "",
//         userNameList: [],
//         yearSem: 0,
//         project: {
//             title: "",
//             partnerName: "",
//             extensionHours: 0
//         },
//         courseName: ""
//     },
//     examinationBoard: {
//         professorNameList: []
//     }
// };

interface ScheduledDisplayContextProps {
    presentations: PresentationInterface[];

    principalPresentation: PresentationInterface;
    setPrincipalPresentation: Dispatch<SetStateAction<PresentationInterface>>;

    carouselPresentations: PresentationInterface[];
    setCarouselPresentations: Dispatch<SetStateAction<PresentationInterface[]>>;
}

export const ScheduledDisplayContext= createContext<ScheduledDisplayContextProps | undefined>(undefined);

export const ScheduledDisplayContextProvider =({ children, presentationList } : { children: React.ReactNode, presentationList: PresentationInterface[]}) => {
    const presentations = presentationList;

    const [principalPresentation, setPrincipalPresentation]= useState<PresentationInterface>(presentations[0]);

    const [carouselPresentations, setCarouselPresentations]= useState<PresentationInterface[]>(presentations.slice(1));

    return(
        <ScheduledDisplayContext.Provider
            value={{
                presentations,
                principalPresentation,
                setPrincipalPresentation,
                carouselPresentations,
                setCarouselPresentations
            }}
        >
            {children}
        </ScheduledDisplayContext.Provider>
    )
}