import axios from "axios";
import  z  from "zod";

const CreateCourseSchema = z.object({
     name: z.string({ message: "O nome do curso é obrigatório" }).min(1, { message: "O nome do curso não pode ser vazio" })
});

type CreateCourseSchema = z.infer<typeof CreateCourseSchema>;

export async function createCourse({ name }: CreateCourseSchema) {
    const response = await axios.post(
        `http://localhost:3000/api/course`,
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