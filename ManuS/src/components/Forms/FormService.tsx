import { useForm } from "react-hook-form";
import { serviceCreateSchema, serviceEditSchema } from "../validation/service";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";

import "cally";

type Props = {
    isEditing?: boolean;
}

export default function FormService({isEditing = false}: Props) {
    const schema = isEditing ? serviceEditSchema : serviceCreateSchema;

    const {
        register,
        handleSubmit: submitHandler,
        reset,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'all',
    });

    const onSubmit = (data: any) => {
        if (isEditing) {
            // durante edição não permitimos alteração dos campos principais
            // apenas os campos de acompanhamento/status podem ser enviados
            const update = {
                status: data.status,
                closed_by: data.closed_by,
                closed_at: data.closed_at,
                resolution: data.resolution,
            };
            console.log('atualizar chamado', update);
        } else {
            // novo registro contém todos os campos do formulário
            console.log('novo chamado', data);
        }
    };

    return (
        <form onSubmit={submitHandler(onSubmit)} className="card bg-base-100 shadow-xl p-6 gap-4 border border-base-200 w-96 mx-auto my-5" >
            <h2 className="text-2xl font-bold text-primary mb-4">
                {isEditing ? 'Editar Chamado ManuS' : 'Novo Chamado ManuS'}
            </h2>

            {/* Campo de Título */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Titulo do Chamado</legend>
                {/* não permite editar título depois de criado */}
                <input disabled={isEditing} type="text" className="input" placeholder="Título do chamado" {...register('title')} />
                {errors.title && <p className="text-error">{errors.title.message}</p>}
            </fieldset>

            {/* Campo de Descrição */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Descrição do Chamado</legend>
                {/* durante edição não é possível alterar a descrição inicial */}
                <textarea disabled={isEditing} className="textarea h-24" placeholder="Descreva o problema ou solicitação do chamado" {...register('description')}></textarea>
                {errors.description && <p className="text-error">{errors.description.message}</p>}
            </fieldset>


            {/* Campo de Prazo */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Prazo do Chamado</legend>
                <input disabled={isEditing} type="datetime-local" className="input" placeholder="Prazo do chamado" {...register('deadline')} />
                {errors.deadline && <p className="text-error">{errors.deadline.message}</p>}
            </fieldset>

            {/* Campo de Unidade */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Unidade</legend>
                <select
                    disabled={isEditing}
                    defaultValue="Selecione a Unidade"
                    className="select"
                    {...register('unit')}
                >
                    <option disabled={true}>Selecione a Unidade</option>
                    <option>Senac Centro</option>
                    <option>Senac Uni</option>
                </select>
                {errors.unit && <p className="text-error">{errors.unit.message}</p>}
            </fieldset>

            {/* Campo de Localização */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Localização</legend>
                <input disabled={isEditing} type="text" className="input" placeholder="Localização (sala/setor)" {...register('location')} />
                {errors.location && <p className="text-error">{errors.location.message}</p>}
            </fieldset>

            {/* Campo de Identificação de quem Abriu */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Identificação de quem Abriu</legend>
                <input disabled={isEditing} type="text" className="input" placeholder="Nome do usuário que abriu o chamado" {...register('opened_by')} />
                {errors.opened_by && <p className="text-error">{errors.opened_by.message}</p>}
            </fieldset>

            {/* edição: título "status" e acompanhamento só aparecem em modo edição */}
            <div className={isEditing ? '' : 'hidden'}>
                {/* Campo de Status */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Status</legend>
                    <select disabled={!isEditing} defaultValue="pending" className="select" {...register('status')}>
                        <option value={'pending'}>Pendente</option>
                        <option value={'in_progress'}>Em Andamento</option>
                        <option value={'completed'}>Concluído</option>
                    </select>
                    {errors.status && <p className="text-error">{errors.status.message}</p>}
                </fieldset>

                {/* Campo de Identificação de quem atendeu */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Identificação de quem Atendeu</legend>
                    <input disabled={!isEditing} type="text" className="input" placeholder="Nome do usuário que atendeu o chamado" {...register('closed_by')} />
                    {errors.closed_by && <p className="text-error">{errors.closed_by.message}</p>}
                </fieldset>

                {/* Campo de Data de Fechamento */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Data de Fechamento</legend>
                    <input disabled={!isEditing} type="datetime-local" className="input" placeholder="Data de fechamento do chamado" {...register('closed_at')} />
                    {errors.closed_at && <p className="text-error">{errors.closed_at.message}</p>}
                </fieldset>

                {/* Campo de Descrição */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Descrição do Chamado</legend>
                    <textarea disabled={!isEditing} className="textarea h-24" placeholder="Descreva o que foi feito para resolver o chamado" {...register('resolution')}></textarea>
                    {errors.resolution && <p className="text-error">{errors.resolution.message}</p>}
                </fieldset>
            </div>

            <div className="justify-end card-actions mt-5">
                <button type="button" className="btn btn-secondary" onClick={() => reset()}>Limpar</button>
                <button type="submit" disabled={!isValid} className="btn btn-primary">Salvar</button>
            </div>
        </form>
    );
}