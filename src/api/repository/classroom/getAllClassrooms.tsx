import axios from "axios";


export async function getAllClassrooms() {
    const response = await axios.get(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/classrooms`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}