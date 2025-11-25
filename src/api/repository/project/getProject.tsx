import  z  from "zod";
import axios from "axios";

const GetProjectSchema= z.object({
    id: z.string().length(36, "O id deve conter 36 caracteres").optional(),

    partnerId: z.string().length(36, "O partnerId deve conter 36 caracteres").optional()

}).refine(
    (data) => (data.id !== undefined && data.partnerId === undefined) || (data.id === undefined && data.partnerId !== undefined),
    {
        message: "Você deve informar o id ou o partnerId (exatamente um)"
    }
);

type GetProjectSchema = z.infer<typeof GetProjectSchema>;

export async function getProject({ id, partnerId }: GetProjectSchema) {
    const querryParams = id ? `id=${id}` : `partnerId=${partnerId}`;

    const response = await axios.get(
        `http://localhost:3000/api/project?${querryParams}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}