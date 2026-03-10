import React from "react";
import { useAuth } from "../../contexts/AuthContext";




export default function FormLogin() {
    const { login } = useAuth();
    const [ email, setEmail ] = React.useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email);
    }

    return (
        <form className="card w-96 bg-base-100 card-md shadow-sm mx-auto my-50" onSubmit={handleSubmit}>
            <div className="card-body">
                <h2 className="card-title">Entrar</h2>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Usuário</legend>
                    <input
                        type="text"
                        className="input"
                        placeholder="Digite seu nome de usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="label">Caso não tenha, entre em contato com a equipe de suporte.</p>
                </fieldset>

                <div className="justify-end card-actions mt-5">
                    <button type="submit" className="btn btn-primary">
                        Entrar
                    </button>
                </div>
            </div>
        </form>
    )
}