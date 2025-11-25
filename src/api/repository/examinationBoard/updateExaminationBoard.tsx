import axios from "axios";
import  z  from "zod";

const UpdateExaminationBoardSchema= z.object({
    id: z.string({message: "O id deve ser dado em string"}).length(36, "O id deve conter 36 caracteres"),

    newProfessorIdList: z.array(
        z.string({ message: "O professorId deve ser dado em string" }).length(36, "O professorId deve conter 36 caracteres"),
        { message: "A lista de professores é obrigatório" }
    )
        .nonempty({ message: "A lista de professores deve conter ao menos um id de professor" }
    ),
});

type UpdateExaminationBoardSchema = z.infer<typeof UpdateExaminationBoardSchema>;

export async function updateExaminationBoard({ id, newProfessorIdList }: UpdateExaminationBoardSchema) {
    const response = await axios.put(
        `http://localhost:3000/api/examination-board`,
        {
            "id": id,
            "newProfessorIdList": newProfessorIdList,
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