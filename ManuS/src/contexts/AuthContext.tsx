import React from "react";
import type { User } from "../models/user";
import { readUserByEmail } from "../services/apiUsers";



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


    const login = async (email: string) => {
        if (isAuthenticated) {
            console.warn("User is already authenticated");
            return;
        }
        const tempUser = await readUserByEmail(email);
        
        if (!tempUser) {
            throw new Error("User not found");
        }

        setUser(tempUser);
        setIsAuthenticated(true);
    }

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
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