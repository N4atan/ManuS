import React from "react";
import type { User } from "../models/user";
import { readUserByEmail } from "../services/apiUsers";
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';



type AuthContextProps = {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);
    const navigate = useNavigate();


    const login = async (email: string) => {
        try {
            if (isAuthenticated) {
                console.warn("User is already authenticated");
                return;
            }
            const tempUser = await readUserByEmail(email);

            if (!tempUser) {
                toast.error("Usuário não encontrado. Por favor, entre em contato com a equipe de suporte.");
                return;
            }

            setUser(tempUser);
            setIsAuthenticated(true);
            toast.success('Login realizado com sucesso');
            navigate('/services');
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        toast('Logout efetuado', { icon: '👋' });
        navigate('/login');
    }

    const value: AuthContextProps = {
        isAuthenticated,
        user,
        login,
        logout,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};