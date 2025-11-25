import axios from "axios";
import z from "zod";

const DeleteGroupSchema= z.object({
    id: z.string().length(36, "O id deve conter 36 caracteres")
});

type DeleteGroupSchema = z.infer<typeof DeleteGroupSchema>;

export async function deleteGroup({id}: DeleteGroupSchema) {
    const response= await axios.delete(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/group`,
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