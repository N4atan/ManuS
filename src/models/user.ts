

export const userRole = {
    Administrativo: "administrativo",
    TI: "TI",
    Manutencao: "manutencao"
} as const;


export type UserRoleType = typeof userRole[keyof typeof userRole];



export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRoleType;
}
