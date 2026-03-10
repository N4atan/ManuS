import { z } from "zod";
import { ServiceStatus } from "../models/service";

export const serviceBaseSchema = z.object({
    id: z.string(),
    title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
    description: z.string().min(1, "A descrição é obrigatória"),
    deadline: z.string().optional().nullable(),
    unit: z.enum(["Senac Centro", "Senac Unisinos"], {
        message: "A unidade é obrigatória"
    }),
    location: z.string().min(1, "O local (sala/setor) é obrigatório"),
    status: z.enum([ServiceStatus.Open, ServiceStatus.InProgress, ServiceStatus.Closed], {
        message: "O status é obrigatório"
    }),
    resolution: z.string().optional().nullable(),
    opened_by: z.string().optional().nullable(),
    resolved_by: z.string().optional().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    resolved_at: z.string().optional().nullable(),
    last_modify_by: z.string().optional().nullable()
});

export type ServiceBase = z.infer<typeof serviceBaseSchema>;

// schema usado quando estamos criando um novo chamado
export const serviceCreateSchema = z.object({
    id: z.string().optional(),

    // Informações da Tarefa
    title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
    description: z.string().min(1, "A descrição é obrigatória"),
    // datas são strings para evitar conflitos de serialização
    deadline: z.string().optional(),

    unit: z.enum(["Senac Centro", "Senac Unisinos"], {
        message: "A unidade é obrigatória"
    }),
    location: z.string().min(1, "O local (sala/setor) é obrigatório"),

    status: z.enum([ServiceStatus.Open, ServiceStatus.InProgress, ServiceStatus.Closed]).default(ServiceStatus.Open),
    resolution: z.string().optional(),

    opened_by: z.string("E-mail de abertura inválido"),
    closed_by: z.string().optional().nullable(),

    created_at: z.string().default(() => new Date().toISOString()),
    closed_at: z.string().optional().nullable(),
});

// schema para edição: apenas os campos que realmente podem ser mudados
export const serviceEditSchema = z.object({
    id: z.string(),
    status: z.enum([ServiceStatus.Open, ServiceStatus.InProgress, ServiceStatus.Closed]),
    resolved_by: z.string().optional().nullable(),
    resolved_at: z.string().optional().nullable(),
    resolution: z.string().optional(),
}).refine(data => {
    // Se o status for concluído, os campos de resolução são obrigatórios
    if (data.status === "closed") {
        return !!data.resolved_by && !!data.resolved_at;
    }
    return true;
}, {
    message: "Preencha quem atendeu e a data ao concluir o chamado",
    path: ["status"] // Define onde o erro aparecerá no formulário
});

// Tipos gerados pelos schemas
export type ServiceCreate = z.infer<typeof serviceCreateSchema>;
export type ServiceEdit = z.infer<typeof serviceEditSchema>;
export type Service = ServiceCreate & Partial<ServiceEdit>;

