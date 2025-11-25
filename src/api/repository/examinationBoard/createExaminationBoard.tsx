import  z  from "zod";
import axios from "axios";

export const CreateExaminationBoardSchema = z.object({
    professorIdList: z.array(
        z.string({ message: "O professorId deve ser dado em string" }).length(36, "O professorId deve conter 36 caracteres"),
        { message: "A lista de professores é obrigatório" }
    )
        .nonempty({ message: "A lista de professores deve conter ao menos um id de professor" }
    ),
});

type CreateExaminationBoardSchema = z.infer<typeof CreateExaminationBoardSchema>;

export async function createExaminationBoard({ professorIdList }: CreateExaminationBoardSchema) {
    const response = await axios.post(
        `http://localhost:3000/api/examination-board`,
        {
            "professorIdList": professorIdList,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}