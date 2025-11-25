import axios from "axios";
import  z  from "zod";
import { enumSector } from "../../../services/enum/Sector";

const UpdatePartnerSchema = z.object({
    id: z.string({ message: "Id do parceiro é obrigatório" }).length(36, "O id deve conter 36 caracteres"),

    name: z.string({ message: "Name deve ter pelo menos um caracter" }).optional(),

    sector: z.enum([
        "Educacional",
        "Governamental",
        "Industrial",
        "Saúde",
        "ONG",
        "Ambiental",
        "Financeiro"
    ], { message: "Sector é obrigatório. Valores aceitos: Educacional, Govenamenta, Industrial, Saúde, ONG, Ambiental, Financeiro" }).optional(),

}).refine(
    (data) => (data.name !== undefined || data.sector !== undefined),
    {
        message: "Você deve passar algum atributo para ser alterado"
    }
)

type UpdatePartnerSchema = z.infer<typeof UpdatePartnerSchema>


export async function updatePartner({ id, name, sector }: UpdatePartnerSchema) {
    const response= await axios.put(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/partner`,
        {
            "id": id,
            ...(name !== undefined && { "name": name }),
            ...(sector !== undefined && { "sector": enumSector(sector) })
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
