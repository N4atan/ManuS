
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props<T> = {
    // T[] aceita um array de qualquer tipo de objeto (Services, Users, etc)
    array: T[];
    // Garante que as strings passadas como colunas realmente existem nas chaves do objeto T
    columns: (keyof T)[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onAdd?: () => void;
    addLabel?: string;
}

// O <T extends Record<string, any>> avisa pro React que isso é um componente Genérico
export const Table = <T extends Record<string, any>>({ array, columns, onEdit, onDelete, onAdd, addLabel }: Props<T>) => (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-zebra">
            {/* head */}
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={String(column)}>{String(column)}</th>
                    ))}
                    <th className="text-center w-24">Ações</th>
                </tr>
            </thead>
            <tbody>
                {array.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map(column => (
                            // O TypeScript agora sabe que 'column' é uma chave válida de 'item'
                            <td key={String(column)}>{String(item[column])}</td>
                        ))}
                        <td className="flex justify-center items-center gap-4">
                            <button onClick={() => onEdit && onEdit(item)} className="btn btn-square btn-ghost btn-sm text-accent" title="Editar">
                                <FontAwesomeIcon icon={faPencil} />
                            </button>
                            <button onClick={() => onDelete && onDelete(item)} className="btn btn-square btn-ghost btn-sm text-error" title="Excluir">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
        {onAdd && (
            <div className="p-2 flex justify-end">
                <button onClick={onAdd} className="btn btn-outline btn-primary btn-sm">
                    + {addLabel || 'Adicionar Novo'}
                </button>
            </div>
        )}
    </div>
)