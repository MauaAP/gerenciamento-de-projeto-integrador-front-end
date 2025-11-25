import { useState } from "react"
import { useForm, type SubmitHandler, } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { authUser } from "../../api/repository/user/authUser"
import Button from "../../components/button"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { ILoginFormSchema, type ILoginForm } from "../../services/loginValidation"
import type { TokenInterface } from "../../services/interface/TokenInterface";

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginForm>({
    resolver: zodResolver(ILoginFormSchema)
  })

  const onSubmit: SubmitHandler<ILoginForm> = (data) => handleSubmitData(data)

  async function handleSubmitData(data: ILoginForm) {
    setIsLoading(true)
    try {
      await authUser(data)

      const tokenData = jwtDecode<TokenInterface>(localStorage.getItem('token')!)

      switch (tokenData.role) {
        case 'ADMIN':
          navigate('/paginaInicialADM');
          break;

        case 'MODERATOR':
          navigate('/paginaInicialMod');
          break;

        case 'PROFESSOR':
          navigate('/paginaInicialProf');
          break;

        default:
          navigate('/paginaInicial');
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex md:flex-row h-screen truncate flex-col w-full mx-auto">
      <section className="md:w-1/2 h-screen w-full">
        <img className="h-screen w-full object-cover" src="./images/fundo.png" alt="foto campus maua" />
      </section>
      <section className="flex justify-center items-center w-full md:w-1/2 h-screen absolute md:static">
        <div className=" bg-white absolute rounded-xl md:rounded-none sm:max-w-md max-w-xs md:px-5 lg:px-0">
          <form onSubmit={handleSubmit(onSubmit)} className="ml-1 mr-1 sm:ml-0 sm:mr-0 flex flex-col justify-center md:h-screen px-3 md:px-0 gap-3 py-5 md:py-0">
            <h2 className="mb-5 text-sm sm:text-lg md:text-xl font-semibold ">Sistema Gerenciador de Projeto Integrador</h2>
            <label htmlFor="email" className="-mb-2 md:text-md text-sm">Email</label>
            <input
              type="email"
              {...register("email")}
              className="p-3 shadow-lg/30 inset-shadow-sm rounded-sm"
              placeholder="Insira seu email"
            />
            {errors?.email && <span className="-mt-1 text-xs text-red-500">{errors.email.message}</span>}
            <label htmlFor="password" className="mt-1 -mb-2 md:text-md text-sm">Senha</label>
            <input
              type="password"
              {...register("password")}
              className="p-3 shadow-lg/30 inset-shadow-sm rounded-sm"
              placeholder="Insira sua senha"
            />
            {errors?.password && <span className="-mt-1 text-xs text-red-500">{errors.password.message}</span>}
            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              className="flex justify-center mt-4 p-3 bg-blue-500/70 text-white text-md w-1/5 rounded-sm hover:bg-blue-500 cursor-pointer"
            >
              Entrar
            </Button>
            <main className="flex justify-center">
              <img src="./images/logo_maua.png" alt="logo maua" className="mt-4 w-1/4" />
            </main>
          </form>
        </div>
      </section>
    </main>
  )
}
