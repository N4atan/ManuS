import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import "cally";
import { serviceCreateSchema } from "../../validation/service";
import type { ServiceStatusType } from "../../models/service";
import { createService } from "../../services/apiServices";
import toast from 'react-hot-toast';
import { useAuth } from "../../contexts/AuthContext";


export default function FormServiceCreate({ status, onReset }: { status: ServiceStatusType; onReset?: () => void }) {
    const { user } = useAuth();

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid }
    } = useForm({
        resolver: zodResolver(serviceCreateSchema),
        mode: 'all',
        defaultValues: {
            title: '',
            description: '',
            deadline: '',
            unit: undefined,
            location: '',
            opened_by: user?.email,
            status: status
        }
    });

    const onSubmit = async (data: z.infer<typeof serviceCreateSchema>) => {
        try {
            console.log('novo chamado', data);
            await createService(data);
            toast.success('Chamado criado com sucesso');
            reset();
            onReset?.();
            (document.getElementById('service-create-modal') as HTMLDialogElement)?.close();
        } catch (error) {
            console.error(error);
            toast.error('Erro ao criar chamado');
        }
    }

    const isMobile = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);

    return (
        <dialog id="service-create-modal" className="modal">
            <form className="modal-box card bg-base-100 shadow-xl p-6 gap-4 border border-base-200 w-96 mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
                {isMobile && (
                    <button type="button" className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
                        reset();
                        onReset?.();
                        (document.getElementById('service-create-modal') as HTMLDialogElement)?.close()
                    }}>✕</button>
                )}

                <h2 className="text-2xl font-bold text-content">Novo Chamado</h2>
                {!isMobile && (
                    <p className="text-sm text-content/50 mb-4">Pressione ESC ou clique fora da janela para fechar</p>
                )}


                <Controller
                    control={control}
                    name="title"
                    render={({ field, fieldState }) => (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Título do Chamado *</legend>
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
                            <legend className="fieldset-legend">Descrição do Chamado *</legend>
                            <textarea {...field} className="textarea h-24 w-full" placeholder="Descreva o problema ou solicitação do chamado"></textarea>
                            {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                        </fieldset>
                    )}
                />

                <Controller
                    control={control}
                    name="deadline"
                    render={({ field, fieldState }) => (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Prazo do Chamado</legend>
                            <input {...field} type="date" className="input w-full" placeholder="Prazo do chamado" />
                            {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                        </fieldset>
                    )}
                />

                <Controller
                    control={control}
                    name="unit"
                    render={({ field, fieldState }) => (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Unidade *</legend>
                            <select {...field} className="select w-full" value={field.value || ""}>
                                <option disabled value="">Selecione a Unidade</option>
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
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Localização *</legend>
                            <input {...field} type="text" className="input w-full" placeholder="Localização (sala/setor)" />
                            {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                        </fieldset>
                    )}
                />

                <Controller
                    control={control}
                    name="opened_by"
                    render={({ field, fieldState }) => (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Solicitante</legend>
                            <input {...field} type="text" className="input w-full" disabled />
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
