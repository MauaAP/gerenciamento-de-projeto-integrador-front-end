import axios from "axios";

export type GetAllProjectsSchema = {
    id?: string;
    title?: string;
    partnerName?: string;
}

export async function getAllProjects(): Promise<GetAllProjectsSchema[]> {
    const response = await axios.get(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/projects`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data.projects;
}