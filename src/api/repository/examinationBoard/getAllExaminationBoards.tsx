import axios from "axios";

export type GetAllExaminationBoardsSchema = {
    id?: string;
    ProfessorNameList?: string[];
};

export async function getAllExaminationBoards(): Promise<GetAllExaminationBoardsSchema[]> {
    const response = await axios.get(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/examination-boards`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data.examinationBoards;
}