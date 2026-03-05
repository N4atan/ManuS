


export default function FormLogin() {
    return (
        <div className="card w-96 bg-base-100 card-md shadow-sm mx-auto my-50">
            <div className="card-body">
                <h2 className="card-title">Entrar</h2>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Usuário</legend>
                    <input type="text" className="input" placeholder="Digite seu nome de usuário" />
                    <p className="label">Caso não tenha, entre em contato com a equipe de suporte.</p>
                </fieldset>

                <div className="justify-end card-actions mt-5">
                    <button className="btn btn-primary" onClick={() => readServices()}>Entrar</button>
                </div>
            </div>
        </div>
    )
}