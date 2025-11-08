import axios from "axios";

export async function getAllPresentations() {
    const response = await axios.get(
        `http://localhost:3000/api/presentations`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}