import axios from "axios";
import  z  from "zod";


const DeleteCourseSchema = z.object({
    id: z.string({message: "o id deve ser dado em string"}).length(36, "O id deve conter 36 caracteres")
});

type DeleteCourseSchema = z.infer<typeof DeleteCourseSchema>;

export async function deleteCourse({id}: DeleteCourseSchema) {
    const response = await axios.delete(
        `http://localhost:3000/api/course`,
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