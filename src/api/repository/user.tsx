import axios from "axios";
import type { ILoginForm } from "../../pages/services/login-validation";

export async function authUser(data: ILoginForm){
    const response = await axios.post(
        `http://localhost:3000/api/login`,
        {
            "email": data.email,
            "password": data.password
        }
    )
    console.log(response.data.token)
    console.log(response.data.user)
    // armazenando token
    localStorage.setItem('token', response.data.token)

    // armazenando usuario
    localStorage.setItem('user', response.data.user)
}