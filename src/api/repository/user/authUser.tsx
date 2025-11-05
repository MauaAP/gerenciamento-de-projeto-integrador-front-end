import axios from "axios";
import type { ILoginForm } from "../../../services/loginValidation";


export async function authUser(data: ILoginForm) {
    const response = await axios.post(
        `http://localhost:3000/api/login`,
        {
            "email": data.email,
            "password": data.password
        }
    )
    // armazenando token
    localStorage.setItem('token', response.data.token)

    // armazenando usuario
    localStorage.setItem('user', JSON.stringify(response.data.user))
}