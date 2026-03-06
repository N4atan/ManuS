export const ServiceStatus = {
    Open: "open",
    Closed: "closed",
    InProgress: "in_progress"
} as const;

export type ServiceStatusType = typeof ServiceStatus[keyof typeof ServiceStatus];

export type serviceUnit = "Senac Centro" | "Senac Unisinos";

export type Service = {
    id              : string;
    title           : string;
    description     : string;
    deadline        : string;
    unit            : serviceUnit;
    location        : string;
    status          : ServiceStatusType;
    resolution      : string | null;
    opened_by       : string | null;
    closed_by       : string | null;
    created_at      : string;
    closed_at       : string;
}
