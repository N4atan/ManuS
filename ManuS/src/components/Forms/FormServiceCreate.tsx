import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import "cally";
import { serviceCreateSchema } from "../../validation/service";

export default function FormServiceCreate() {
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
            unit: '',
            location: '',
            opened_by: '',
            status: 'open'
        }
    });

    const onSubmit = async (data: z.infer<typeof serviceCreateSchema>) => {
        try {
            console.log('novo chamado', data);
            alert("Chamado criado com sucesso");
            reset();
            (document.getElementById('service-create-modal') as HTMLDialogElement)?.close();
        } catch (error) {
            console.error(error);
            alert("Erro ao criar chamado.");
        }
    }

    return (
        <dialog id="service-create-modal" className="modal">
            <form className="modal-box card bg-base-100 shadow-xl p-6 gap-4 border border-base-200 w-96 mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold text-primary mb-4">Novo Chamado ManuS</h2>

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
                            <input {...field} type="datetime-local" className="input w-full" placeholder="Prazo do chamado" />
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
                            <select {...field} className="select w-full">
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
                            <legend className="fieldset-legend">Identificação de quem Abriu *</legend>
                            <input {...field} type="text" className="input w-full" placeholder="Nome do usuário que abriu o chamado" />
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
