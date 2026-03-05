

type AuthContextProps = {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);


    
});