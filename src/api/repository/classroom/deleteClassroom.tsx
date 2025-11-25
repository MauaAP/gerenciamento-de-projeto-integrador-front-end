import axios from "axios";
import  z  from "zod";

const DeleteClassroomSchema = z.object({
  id: z.string({message: "id deve ser dado em string"}).length(36, "O id deve conter 36 caracteres")
});

type DeleteClassroomSchema = z.infer<typeof DeleteClassroomSchema>;

export async function deleteClassroom({id}: DeleteClassroomSchema) {
    const response = await axios.delete(
        `http://localhost:3000/api/classroom`,
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