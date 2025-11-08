import axios from "axios";


export async function getAllClassrooms() {
    const response = await axios.get(
        `http://localhost:3000/api/classrooms`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}