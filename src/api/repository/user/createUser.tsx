import axios from "axios";
import { enumRole } from "../../../services/enum/Role";
import  z  from "zod";

const ICreateUserSchema= z.object({
    name: z.string().min(2, { message: "Nome deve conter pelo menos 2 caracteres" }),

    role: z.enum(["Admin", "Moderador", "Professor", "Estudante"], { message: "role inválida" }),

    email: z.email({ message: "Endereço de e-mail inválido" }),

    password: z.string().min(6, { message: "Senha deve conter pelo menos 6 caracteres" })
});

type ICreateUserSchema = z.infer<typeof ICreateUserSchema>;


export async function createUser({ name, role, email, password }: ICreateUserSchema) {
    const response = await axios.post(
        `http://localhost:3000/api/user`,
        {
            "name": name,
            "role": enumRole(role),
            "email": email,
            "password": password
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