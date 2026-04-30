

interface ListHeaderProps {
    title: string;
    onAddClick?: () => void;
}



export function ListHeader({ title, onAddClick }: ListHeaderProps) {
    return (
        <li className="list-tem">
            <div className="flex items-center justify-between mb-2">
                <p className="font-title text-lg font-bold tracking-wid">{title}</p>
            </div>

            {onAddClick && (
                <button
                    className="btn btn-outline btn-accent w-full my-2 flex items-center justify-between"
                    onClick={onAddClick}
                >
                    <span className="flex-1 text-center">+ Adicionar serviço</span>

                    <kbd className="hidden lg:flex kbd kbd-sm text-neutral">N</kbd>
                </button>
            )}
        </li>
    );
}
