import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import "cally";
import { serviceEditSchema } from "../../validation/service";
import type { Service } from "../../models/service";
import { deleteService, updateService } from "../../services/apiServices";
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";

type FormServiceEditProps = {
    service?: Service;
    onClose?: () => void;
    onReset?: () => void;
}

export default function FormServiceEdit({ service, onClose, onReset }: FormServiceEditProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { user } = useAuth();

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
            resolved_by: service.resolved_by || undefined,
            resolved_at: service.resolved_at || undefined,
            resolution: service.resolution || undefined
        } : undefined
    });

    useEffect(() => {
        if (service) {
            reset({
                id: service.id,
                status: service.status as 'open' | 'in_progress' | 'closed',
                resolved_by: service.resolved_by || undefined,
                resolved_at: service.resolved_at || undefined,
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
                if (data.resolved_by) update.resolved_by = data.resolved_by;
                if (data.resolved_at) update.resolved_at = data.resolved_at;
                if (data.resolution) update.resolution = data.resolution;
            }

            if (user?.id) {
                update.last_modify_by = user.id;
            }
            update.updated_at = new Date().toISOString().split('T')[0];

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

    const onDelete = async (id: string) => {
        try {
            await deleteService(id);
            toast.success('Chamado excluído com sucesso');
            reset();
            onReset?.();
            onClose?.();
        } catch (error) {
            console.error(error);
            toast.error('Erro ao excluir chamado');
        }
    }

    return (
        <dialog ref={dialogRef} id="service-form-edit" className="modal" onClose={() => onClose?.()}>
            <form className="modal-box card bg-base-100 shadow-xl p-6 gap-4 border border-base-200 w-96 mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
                <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
                    reset();
                    onReset?.();
                    dialogRef.current?.close();
                }}>✕</button>

                <h2 className="text-2xl font-bold text-content">Editar Chamado</h2>
                <p className="text-sm text-content/50 mb-4">Pressione ESC ou clique fora da janela para fechar</p>                <Controller
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

                {statusValue == 'closed' && (
                    <>
                        <Controller
                            control={control}
                            name="resolved_by"
                            render={({ field, fieldState }) => (
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Quem Atendeu?</legend>
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
                            name="resolved_at"
                            render={({ field, fieldState }) => (
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Quando foi resolvido?</legend>
                                    <input
                                        {...field}
                                        type="date"
                                        className="input w-full"
                                        placeholder="Data de resolução do chamado"
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
                    </>
                )}

                <div className="justify-end card-actions mt-5">
                    <button type='button' className={`btn btn-soft btn-error mr-auto ${service?.opened_by !== user?.email ? 'hidden' : ''}`} onClick={() => onDelete(service?.id || '')}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button type="button" className="btn btn-secondary btn-outline" onClick={() => reset()}>Limpar</button>
                    <button type="submit" disabled={!isValid} className="btn btn-primary">Salvar</button>
                </div>
            </form>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
