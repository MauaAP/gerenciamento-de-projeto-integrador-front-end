import  z  from "zod";
import axios from "axios";

const UpdateGroupSchema = z.object({
    id: z
        .string({ message: "O id deve ser dado em string" }).length(36, "O id deve conter 36 caracteres"),

    codSubj: z.string({ message: "O codSubj deve ser dado em string" }).optional(),

    userIdList: z.array(
        z.string({ message: "O userId deve ser dado em string" }).length(36, "O userId deve conter 36 caracteres"),
        { message: "O userIdList deve ser um array" }
    )
        .nonempty({ message: "O userIdList deve conter ao menos um id de usuário" }
        ).optional(),

    yearSem: z.number({ message: "O yearSem deve ser dadas em numero" }).min(1, { message: "O yearSem deve ser maior que 0" }).optional(),

    projectId: z.string({ message: "O projectId deve ser dado em string" }).length(36, "O projectId deve conter 36 caracteres").optional(),

    courseId: z.string({message: "O courseId deve ser dado em string "}).length(36, "couseId deve conter 36 caracteres").optional()
    
}).refine(
    (data) => (data.codSubj !== undefined || data.userIdList !== undefined || data.yearSem !== undefined || data.projectId !== undefined || data.courseId !== undefined),
    {
        message: "Você deve passar algum atributo para ser alterado"
    }
)

type UpdateGroupSchema = z.infer<typeof UpdateGroupSchema>;

export async function updateGroup({ id, codSubj, userIdList, yearSem, projectId, courseId }: UpdateGroupSchema) {
    const response = await axios.put(
        `http://localhost:3000/api/group`,
        {
            "id": id,
            ...(codSubj !== undefined && { "codSubj": codSubj }),
            ...(userIdList !== undefined && { "userIdList": userIdList }),
            ...(yearSem !== undefined && { "yearSem": yearSem }),
            ...(projectId !== undefined && { "projectId": projectId }),
            ...(courseId !== undefined && { "courseId": courseId })
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