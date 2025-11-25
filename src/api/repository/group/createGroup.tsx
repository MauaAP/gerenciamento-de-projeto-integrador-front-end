import  z  from "zod";
import axios from "axios";

const CreateGroupSchema = z.object({
    codSubj: z.string({ message: "Código da matéria é obrigatório" }),

    userIdList: z.array(
        z.string({ message: "O userId deve ser dado em string" }).length(36, "O userId deve conter 36 caracteres"),
        { message: "A lista de usuários é obrigatório" }
    )
        .nonempty({ message: "A lista de usuários deve conter ao menos um id de usuário" }
    ),

    yearSem: z.number({ message: "O yearSem deve ser dadas em numero" }).min(1, { message: "O yearSem deve ser maior que 0" }),

    projectId: z.string({ message: "projectId é obrigatório" }).length(36, "O projectId deve conter 36 caracteres"),

    courseId: z.string({ message: "courseId é obrigatório" }).length(36, "O courseId deve conter 36 caracteres"),
})

type CreateGroupSchema = z.infer<typeof CreateGroupSchema>;

export async function createGroup({ codSubj, userIdList, yearSem, projectId, courseId }: CreateGroupSchema) {
    const response = await axios.post(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/group`,
        {
            "codSubj": codSubj,
            "userIdList": userIdList,
            "yearSem": yearSem,
            "projectId": projectId,
            "courseId": courseId
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