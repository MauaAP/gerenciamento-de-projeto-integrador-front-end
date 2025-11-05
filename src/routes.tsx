import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import PrivateADMRoutes from "./utils/PrivateADMRoutes";
import PrivateMODRoutes from "./utils/PrivateMODRoutes";
import PrivateSTUDRoutes from "./utils/PrivateSTUDRoutes";
import PrivatePROFRoutes from "./utils/PrivatePROFRoutes";
import ProfessorHome from "./pages/professor/professor_home";
import type { MenuItems } from "./services/menuItems";

const menuItemsProf: MenuItems[] =[
    {name: "Meu Perfil", route: "/perfilProf" },
    {name: "Bancas", route: "/paginaInicialADM"},
    {name: "Sair", route: "/"}
];

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/error" element />

                    <Route element={<PrivateADMRoutes />}>
                        <Route path="/paginaInicialADM" element={<ProfessorHome menuItems={menuItemsProf}/>}/>
                    </Route>

                    <Route element={<PrivateMODRoutes />}>
                        <Route path="/paginaInicialMod" />
                    </Route>

                    <Route element={<PrivatePROFRoutes />}>
                        <Route path="/paginaInicialProf" />
                    </Route>

                    <Route element={<PrivateSTUDRoutes />}>
                        <Route path="/paginaInicial" />
                    </Route>

                </Routes>
            </BrowserRouter>
        </div>
    )
}