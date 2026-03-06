

export default function ServiceDesktop() {
    return (
        <div className="grid grid-cols-3 justify-items-center">
            <ul className="list bg-base-100 gap-5">
                <ListHeader
                    title="Lista de Pendência"
                    status={ServiceStatus.Open}
                    onAddClick={() => showModalCreate(ServiceStatus.Open)}
                />


                {services.filter(service => service.status === ServiceStatus.Open).map(service => (
                    <li key={service.id} className="list-tem ">
                        <CardService
                            service={service}
                            onEdit={(s) => setSelectedService(s)}
                        />
                    </li>
                ))}

            </ul>

            <ul className="list bg-base-100 gap-5">
                <ListHeader
                    title="Em andamento"
                    status={ServiceStatus.InProgress}
                    onAddClick={() => showModalCreate(ServiceStatus.InProgress)}
                />

                {services.filter(service => service.status === ServiceStatus.InProgress).map(service => (
                    <li key={service.id} className="list-tem ">
                        <CardService
                            service={service}
                            onEdit={(s) => setSelectedService(s)}
                        />
                    </li>
                ))}


            </ul>

            <ul className="list bg-base-100 gap-5">
                <ListHeader
                    title="Concluído"
                    status={ServiceStatus.Closed}
                    onAddClick={() => showModalCreate(ServiceStatus.Closed)}
                />

                {services.filter(service => service.status === ServiceStatus.Closed).map(service => (
                    <li key={service.id} className="list-tem ">
                        <CardService
                            service={service}
                            onEdit={(s) => setSelectedService(s)}
                        />
                    </li>
                ))}


            </ul>


        </div>
    )
}