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
    deadline        : string | null;
    unit            : serviceUnit;
    location        : string;
    status          : ServiceStatusType;
    resolution      : string | null;
    opened_by       : string | null;
    resolved_by     : string | null; 
    created_at      : string;        
    updated_at      : string;        
    resolved_at     : string | null; 
    last_modify_by  : string | null; 
}
