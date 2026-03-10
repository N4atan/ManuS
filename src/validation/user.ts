import { z } from "zod";
import { userRole } from "../models/user";


export const userBaseSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    role: z.enum([userRole.Administrativo, userRole.TI, userRole.Manutencao], {
        message: "O tipo de permissão é obrigatório"
    }),
});

export type UserEdit = z.infer<typeof userBaseSchema>;
