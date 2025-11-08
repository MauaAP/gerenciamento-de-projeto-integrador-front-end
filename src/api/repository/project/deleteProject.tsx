import axios from "axios";
import  z  from "zod";

const DeleteProjectSchema= z.object({
  id: z.string({message: "id deve ser dado em string"}).length(36, "O id deve conter 36 caracteres")
});

type DeleteProjectSchema = z.infer<typeof DeleteProjectSchema>;

export async function deleteProject({id}: DeleteProjectSchema) {
    const response = await axios.delete(
        `http://localhost:3000/api/project`,
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