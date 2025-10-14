import { jwtDecode } from "jwt-decode"
import { Navigate, Outlet } from "react-router-dom"
import type { TokenInterface } from "../services/TokenInterface";

export default function PrivateMODRoutes() {
    const token = localStorage.getItem('token')

    try {
        const tokenData = jwtDecode<TokenInterface>(localStorage.getItem('token')!);

        if (token && (tokenData.role === 'MODERATOR')) {
            return <Outlet />
        }
        else {
            return <Navigate to='/error' />;
        }
    }
    catch (error) {
        console.log('Erro ao decodificar o token', error);
        <Navigate to='/' />
    }
}