import axios from "axios";
import  z  from "zod";

const DeleteUserSchema= z.object({
  id: z.string({message: "id deve ser dado em string"}).length(36, "O id deve conter 36 caracteres")
});

type DeleteUserSchema = z.infer<typeof DeleteUserSchema>;

export async function deleteUser({id}: DeleteUserSchema) {
    const response = await axios.delete(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/user`,
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