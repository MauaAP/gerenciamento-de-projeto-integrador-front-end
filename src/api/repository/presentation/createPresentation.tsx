import axios from "axios";
import  z  from "zod";

const CreatePresentationSchema = z.object({
    date: z.number({ message: "A data deve ser data em numero" }),

    groupId: z.string({ message: "O groupId deve ser dado em string" }).length(36, "O groupId deve conter 36 caracteres"),

    examinationBoardId: z.string({ message: "O examinationBoardId deve ser dado em string" }).length(36, "O examinationBoardId deve conter 36 caracteres"),

    classRoomId: z.string({ message: "O classRoomId deve ser dado em string" }).length(36, "O classRoomId deve conter 36 caracteres"),
});

type CreatePresentationSchema = z.infer<typeof CreatePresentationSchema>;

export async function createPresentation({ date, groupId, examinationBoardId, classRoomId }: CreatePresentationSchema) {
    const response = await axios.post(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/presentation`,
        {
            "date": date,
            "groupId": groupId,
            "examinationBoardId": examinationBoardId,
            "classRoomId": classRoomId
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

