import { useAuth } from "../contexts/AuthContext";


export default function PageServices() {
    const user = {
        name: "Natan"
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">
                Serviços
            </h1>

            <div className="grid grid-cols-3 justify-items-center">
                <ul className="list bg-base-100 gap-5">
                    <li className="list-tem ">
                        <p className="font-title text-lg font-bold tracking-wid">Lista de Pendência</p>

                        <button className="btn btn-outline btn-accent w-full my-2">
                            + Adicionar serviço
                        </button>
                    </li>


                    <li className="list-item">
                        <div className="card bg-base-100 w-96 shadow-sm rounded-field">
                            <div className="card-body relative">
                                <h2 className="card-title">Vazamento de Água</h2>
                                <p>A torneira da Copa de Funcionários encontra-se vazando água na sua base.</p>
                                <div className="bt-10 h-10 w-full bg-base-200  flex items-center justify-center ">
                                    <div className="w-10 rounded-full bg-base-200 flex items-center justify-center">
                                        <p className="text-xl">{user!.name.split(" ")[0].charAt(0)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
''
                    <li className="list-item">
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Card Title</h2>
                                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="list-item">
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Card Title</h2>
                                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                <ul className="list bg-base-100 gap-5">
                    <li className="list-tem ">
                        <p className="font-title text-lg font-bold tracking-wid">Em andamento</p>

                        <button className="btn btn-outline btn-accent w-full my-2">
                            + Adicionar serviço
                        </button>
                    </li>

                    <li className="list-item">
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Card Title</h2>
                                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="list-item">
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Card Title</h2>
                                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                <ul className="list bg-base-100 gap-5">
                    <li className="list-tem ">
                        <p className="font-title text-lg font-bold tracking-wid">Em andamento</p>

                        <button className="btn btn-outline btn-accent w-full my-2">
                            + Adicionar serviço
                        </button>
                    </li>

                    <li className="list-item">
                        <div className="card bg-base-100 w-96 shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Card Title</h2>
                                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>


            </div>
        </div>
    )

}