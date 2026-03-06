type userRole = "ADMINISTRATIVO" | "USER" | 'TI';



export type User = {
    id: string;
    name: string;
    role: userRole;
}
