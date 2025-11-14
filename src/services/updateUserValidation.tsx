import z from "zod";

export const IUpdateUserFormSchema= z.object({
    nome: z.string().min(2, {message: "Nome deve conter pelo menos 2 caracteres"}).optional(),
    
    email: z.email(
        {message: "Endereço de e-mail inválido"}
    ).refine((email) => email.endsWith("@maua.br"), {message: "O e-mail deve ser um email institucional @maua.br"}).optional(),

    password: z.string().min(6, {message: "Senha deve conter pelo menos 6 caracteres"}).optional()
})

export type IUpdateUserForm = z.infer<typeof IUpdateUserFormSchema>;