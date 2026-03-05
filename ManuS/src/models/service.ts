type serviceStatus = "open" | "closed" | "in_progress";
type serviceUnit = "Senac Centro" | "Senac Unisinos";

export type Service = {
    id              : number | string;
    title           : string;
    description     : string;
    deadline        : string;
    unit            : serviceUnit;
    location        : string;
    status          : serviceStatus;
    resolution      : string | null;
    opened_by       : string | null;
    closed_by       : string | null;
    created_at      : string;
    closed_at       : string;
}
