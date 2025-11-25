import axios from "axios";
import z from "zod";
import { enumSector } from "../../../services/enum/Sector";

const CreatePartnerSchema = z.object({
    name: z.string({ message: "Name é obrigatório" }),
    sector: z.enum([
        "Educacional",
        "Governamental",
        "Industrial",
        "Saúde",
        "ONG",
        "Ambiental",
        "Financeiro"
    ], { message: "Sector é obrigatório. Valores aceitos: Educacional, Govenamenta, Industrial, Saúde, ONG, Ambiental, Financeiro" })
})

type CreatePartnerSchema = z.infer<typeof CreatePartnerSchema>;

export async function createPartner({ name, sector }: CreatePartnerSchema) {
    const response = await axios.post(
        `http://localhost:3000/api/partner`,
        {
            "name": name,
            "sector": enumSector(sector)
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