import { z } from "zod";

// schema usado quando estamos criando um novo chamado
export const serviceCreateSchema = z.object({
    id: z.string().optional(),

    // Informações da Tarefa
    title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
    description: z.string().min(1, "A descrição é obrigatória"),
    // datas são strings para evitar conflitos de serialização
    deadline: z.string().optional(),

    unit: z.string().min(1, "A unidade (unidade Senac) é obrigatória"),
    location: z.string().min(1, "O local (sala/setor) é obrigatório"),

    status: z.enum(["open", "in_progress", "closed"]).default("open"),
    resolution: z.string().optional(),

    opened_by: z.string("E-mail de abertura inválido"),
    closed_by: z.string().optional().nullable(),

    created_at: z.string().default(() => new Date().toISOString()),
    closed_at: z.string().optional().nullable(),
});

// schema para edição: apenas os campos que realmente podem ser mudados
export const serviceEditSchema = z.object({
    id: z.string(),
    status: z.enum(["open", "in_progress", "closed"]),
    closed_by: z.string().optional().nullable(),
    closed_at: z.string().optional().nullable(),
    resolution: z.string().optional(),
});

// Tipos gerados pelos schemas
export type ServiceCreate = z.infer<typeof serviceCreateSchema>;
export type ServiceEdit = z.infer<typeof serviceEditSchema>;
export type Service = ServiceCreate & Partial<ServiceEdit>;
