import axios from "axios";
import  z  from "zod";

const GetPartnerSchema = z.object({
    id: z.string().length(36, "O id deve conter 36 caracteres").optional(),

    name: z.string({ message: "Name deve ter pelo menos um caracter" }).optional()

}).refine(
    (data) => (data.id !== undefined && data.name === undefined) || (data.id === undefined && data.name !== undefined),
    {
        message: "Você deve informar o id ou o name (exatamente um)"
    }
)

type GetPartnerSchema = z.infer<typeof GetPartnerSchema>

export async function getPartner({id, name}: GetPartnerSchema) {
    const querryParams = id ? `id=${id}` : `name=${name}`;

    const response = await axios.get(
        `http://localhost:3000/api/partner?${querryParams}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}
