import axios from "axios";
import  z  from "zod";

const GetGroupSchema = z.object({
    id: z.string().length(36, "O id deve conter 36 caracteres").optional(),

    userId: z.string().length(36, "O user id deve conter 36 caracteres").optional(),

    codSubj: z.string().optional(),

    yearSem: z.coerce.number({ message: "O yearSem deve ser dadas em numero" }).min(1, { message: "O yearSem deve ser maior que 0" }).optional(),

    projectId: z.string({ message: "projectId deve ser dado em string" }).length(36, "O projectId deve conter 36 caracteres").optional(),

    courseId: z.string({message: "courseId deve ser dado em string "}).optional()

}).refine((data) => {
    const filterFields = [data.userId, data.codSubj, data.yearSem, data.projectId, data.courseId];

    const hasFilter = filterFields.some(f => f !== undefined);

    const hasId = data.id !== undefined

    return (hasId && !hasFilter) || (!hasId && hasFilter)
},
    {
        message: "Você deve informar id ou filtros (exatemente um))"
    })

type GetGroupSchema = z.infer<typeof GetGroupSchema>;

export async function getGroup({ id, userId, codSubj, yearSem, projectId, courseId }: GetGroupSchema) {
    const querryParams = id ? `id=${id}` : () => {
        const querryParamsString= [];

        if (userId) querryParamsString.push(`userId=${userId}`);
        if (codSubj) querryParamsString.push(`codSubj=${codSubj}`);
        if (yearSem) querryParamsString.push(`yearSem=${yearSem}`);
        if (projectId) querryParamsString.push(`projectId=${projectId}`);
        if (courseId) querryParamsString.push(`courseId=${courseId}`);

        return querryParamsString.join('&');
    }

    const response = await axios.get(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/group?${querryParams}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}