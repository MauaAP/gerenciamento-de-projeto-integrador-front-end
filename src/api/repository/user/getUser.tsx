import axios from "axios";
import  z  from "zod";

const GetUserSchema = z.object({
    id: z.string({message: "id deve ser dado em string"}).length(36, "O id deve conter 36 caracteres").optional(),

    email: z.email("email inválido").optional()

}).refine(
    (data) => (data.id !== undefined && data.email === undefined) || (data.id === undefined && data.email !== undefined),
    {
        message: "Você deve informar o id ou o email (exatamente um)"
    }
);

type GetUserSchema = z.infer<typeof GetUserSchema>;

export async function getUser({id, email}: GetUserSchema) {
    const querryParams = id ? `id=${id}` : `email=${email}`;
    
    const response = await axios.get(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/user?${querryParams}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}