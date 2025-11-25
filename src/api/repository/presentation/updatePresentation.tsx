import axios from "axios";
import  z  from "zod";

const UpdatePresentationSchema = z.object({
    id: z.string({ message: "O id deve ser dado em string" }).length(36, "O id deve conter 36 caracteres"),

    date: z.number({ message: "date deve ser dada em numero" }).optional(),

    groupId: z.string({ message: "groupId deve ser dado em string" }).length(36, "O group id deve conter 36 caracteres").optional(),

    examinationBoardId: z.string({ message: "examinationBoardId deve ser dado em string" }).length(36, "O examinationBoard id deve conter 36 caracteres").optional(),

    classRoom: z.string({ message: "A classRoom deve ser uma string" }).optional(),

    status: z.enum(["SCHEDULED", "COMPLETED", "REVIEWING"], { message: "status deve ser SCHEDULED, COMPLETED ou REVIEWING" }).optional()

}).refine(
    (data) => (data.date !== undefined || data.groupId !== undefined || data.examinationBoardId !== undefined || data.classRoom !== undefined || data.status !== undefined),
    {
        message: "Você deve passar algum atributo para ser alterado"
    }
)

type UpdatePresentationSchema = z.infer<typeof UpdatePresentationSchema>;

export async function updatePresentation({ id, date, groupId, examinationBoardId, classRoom, status }: UpdatePresentationSchema) {
    const response = await axios.put(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/presentation`,
        {
            "id": id,
            ...(date !== undefined && { "date": date }),
            ...(groupId !== undefined && { "groupId": groupId }),
            ...(examinationBoardId !== undefined && { "examinationBoardId": examinationBoardId }),
            ...(classRoom !== undefined && { "classRoom": classRoom }),
            ...(status !== undefined && { "status": status })
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