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
                                        <p className="text-gray-600">Gerencie suas informações pessoais</p>
                                    </div>
                                </div>
                            </div>
        
                            {/* Form Content */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Informações Pessoais */}
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10 mt-5">
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
                                            {/* <div className="relative">
                                            <input
                                                type="text"
                                                name="nome"
                                                value={formData.nome}
                                                onChange={handleInputChange}
                                                placeholder={nomeP || "Digite seu nome completo"}
                                                disabled={!isEditing}
                                                className={`w-full px-4 py-3 pl-12 rounded-xl border-2 transition-colors ${
                                                    isEditing 
                                                        ? 'border-gray-200 focus:border-maua-blue focus:outline-none' 
                                                        : 'border-gray-100 bg-gray-50'
                                                }`}
                                            />
                                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div> */}
                                            {name && (
                                                <p className="text-sm text-gray-500 mt-1">Atual: {name}</p>
                                            )}
                                        </div>
        
                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            {/* <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder={emailP || "Digite seu email"}
                                                disabled={!isEditing}
                                                className={`w-full px-4 py-3 pl-12 rounded-xl border-2 transition-colors ${
                                                    isEditing 
                                                        ? 'border-gray-200 focus:border-maua-blue focus:outline-none' 
                                                        : 'border-gray-100 bg-gray-50'
                                                } ${!emailValido && formData.email ? 'border-red-500' : ''}`}
                                            />
                                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div> */}
                                            {email && (
                                                <p className="text-sm text-gray-500 mt-1">Atual: {email}</p>
                                            )}
                                            {/* {!emailValido && formData.email && (
                                            <p className="text-sm text-red-500 mt-1">Email inválido</p>
                                        )} */}
        
                                        </div>
        
                                        {/* CPF */}
                                        {/* <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            CPF
                                        </label>
                                        <div className="relative">
                                            <InputMask
                                                mask="999.999.999-99"
                                                value={formData.cpf}
                                                onChange={handleCpfChange}
                                                placeholder={cpfP || "Digite seu CPF"}
                                                disabled={!isEditing}
                                                className={`w-full px-4 py-3 pl-12 rounded-xl border-2 transition-colors ${
                                                    isEditing 
                                                        ? 'border-gray-200 focus:border-maua-blue focus:outline-none' 
                                                        : 'border-gray-100 bg-gray-50'
                                                }`}
                                            />
                                            <FaIdCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        {cpfP && (
                                            <p className="text-sm text-gray-500 mt-1">Atual: {cpfP}</p>
                                        )}
                                    </div> */}
        
                                        {/* Telefone
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Telefone
                                        </label>
                                        <div className="relative">
                                            <InputMask
                                                mask="(99) 99999-9999"
                                                value={formData.phone}
                                                onChange={handlePhoneChange}
                                                placeholder={phone || "Digite seu telefone"}
                                                disabled={!isEditing}
                                                className={`w-full px-4 py-3 pl-12 rounded-xl border-2 transition-colors ${
                                                    isEditing 
                                                        ? 'border-gray-200 focus:border-maua-blue focus:outline-none' 
                                                        : 'border-gray-100 bg-gray-50'
                                                }`}
                                            />
                                            <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        {phone && (
                                            <p className="text-sm text-gray-500 mt-1">Atual: {phone}</p>
                                        )}
                                    </div> */}
                                    </form>
                                </div>
        
                                {/* Alteração de Senha */}
                                {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-br from-maua-orange to-maua-orange-hover rounded-lg flex items-center justify-center">
                                            <FaLock className="text-white" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">Alterar Senha</h2>
                                    </div>
        
                                    <div className="space-y-6">
                                        {/* Senha Anterior
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Senha Atual
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPasswords.anterior ? "text" : "password"}
                                                    name="senhaAnterior"
                                                    value={formData.senhaAnterior}
                                                    onChange={handleInputChange}
                                                    placeholder="Digite sua senha atual"
                                                    disabled={!isEditing}
                                                    className={`w-full px-4 py-3 pl-12 pr-12 rounded-xl border-2 transition-colors ${isEditing
                                                            ? 'border-gray-200 focus:border-maua-blue focus:outline-none'
                                                            : 'border-gray-100 bg-gray-50'
                                                        }`}
                                                />
                                                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                {isEditing && (
                                                    <button
                                                        type="button"
                                                        onClick={() => togglePasswordVisibility('anterior')}
                                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPasswords.anterior ? <FaEyeSlash /> : <FaEye />}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
        
                                        {/* Nova Senha
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nova Senha
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPasswords.nova ? "text" : "password"}
                                                    name="novaSenha"
                                                    value={formData.novaSenha}
                                                    onChange={handleInputChange}
                                                    placeholder="Digite sua nova senha"
                                                    disabled={!isEditing}
                                                    className={`w-full px-4 py-3 pl-12 pr-12 rounded-xl border-2 transition-colors ${isEditing
                                                            ? 'border-gray-200 focus:border-maua-blue focus:outline-none'
                                                            : 'border-gray-100 bg-gray-50'
                                                        }`}
                                                />
                                                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                {isEditing && (
                                                    <button
                                                        type="button"
                                                        onClick={() => togglePasswordVisibility('nova')}
                                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPasswords.nova ? <FaEyeSlash /> : <FaEye />}
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
                                        </div>
        
                                        {!isEditing && (
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <p className="text-sm text-blue-800">
                                                    <strong>Dica:</strong> Para alterar sua senha, clique em "Editar Perfil" e preencha os campos de senha.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
        </SlideBarContextProvider>
    )
}