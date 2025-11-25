import axios from "axios";
import  z  from "zod";

const CreateCourseSchema = z.object({
     name: z.string({ message: "O nome do curso é obrigatório" }).min(1, { message: "O nome do curso não pode ser vazio" })
});

type CreateCourseSchema = z.infer<typeof CreateCourseSchema>;

export async function createCourse({ name }: CreateCourseSchema) {
    const response = await axios.post(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/course`,
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