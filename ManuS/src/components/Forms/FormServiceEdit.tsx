import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import "cally";
import { serviceEditSchema } from "../../validation/service";
import type { Service } from "../../models/service";

type FormServiceEditProps = {
    service?: Service;
    onClose?: () => void;
}

export default function FormServiceEdit({ service, onClose }: FormServiceEditProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid }
    } = useForm({
        resolver: zodResolver(serviceEditSchema),
        mode: 'all',
        defaultValues: service ? {
            id: service.id,
            status: service.status as 'open' | 'in_progress' | 'closed',
            closed_by: service.closed_by || undefined,
            closed_at: service.closed_at || undefined,
            resolution: service.resolution || undefined
        } : undefined
    });

    useEffect(() => {
        if (service) {
            reset({
                id: service.id,
                status: service.status as 'open' | 'in_progress' | 'closed',
                closed_by: service.closed_by || undefined,
                closed_at: service.closed_at || undefined,
                resolution: service.resolution || undefined
            });
        }
    }, [service, reset]);

    const onSubmit = async (data: z.infer<typeof serviceEditSchema>) => {
        try {
            const update = {
                id: data.id,
                status: data.status,
                closed_by: data.closed_by,
                closed_at: data.closed_at,
                resolution: data.resolution,
            };
            console.log('atualizar chamado', update);
            alert("Chamado atualizado com sucesso");
            onClose?.();
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar chamado.");
        }
    }

    if (!service) return null;

    return (
        <form id="service-edit-form" className="card bg-base-100 shadow-xl p-6 gap-4 border border-base-200 w-96 mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold text-primary mb-4">Editar Chamado ManuS</h2>

            <Controller
                control={control}
                name="id"
                render={({ field }) => (
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">ID do Chamado</legend>
                        <input {...field} type="text" className="input w-full" readOnly />
                    </fieldset>
                )}
            />

            <Controller
                control={control}
                name="status"
                render={({ field, fieldState }) => (
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Status *</legend>
                        <select {...field} className="select w-full">
                            <option value="open">Pendente</option>
                            <option value="in_progress">Em Andamento</option>
                            <option value="closed">Concluído</option>
                        </select>
                        {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                    </fieldset>
                )}
            />

            <Controller
                control={control}
                name="closed_by"
                render={({ field, fieldState }) => (
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Identificação de quem Atendeu</legend>
                        <input 
                            {...field} 
                            type="text" 
                            className="input w-full" 
                            placeholder="Nome do usuário que atendeu o chamado"
                            value={field.value ?? ''}
                        />
                        {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                    </fieldset>
                )}
            />

            <Controller
                control={control}
                name="closed_at"
                render={({ field, fieldState }) => (
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Data de Fechamento</legend>
                        <input 
                            {...field} 
                            type="datetime-local" 
                            className="input w-full" 
                            placeholder="Data de fechamento do chamado"
                            value={field.value ?? ''}
                        />
                        {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                    </fieldset>
                )}
            />

            <Controller
                control={control}
                name="resolution"
                render={({ field, fieldState }) => (
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Resolução</legend>
                        <textarea {...field} className="textarea h-24 w-full" placeholder="Descreva o que foi feito para resolver o chamado"></textarea>
                        {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                    </fieldset>
                )}
            />

            <div className="justify-end card-actions mt-5">
                <button type="button" className="btn btn-secondary" onClick={() => reset()}>Limpar</button>
                <button type="submit" disabled={!isValid} className="btn btn-primary">Salvar</button>
            </div>
        </form>
    );
}
