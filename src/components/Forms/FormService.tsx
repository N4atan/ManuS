import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceStatus, type Service } from "../../models/service";
import { serviceBaseSchema, type ServiceBase } from "../../validation/service";
import { useForm, Controller } from "react-hook-form";
import { updateService } from "../../services/apiServices";
import toast from "react-hot-toast";
import { useEffect } from "react";


type FormServiceProps = {
    service?: Service;
    onClose?: () => void;
}

export default function FormService({ service, onClose }: FormServiceProps) {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { isValid }
    } = useForm<ServiceBase>({
        resolver: zodResolver(serviceBaseSchema),
        mode: 'all',
        defaultValues: {
            id: service?.id || '',
            title: service?.title || '',
            description: service?.description || '',
            deadline: service?.deadline || '',
            unit: service?.unit || 'Senac Centro',
            location: service?.location || '',
            status: service?.status || ServiceStatus.Open,
            resolution: service?.resolution || '',
            resolved_by: service?.resolved_by || '',
            resolved_at: service?.resolved_at || '',
            opened_by: service?.opened_by || '',
            created_at: service?.created_at || new Date().toISOString(),
            updated_at: service?.updated_at || new Date().toISOString(),
            last_modify_by: service?.last_modify_by || ''
        } as any
    });

    const currentStatus = watch("status");

    // Populate form fields whenever the selected service changes
    useEffect(() => {
        if (service) {
            reset({
                id: service.id,
                title: service.title,
                description: service.description,
                deadline: service.deadline || '',
                unit: service.unit,
                location: service.location,
                status: service.status,
                resolution: service.resolution || '',
                resolved_by: service.resolved_by || '',
                resolved_at: service.resolved_at || '',
                opened_by: service.opened_by || '',
                created_at: service.created_at,
                updated_at: service.updated_at,
                last_modify_by: service.last_modify_by || ''
            } as any);
        }
    }, [service, reset]);

    const onSubmit = async (data: ServiceBase) => {
        try {
            await updateService(data.id, data);
            toast.success('Chamado atualizado com sucesso!');
            reset();
            onClose?.();
        } catch (error) {
            toast.error('Erro ao atualizar chamado');
            console.error(error);
        }
    }



    return (
        <dialog id="form-service" className={`modal ${service ? "modal-open" : ""}`} onClose={() => onClose?.()}>
            <form className="modal-box card bg-base-100 shadow-xl p-6 gap-4 border border-base-200 w-[500px] max-w-full mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>

                <h2 className="text-2xl font-bold text-content">Atualizar Chamado</h2>
                <p className="text-sm text-content/50 mb-4">Pressione ESC ou clique fora da janela para fechar</p>

                <Controller
                    control={control}
                    name="title"
                    render={({ field, fieldState }) => (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Título</legend>
                            <input {...field} type="text" className="input w-full" placeholder="Título do chamado" />
                            {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                        </fieldset>
                    )}
                />

                <Controller
                    control={control}
                    name="description"
                    render={({ field, fieldState }) => (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Descrição</legend>
                            <textarea {...field} className="textarea w-full h-24" placeholder="Descrição do problema" />
                            {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                        </fieldset>
                    )}
                />

                <div className="flex gap-4">
                    <Controller
                        control={control}
                        name="unit"
                        render={({ field, fieldState }) => (
                            <fieldset className="fieldset w-1/2">
                                <legend className="fieldset-legend">Unidade</legend>
                                <select {...field} className="select w-full" value={field.value || ""}>
                                    <option value="Senac Centro">Senac Centro</option>
                                    <option value="Senac Unisinos">Senac Unisinos</option>
                                </select>
                                {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                            </fieldset>
                        )}
                    />

                    <Controller
                        control={control}
                        name="location"
                        render={({ field, fieldState }) => (
                            <fieldset className="fieldset w-1/2">
                                <legend className="fieldset-legend">Local/Setor</legend>
                                <input {...field} type="text" className="input w-full" placeholder="Ex: Sala 201" />
                                {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                            </fieldset>
                        )}
                    />
                </div>

                <Controller
                    control={control}
                    name="deadline"
                    render={({ field, fieldState }) => (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Prazo (Deadline)</legend>
                            <input {...field} type="date" className="input w-full" value={field.value || ''} />
                            {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                        </fieldset>
                    )}
                />

                <Controller
                    control={control}
                    name="status"
                    render={({ field, fieldState }) => (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Status</legend>
                            <select {...field} className="select w-full" value={field.value || ""}>
                                <option value={ServiceStatus.Open}>Aberto</option>
                                <option value={ServiceStatus.InProgress}>Em Andamento</option>
                                <option value={ServiceStatus.Closed}>Concluído</option>
                            </select>
                            {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                        </fieldset>
                    )}
                />

                {currentStatus === ServiceStatus.Closed && (
                    <>
                        <Controller
                            control={control}
                            name="resolved_by"
                            render={({ field, fieldState }) => (
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Resolvido por</legend>
                                    <input {...field} type="text" className="input w-full" placeholder="Nome do atendente" value={field.value || ''} />
                                    {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                                </fieldset>
                            )}
                        />

                        <Controller
                            control={control}
                            name="resolved_at"
                            render={({ field, fieldState }) => (
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Data da Resolução</legend>
                                    <input {...field} type="date" className="input w-full" value={field.value || ''} />
                                    {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                                </fieldset>
                            )}
                        />
                    </>
                )}

                <Controller
                    control={control}
                    name="resolution"
                    render={({ field, fieldState }) => (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Detalhes da Resolução</legend>
                            <textarea {...field} className="textarea w-full h-24" placeholder="Detalhes de como o chamado foi resolvido" value={field.value || ''} />
                            {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                        </fieldset>
                    )}
                />

                <div className="justify-end card-actions mt-5">
                    <button type="button" className="btn btn-secondary btn-outline" onClick={() => reset()}>Desfazer</button>
                    <button type="submit" disabled={!isValid} className="btn btn-primary">Salvar</button>
                </div>
            </form>
            
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => onClose?.()}>close</button>
            </form>
        </dialog>
    )
}