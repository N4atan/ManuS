import { zodResolver } from "@hookform/resolvers/zod";
import { userBaseSchema, type UserEdit } from "../../validation/user";
import { useForm, Controller } from "react-hook-form";
import { userRole, type User } from "../../models/user";
import { updateUser, createUser } from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useEffect } from "react";


type FormUserProps = {
    user?: User;
    onClose?: () => void;
}

export default function FormUser({ user, onClose }: FormUserProps) {
    const isEditing = !!user?.id;

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid }
    } = useForm<UserEdit>({
        resolver: zodResolver(userBaseSchema),
        mode: 'all',
        defaultValues: {
            id: user?.id || '',
            name: user?.name || '',
            email: user?.email || '',
            role: (user?.role || undefined) as any
        }
    });

    // Populate form fields whenever the selected user changes
    useEffect(() => {
        if (user) {
            reset({
                id: user.id,
                name: user.name,
                email: user.email,
                role: (user.role || undefined) as any
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: UserEdit) => {
        try {
            if (isEditing) {
                await updateUser(data.id!, data);
                toast.success('Usuário atualizado com sucesso!');
            } else {
                const { id, ...userData } = data;
                await createUser(userData);
                toast.success('Usuário criado com sucesso!');
            }
            reset();
            onClose?.();
        } catch (error) {
            toast.error(isEditing ? 'Erro ao atualizar usuário' : 'Erro ao criar usuário');
            console.error(error);
        }
    }



    return (
        <dialog id="form-user" className={`modal ${user ? "modal-open" : ""}`} onClose={() => onClose?.()}>
            <form className="modal-box card bg-base-100 shadow-xl p-6 gap-4 border border-base-200 w-96 mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>

                <h2 className="text-2xl font-bold text-content">{isEditing ? "Editar Usuário" : "Novo Usuário"}</h2>
                <p className="text-sm text-content/50 mb-4">Pressione ESC ou clique fora da janela para fechar</p>

                <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Nome Completo</legend>
                            <input {...field} type="text" className="input w-full" placeholder="Nome do usuário" />
                            {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                        </fieldset>
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">E-mail</legend>
                            <input {...field} type="email" className="input w-full" placeholder="Email do usuário" />
                            {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                        </fieldset>
                    )}
                />

                <Controller
                    control={control}
                    name="role"
                    render={({ field, fieldState }) => (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Tipo de Permissão</legend>
                            <select {...field} className="select w-full" value={field.value || ""}>
                                <option value="">Selecione</option>
                                <option value={userRole.Administrativo}>Administrativo</option>
                                <option value={userRole.Manutencao}>Manutenção</option>
                                <option value={userRole.TI}>TI</option>
                            </select>
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