export interface GroupInterface{
    id: string,
    codSubj: string,
    userNameList: string[],
    yearSem: number,
    project: {
        title: string,
        partnerName: string,
        extensionHours?: number
    },
    course: string
}