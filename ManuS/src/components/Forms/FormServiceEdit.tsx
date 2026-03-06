import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import "cally";
import { serviceEditSchema } from "../../validation/service";
import type { Service } from "../../models/service";
import { updateService } from "../../services/apiServices";
import toast from 'react-hot-toast';

type FormServiceEditProps = {
    service?: Service;
    onClose?: () => void;
    onReset?: () => void;
}

export default function FormServiceEdit({ service, onClose, onReset }: FormServiceEditProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const {
        control,
        handleSubmit,
        reset,
        watch,
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
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [service, reset]);

    const statusValue = watch('status');

    const onSubmit = async (data: z.infer<typeof serviceEditSchema>) => {
        try {
            // Build update object - only include closure fields if status is "closed"
            const update: Partial<Record<string, string>> = {
                status: data.status,
            };
            
            if (data.status === 'closed') {
                if (data.closed_by) update.closed_by = data.closed_by;
                if (data.closed_at) update.closed_at = data.closed_at;
                if (data.resolution) update.resolution = data.resolution;
            }
            
            console.log('atualizar chamado', update);
            await updateService(data.id, update as Partial<Service>);
            toast.success('Chamado atualizado com sucesso');
            reset();
            onReset?.();
            onClose?.();
        } catch (error) {
            console.error(error);
            toast.error('Erro ao atualizar chamado');
        }
    }

    return (
        <dialog ref={dialogRef} id="service-form-edit" className="modal" onClose={() => onClose?.()}>
            <form className="modal-box card bg-base-100 shadow-xl p-6 gap-4 border border-base-200 w-96 mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold text-primary mb-4">Editar Chamado ManuS</h2>

                <Controller
                    control={control}
                    name="id"
                    render={({ field }) => (
                        <fieldset className="fieldset" disabled>
                            <legend className="fieldset-legend">ID do Chamado</legend>
                            <input {...field} type="text" className="input w-full " readOnly />
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
                                disabled={statusValue !== 'closed'}
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
                                type="date"
                                className="input w-full"
                                placeholder="Data de fechamento do chamado"
                                value={field.value ?? ''}
                                disabled={statusValue !== 'closed'}
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
                            <textarea {...field} className="textarea h-24 w-full" placeholder="Descreva o que foi feito para resolver o chamado" disabled={statusValue !== 'closed'}></textarea>
                            {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                        </fieldset>
                    )}
                />

                <div className="justify-end card-actions mt-5">
                    <button type="button" className="btn btn-secondary" onClick={() => reset()}>Limpar</button>
                    <button type="submit" disabled={!isValid} className="btn btn-primary">Salvar</button>
                </div>
            </form>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
