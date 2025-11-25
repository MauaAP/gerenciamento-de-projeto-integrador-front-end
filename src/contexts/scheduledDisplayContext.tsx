import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
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
    setPresentations: Dispatch<SetStateAction<PresentationInterface[]>>;

    principalPresentation: PresentationInterface;
    setPrincipalPresentation: Dispatch<SetStateAction<PresentationInterface>>;

    carouselPresentations: PresentationInterface[];
    setCarouselPresentations: Dispatch<SetStateAction<PresentationInterface[]>>;

    reloadPresentations?: () => Promise<void>;
}

export const ScheduledDisplayContext= createContext<ScheduledDisplayContextProps | undefined>(undefined);

export const ScheduledDisplayContextProvider =({ children, presentationList, reloadFn } : { children: React.ReactNode, presentationList: PresentationInterface[], reloadFn?: () => Promise<void>}) => {
    const [presentations, setPresentations] = useState<PresentationInterface[]>(presentationList);

    const [principalPresentation, setPrincipalPresentation]= useState<PresentationInterface>(presentationList[0]);

    const [carouselPresentations, setCarouselPresentations]= useState<PresentationInterface[]>(presentationList.length > 1? presentationList.slice(1) : []);

    useEffect(() => {
        setPresentations(presentationList);
        setPrincipalPresentation(presentationList[0]);
        setCarouselPresentations(presentationList.length > 1 ? presentationList.slice(1) : []);
        
    }, [presentationList]);

    return(
        <ScheduledDisplayContext.Provider
            value={{
                presentations,
                setPresentations,
                principalPresentation,
                setPrincipalPresentation,
                carouselPresentations,
                setCarouselPresentations,
                reloadPresentations: reloadFn
            }}
        >
            {children}
        </ScheduledDisplayContext.Provider>
    )
}