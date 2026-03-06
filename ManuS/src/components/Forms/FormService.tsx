import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import "cally";
import { serviceCreateSchema, serviceEditSchema, type Service } from "../../validation/service";

type Props = {
    initialData?: Service;
}

export default function FormService({ initialData }: Props) {
    const isEditing = !!initialData;

    const schema = isEditing ? serviceEditSchema : serviceCreateSchema;

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid }
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'all',
        defaultValues: (initialData || {}) as any
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const onSubmitCreate = async (data: z.infer<typeof serviceCreateSchema>) => {
        try {
            console.log('novo chamado', data);
            alert("Chamado criado com sucesso");
        } catch (error) {
            console.error(error);
            alert("Erro ao criar chamado.");
        }
    }

    const onSubmitUpdate = async (data: z.infer<typeof serviceEditSchema>) => {
        try {
            const identifier = initialData?.id;
            if (!identifier) return alert("ID não passado para atualização");

            const update = {
                id: identifier,
                status: data.status,
                closed_by: data.closed_by,
                closed_at: data.closed_at,
                resolution: data.resolution,
            };
            console.log('atualizar chamado', update);
            alert("Chamado atualizado com sucesso");
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar chamado.");
        }
    }

    if (!isEditing) {
        return (
            <form id="service-form" className="card bg-base-100 shadow-xl p-6 gap-4 border border-base-200 w-96 mx-auto my-5" onSubmit={handleSubmit(onSubmitCreate)}>
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
                                <option value="Senac Uni">Senac Uni</option>
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
        );
    } else {
        return (
            <form id="service-form" className="card bg-base-100 shadow-xl p-6 gap-4 border border-base-200 w-96 mx-auto my-5" onSubmit={handleSubmit(onSubmitUpdate)}>
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
                                <option value="pending">Pendente</option>
                                <option value="in_progress">Em Andamento</option>
                                <option value="completed">Concluído</option>
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
                            <input {...field} type="text" className="input w-full" placeholder="Nome do usuário que atendeu o chamado" />
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
                            <input {...field} type="datetime-local" className="input w-full" placeholder="Data de fechamento do chamado" />
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
}