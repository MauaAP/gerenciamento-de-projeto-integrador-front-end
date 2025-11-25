import axios from "axios";
import  z  from "zod";

const GetExaminationBoardSchema= z.object({
    id: z.string({message: "O id deve ser dado em string"}).length(36, "O id deve conter 36 caracteres").optional(),

    professorId:  z.string({message: "O professor id deve ser dado em string"}).length(36, "O professor id deve conter 36 caracteres").optional(),

}).refine(
    (data) => (data.id !== undefined && data.professorId === undefined) || (data.id === undefined && data.professorId !== undefined),
    {
        message: "Você deve informar o id ou o professorId (exatamente um)"
    }
);

type GetExaminationBoardSchema = z.infer<typeof GetExaminationBoardSchema>;

export async function getExaminationBoard({ id, professorId }: GetExaminationBoardSchema) {
    const querryParams = id ? `id=${id}` : `professorId=${professorId}`;

    const response = await axios.get(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/examination-board?${querryParams}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}