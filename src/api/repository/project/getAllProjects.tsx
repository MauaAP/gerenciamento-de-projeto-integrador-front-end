import axios from "axios";

export async function getAllPartners() {
    const response = await axios.get(
        `http://localhost:3000/api/partners`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}