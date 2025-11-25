import axios from "axios";

export async function getAllUsers() {
    const response = await axios.get(
        `https://qm7r2xmjbg.us-east-1.awsapprunner.com/api/users`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}