import axios from "axios";
import z from "zod";

const DeleteExaminationBoardSchema= z.object({
    id: z.string().length(36, "O id deve conter 36 caracteres")
});

type DeleteExaminationBoardSchema = z.infer<typeof DeleteExaminationBoardSchema>;

export async function deleteExaminationBoard({id}: DeleteExaminationBoardSchema) {
    const response= await axios.delete(
        `http://localhost:3000/api/examination-board`,
        {
            data: {
                "id": id
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}