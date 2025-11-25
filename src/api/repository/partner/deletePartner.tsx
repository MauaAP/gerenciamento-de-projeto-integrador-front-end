import axios from "axios";
import z from "zod";

export const DeletePartnerSchema= z.object({
    id: z.string().length(36, "O id deve conter 36 caracteres")
});

export type DeletePartnerSchema = z.infer<typeof DeletePartnerSchema>

export async function deletePartner({id}: DeletePartnerSchema) {
    const response= await axios.delete(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/partner`,
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