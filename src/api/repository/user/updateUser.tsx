import  z  from "zod";
import { enumRole } from "../../../services/enum/Role";
import axios from "axios";

const UpdateUserSchema = z.object({
    id: z.string({ message: "Id deve ser dado em string" }).length(36, "O id deve conter 36 caracteres"),

    name: z.string({ message: "Name deve ter pelo menos um caracter" }).optional(),

    email: z.email("email inválido").optional(),

    role: z.enum(["Admin", "Moderador", "Professor", "Estudante"], { message: "role inválida" }).optional(),

    password: z.string().min(6, "A password deve ter pelo menos 6 caracteres").optional()
}).refine(
    (data) => (data.name !== undefined || data.email !== undefined || data.role !== undefined || data.password !== undefined),
    {
        message: "Você deve passar algum atributo para ser alterado"
    }
)

type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;

export async function updateUser({ id, name, email, role, password }: UpdateUserSchema) {
    const response = await axios.put(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/user`,
        {
            "id": id,
            ...(name !== undefined && { "name": name }),
            ...(email !== undefined && { "email": email }),
            ...(role !== undefined && { "role": enumRole(role) }),
            ...(password !== undefined && { "password": password })
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