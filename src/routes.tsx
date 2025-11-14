import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/default/login";
import PrivateADMRoutes from "./utils/PrivateADMRoutes";
import PrivateMODRoutes from "./utils/PrivateMODRoutes";
import PrivateSTUDRoutes from "./utils/PrivateSTUDRoutes";
import PrivatePROFRoutes from "./utils/PrivatePROFRoutes";
import ProfessorHome from "./pages/professor/professor_home";
import type { MenuItems } from "./services/menuItems";
import StudentHome from "./pages/student/student_home";
import UserAccount from "./pages/default/user_account";

const menuItemsProf: MenuItems[] = [
    { name: "Meu Perfil", route: "/perfilProf" },
    { name: "Apresentações", route: "/paginaInicialADM" },
    { name: "Sair", route: "/" }
];

const menuItemsStud: MenuItems[] = [
    { name: "Meu Perfil", route: "/perfilStud" },
    { name: "Apresentação", route: "/paginaInicial" },
    { name: "Sair", route: "/" }
];

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/error" element />

                    <Route element={<PrivateADMRoutes />}>
                        <Route path="/paginaInicialADM" />
                    </Route>

                    <Route element={<PrivateMODRoutes />}>
                        <Route path="/paginaInicialMod" />
                    </Route>

                    <Route element={<PrivatePROFRoutes />}>
                        <Route path="/paginaInicialProf" element={<ProfessorHome menuItems={menuItemsProf} />} />
                        <Route path="/perfilProf" element={<UserAccount menuItems={menuItemsProf}/>}/>
                    </Route>

                    <Route element={<PrivateSTUDRoutes />}>
                        <Route path="/paginaInicial" element={<StudentHome menuItems={menuItemsStud} />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </div>
    )
}