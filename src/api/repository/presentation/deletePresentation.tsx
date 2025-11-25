import axios from "axios";
import z from "zod";

const DeletePresentationSchema = z.object({
    id: z.string({message: "o id deve ser dado em string"}).length(36, "O id deve conter 36 caracteres")
});

type DeletePresentationSchema = z.infer<typeof DeletePresentationSchema>;

export async function deletePresentation({id}: DeletePresentationSchema) {
    const response = await axios.delete(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/presentation`,
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