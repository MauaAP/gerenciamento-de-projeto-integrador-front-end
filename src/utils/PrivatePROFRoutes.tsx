import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import type { TokenInterface } from "../services/interface/TokenInterface";

export default function PrivatePROFRoutes() {
    const token = localStorage.getItem('token');

    try {
        const tokenData = jwtDecode<TokenInterface>(localStorage.getItem('token')!);

        if (token && (tokenData.role === "PROFESSOR")) {
            return <Outlet />;
        }
        else {
            return <Navigate to='/error' />
        }
    }
    catch (error) {
        console.log('Erro ao decodificar o token:', error)
        return <Navigate to='/' />
    }
}