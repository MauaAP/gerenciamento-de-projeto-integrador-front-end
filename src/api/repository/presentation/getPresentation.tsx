import axios from "axios";
import  z  from "zod";
import type { PresentationInterface } from "../../../services/interface/PresentationInterface";

const GetPresentationSchema = z.object({
    id: z.string({ message: "O id deve ser dado em string" }).length(36, "O id deve conter 36 caracteres").optional(),

    date: z.number({ message: "date deve ser dada em numero" }).optional(),

    groupId: z.string({ message: "groupId deve ser dado em string" }).length(36, "O group id deve conter 36 caracteres").optional(),

    examinationBoardId: z.string({ message: "examinationBoardId deve ser dado em string" }).length(36, "O examinationBoard id deve conter 36 caracteres").optional(),

    status: z.enum(["SCHEDULED", "COMPLETED", "REVIEWING"], { message: "status deve ser SCHEDULED, COMPLETED ou REVIEWING" }).optional()

}).refine((data) => {
    const filterFields = [data.date, data.groupId, data.examinationBoardId, data.status];

    const hasFilter = filterFields.some(f => f !== undefined);

    const hasId = data.id !== undefined

    return (hasId && !hasFilter) || (!hasId && hasFilter)
},
    {
        message: "Você deve informar id ou filtros (exatemente um)"
    }
)

type GetPresentationSchema = z.infer<typeof GetPresentationSchema>;

export async function getPresentation({ id, date, groupId, examinationBoardId, status }: GetPresentationSchema): Promise<PresentationInterface[]> {
    const querryParams = id ? `id=${id}` : (() => {
        const querryParamsString= [];

        if (date) querryParamsString.push(`date=${date}`);
        if (groupId) querryParamsString.push(`groupId=${groupId}`);
        if (examinationBoardId) querryParamsString.push(`examinationBoardId=${examinationBoardId}`);
        if (status) querryParamsString.push(`status=${status}`);

        return querryParamsString.join('&');
    })();

    const response = await axios.get(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/presentation?${querryParams}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data.presentations;
}