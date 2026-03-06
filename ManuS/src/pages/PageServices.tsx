
import { useEffect, useState } from "react";
import type { Service } from "../models/service";
import { ServiceStatus } from "../models/service";
import { readServices } from "../services/apiServices";
import { CardService } from '../components/Cards/CardService';
import FormServiceCreate from '../components/Forms/FormServiceCreate';
import FormServiceEdit from '../components/Forms/FormServiceEdit';
import { ListHeader } from '../components/ListHeader/ListHeader';

export default function PageServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | undefined>(undefined);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const tempData = await readServices();

                setServices(tempData);

            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        }

        loadData()
    }, [])

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">
                Serviços
            </h1>

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="grid grid-cols-3 justify-items-center">
                    <ul className="list bg-base-100 gap-5">
                        <ListHeader 
                            title="Lista de Pendência" 
                            status={ServiceStatus.Open}
                            onAddClick={() => (document.getElementById('service-create-modal') as HTMLDialogElement)?.showModal()}
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
                            onAddClick={() => (document.getElementById('service-create-modal') as HTMLDialogElement)?.showModal()}
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
                            onAddClick={() => (document.getElementById('service-create-modal') as HTMLDialogElement)?.showModal()}
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
            )}

            <FormServiceCreate />
            <FormServiceEdit service={selectedService} onClose={() => setSelectedService(undefined)} />
        </div>
    )

}