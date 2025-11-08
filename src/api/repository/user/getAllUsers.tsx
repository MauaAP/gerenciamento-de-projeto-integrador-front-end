import axios from "axios";

export async function getAllUsers() {
    const response = await axios.get(
        `http://localhost:3000/api/users`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}