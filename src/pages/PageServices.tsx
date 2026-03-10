
import { useEffect, useState } from "react";
import type { Service, ServiceStatusType } from "../models/service";
import { ServiceStatus } from "../models/service";
import { observeServices } from "../services/apiServices";
import { CardService } from '../components/Cards/CardService';
import FormServiceCreate from '../components/Forms/FormServiceCreate';
import FormServiceEdit from '../components/Forms/FormServiceEdit';
import { ListHeader } from '../components/ListHeader/ListHeader';
import { faCircleCheck, faNoteSticky, faPenToSquare, } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

export default function PageServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState<Service | undefined>(undefined);
    const [tempStatus, setTempStatus] = useState<ServiceStatusType | undefined>(undefined);
    const [tabMobile, setTabMobile] = useState<ServiceStatusType>(ServiceStatus.Open);
    const { user } = useAuth();


    useEffect(() => {
        setLoading(true);
        // Inicia a observação no Firestore
        const unsubscribe = observeServices((servicesList) => {
            setServices(servicesList);
            setLoading(false);
        });

        // Limpa a observação (desconecta) quando o componente for fechado
        return () => unsubscribe();
    }, []);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const onReset = () => {
        setSelectedService(undefined);
        // loadData removido, onSnapshot agora atualiza automaticamente
    }


    const showModalCreate = (status: ServiceStatusType) => {
        setTempStatus(status);
        (document.getElementById('service-create-modal') as HTMLDialogElement)?.showModal();
    }

    return (
        <>
            <div className="p-5">

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center pt-10 gap-4">
                        <div className="skeleton h-32 w-96"></div>
                        <div className="skeleton h-32 w-96"></div>
                        <div className="skeleton h-32 w-96"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-4">
                        <ul className="hidden lg:block list bg-base-100 gap-12 w-96">
                            <ListHeader
                                title="Lista de Pendência"
                    
                                onAddClick={() => showModalCreate(ServiceStatus.Open)}
                            />


                            {services.filter(service => service.status === ServiceStatus.Open).map(service => (
                                <li key={service.id} className="list-item mb-4">
                                    <CardService
                                        service={service}
                                        onEdit={(s) => setSelectedService(s)}
                                    />
                                </li>
                            ))}

                        </ul>



                        <ul className="hidden lg:block list bg-base-100 gap-12 w-96">
                            <ListHeader
                                title="Em andamento"
                            />

                            {services.filter(service => service.status === ServiceStatus.InProgress).map(service => (
                                <li key={service.id} className="list-item mb-4">
                                    <CardService
                                        service={service}
                                        onEdit={(s) => setSelectedService(s)}
                                    />
                                </li>
                            ))}


                        </ul>



                        <ul className="hidden lg:block list bg-base-100 gap-12 w-96">
                            <ListHeader
                                title="Concluído"
                            />

                            {services.filter(service => service.status === ServiceStatus.Closed).map(service => (
                                <li key={service.id} className="list-item mb-4">
                                    <CardService
                                        service={service}
                                        onEdit={(s) => setSelectedService(s)}
                                    />
                                </li>
                            ))}


                        </ul>

                        <ul className="lg:hidden block list bg-base-100 gap-16 w-96">
                            <ListHeader
                                title={tabMobile === ServiceStatus.Open ? "Pendentes" : tabMobile === ServiceStatus.InProgress ? "Em Andamento" : "Concluídos"}
                                onAddClick={tabMobile === ServiceStatus.Open ? () => showModalCreate(tabMobile) : undefined}
                            />


                            {services.filter(service => service.status === tabMobile).map(service => (
                                <li key={service.id} className="list-item mb-6">
                                    <CardService
                                        service={service}
                                        onEdit={(s) => setSelectedService(s)}
                                    />
                                </li>
                            ))}

                        </ul>
                    </div>
                )}


            </div>
            <div className="dock lg:hidden">
                <button onClick={() => setTabMobile(ServiceStatus.Open)} className={tabMobile === ServiceStatus.Open ? "dock-active" : ""}>
                    <FontAwesomeIcon icon={faNoteSticky} className="size-[1.2em]" />
                    <span className="dock-label">Pendentes</span>
                </button>

                <button onClick={() => setTabMobile(ServiceStatus.InProgress)} className={tabMobile === ServiceStatus.InProgress ? "dock-active" : ""}>
                    <FontAwesomeIcon icon={faPenToSquare} className="size-[1.2em]" />
                    <span className="dock-label">Em Andamento</span>
                </button>

                <button onClick={() => setTabMobile(ServiceStatus.Closed)} className={tabMobile === ServiceStatus.Closed ? "dock-active" : ""}>

                    <FontAwesomeIcon icon={faCircleCheck} className="size-[1.2em]" />
                    <span className="dock-label">Concluídos</span>
                </button>
            </div>

            <FormServiceCreate status={tempStatus!} onReset={() => { setTempStatus(undefined); }} />
            <FormServiceEdit service={selectedService} onClose={() => setSelectedService(undefined)} onReset={onReset} />

        </>
    )

}