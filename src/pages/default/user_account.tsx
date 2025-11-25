import { useEffect, useState } from "react";
import type { UserInterface } from "../../services/interface/UserInterface";
import { FaUser } from "react-icons/fa";
import { SlideBarContextProvider } from "../../contexts/slideBarContext";
import NavBar from "../../components/navBar";
import type { MenuItems } from "../../services/menuItems";

export default function UserAccount({ menuItems }: { menuItems: MenuItems[] }) {
    // const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');


    useEffect(() => {
        try{
            const storedUser= localStorage.getItem('user')
    
            if (storedUser){

                const user: UserInterface= JSON.parse(storedUser)
    
                if (user.name){
                    setName(user.name)
                }
                else {
                    console.log("user name not found")
                    setName("Desconhecido")
                }
                
                if (user.email){
                    setEmail(user.email)
                }
                else {
                    console.log("user email not found")
                    setEmail("Desconhecido@maua.br")
                }
            }
        }
        catch (e){
            console.log(`erro para pegar o usuario do token, ${e}`)
        }

    }, [])

    

    return (
        <SlideBarContextProvider>
                <NavBar menuItems={menuItems} />
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-5">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-900/60 to-blue-300 rounded-full flex items-center justify-center shadow-lg">
                                        <FaUser className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
                                        {/* <p className="text-gray-600">Gerencie suas informações pessoais</p> */}
                                    </div>
                                </div>
                            </div>
                        </div> {/* <-- 1. FECHEI O CARD DO HEADER AQUI */}
        
                        {/* Form Content 
                            2. AJUSTEI O GRID PARA CENTRALIZAR O FILHO (justify-items-center)
                               E REMOVI O 'lg:grid-cols-2' PARA FICAR UMA COLUNA SÓ
                        */}
                        <div className="grid grid-cols-1 gap-8 justify-items-center">
                            {/* Informações Pessoais 
                                3. ADICIONEI 'w-full' E 'lg:max-w-xl' PARA CONTROLAR A LARGURA
                                   DO CARD E ELE NÃO ESTICAR DEMAIS NO COMPUTADOR
                            */}
                            <div className="w-full lg:max-w-xl bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10 mt-5">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-900/60 to-blue-300 rounded-lg flex items-center justify-center">
                                        <FaUser className="text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Informações Pessoais</h2>
                                </div>
    
                                <form className="space-y-6">
                                    {/* Nome */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nome Completo
                                        </label>
                                        {/* <div className="relative"> ... </div> */}
                                        {name && (
                                            <p className="text-sm text-gray-500 mt-1">{name}</p>
                                        )}
                                    </div>
    
                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        {/* <div className="relative"> ... </div> */}
                                        {email && (
                                            <p className="text-sm text-gray-500 mt-1">{email}</p>
                                        )}
                                        {/* {!emailValido && formData.email && (...) } */}
                                    </div>
    
                                    {/* CPF */}
                                    {/* <div> ... </div> */}
    
                                    {/* Telefone */}
                                    {/* <div> ... </div> */}
                                </form>
                            </div>
    
                            {/* Alteração de Senha (Comentado) */}
                            {/* <div className="bg-white ..."> ... </div> */}
                        </div>
                    </div>
                </div>
        </SlideBarContextProvider>
    )
}