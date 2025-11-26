export interface PresentationInterface {
    id: string;
    date: number;
    classroomName: string;
    status: string;
    group: {
        codSubj: string,
        userNameList: string[],
        yearSem: number,
        project: {
            title: string,
            partnerName: string,
            extensionHours?: number
        },
        course: string
    },
    examinationBoard: {
        professorNameList: string[]
    }
}