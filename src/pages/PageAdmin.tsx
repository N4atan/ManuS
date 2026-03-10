import { useEffect, useState } from "react";
import type { Service } from "../models/service";
import type { User } from "../models/user";
import { deleteService, observeServices } from "../services/apiServices";
import { deleteUser, observeUsers } from "../services/apiUsers";
import { Table } from "../components/Table/Table";
import FormUser from "../components/Forms/FormUser";
import FormService from "../components/Forms/FormService";
import toast from "react-hot-toast";


export default function PageAdmin(){
    const [services, setServices] = useState<Service[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [userSelected, setUserSelected] = useState<User | Service | undefined>(undefined);
    const [serviceSelected, setServiceSelected] = useState<Service | undefined>(undefined);

    useEffect(() => {
        setLoading(true);
        // Inicia a observação no Firestore
        const unsubscribeService = observeServices((servicesList) => {
            setServices(servicesList);
            setLoading(false);
        });

        const unsubscribeUsers = observeUsers((usersList) => {
            setUsers(usersList);
            setLoading(false);
        });

        // Limpa a observação (desconecta) quando o componente for fechado
        return () => {
            unsubscribeService();
            unsubscribeUsers();
        };
        
        
    }, []);

    const handleDeleteUser = async (user: User) => {
        if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
        
        try {
            await deleteUser(user);
            toast.success("Usuário excluído com sucesso!");
        } catch (error) {
            toast.error("Erro ao excluir usuário");
            console.error(error);
        }
    };

    const handleDeleteService = async (service: Service) => {
        if (!confirm("Tem certeza que deseja excluir este chamado?")) return;
        
        try {
            await deleteService(service.id);
            toast.success("Chamado excluído com sucesso!");
        } catch (error) {
            toast.error("Erro ao excluir chamado");
            console.error(error);
        }
    };

    return (
        <>
        {
            loading?( 
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="p-10">
                    <h1 className="text-xl font-bold mb-6">Administração do Sistema</h1>

                    <h2 className="text-lg font-semibold mt-4 mb-2">Usuários</h2>
                    <Table 
                        array={users}
                        columns={['name', 'email', 'role'] as (keyof User)[]}
                        onEdit={(user) => setUserSelected(user as User)}
                        onDelete={(user) => handleDeleteUser(user)}
                        onAdd={() => setUserSelected({} as User)}
                        addLabel="Adicionar Usuário"
                    />

                    <h2 className="text-lg font-semibold mt-8 mb-2">Chamados</h2>
                    <Table 
                        array={services}
                        columns={['title', 'status', 'location', 'unit'] as (keyof Service)[]}
                        onEdit={(service) => setServiceSelected(service as Service)}
                        onDelete={(service) => handleDeleteService(service)}
                        onAdd={() => setServiceSelected({} as Service)}
                        addLabel="Adicionar Chamado"
                    />
                </div>
            )
        }
        <FormUser user={userSelected as User} onClose={() => setUserSelected(undefined)} />
        <FormService service={serviceSelected as Service} onClose={() => setServiceSelected(undefined)} />
        </>
    )
}