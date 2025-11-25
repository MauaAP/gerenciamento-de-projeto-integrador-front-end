import  z  from "zod";
import axios from "axios";

const ICreateProjectSchema = z.object({
    title: z.string({ message: "Título é obrigatório" }).min(6, "O title deve conter pelo menos 6 caracteres"),

    partnerId: z.string({ message: "Id do parceiro é obrigatório" }).length(36, "O partnerId deve conter 36 caracteres"),

    extensionHours: z.number({ message: "As extensionHours devem ser dadas em numero de horas (number)" }).min(0, { message: "O menor número que a extensionHours pode assumir é 0" }).optional()
})

type ICreateProjectSchema = z.infer<typeof ICreateProjectSchema>;

export async function createProject({ title, partnerId, extensionHours }: ICreateProjectSchema) {
    const response = await axios.post(
        `http://localhost:3000/api/project`,
        {
            "title": title,
            "partnerId": partnerId,
            "extensionHours": extensionHours
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