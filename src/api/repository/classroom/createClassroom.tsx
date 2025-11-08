import axios from "axios";
import  z  from "zod";

const CreateClassroomSchema = z.object({
    name: z.string({ message: "O nome da sala de aula é obrigatório" }).min(1, { message: "O nome da sala de aula não pode ser vazio" })
});

type CreateClassroomSchema = z.infer<typeof CreateClassroomSchema>;

export async function createClassroom({ name }: CreateClassroomSchema) {
    const response = await axios.post(
        `http://localhost:3000/api/classroom`,
        {
            "name": name
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