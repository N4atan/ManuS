import type { ServiceStatusType } from "../../models/service";

interface ListHeaderProps {
    title: string;
    status: ServiceStatusType;
    onAddClick?: () => void;
}

const statusLabels: Record<ServiceStatusType, string> = {
    "open": "Pendente",
    "in_progress": "Em Andamento",
    "closed": "Concluído"
};

export function ListHeader({ title, status, onAddClick }: ListHeaderProps) {
    return (
        <li className="list-tem">
            <div className="flex items-center justify-between mb-2">
                <p className="font-title text-lg font-bold tracking-wid">{title}</p>
                <div className="badge badge-outline">{statusLabels[status]}</div>
            </div>

            <button 
                className="btn btn-outline btn-accent w-full my-2"
                onClick={onAddClick}
            >
                + Adicionar serviço
            </button>
        </li>
    );
}
