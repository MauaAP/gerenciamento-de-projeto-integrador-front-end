import axios from "axios";

export type GetAllPartnerSchema = {
    partnerId?: string;
    name?: string;
    sector?: string;
};

export async function getAllPartners(): Promise<GetAllPartnerSchema[]> {
    const response = await axios.get(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/partners`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data.partnerList);
    return response.data.partnerList;
}