import type { Service } from "../../models/service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCheckCircle } from '@fortawesome/free-regular-svg-icons'

type Props = {
    service: Service;
    onEdit?: (service: Service) => void;

}

export const CardService = ({ service, onEdit }: Props) => (
    <div
        className="card bg-base-100 border border-base-300 max-w-96 shadow-sm rounded-field cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onEdit?.(service)}
    >
        <div className="card-body">
            <div>
                <div className="badge badge-outline badge-primary mr-5">{service.location}</div>
                {service.unit === "Senac Centro" ? (
                    <div className="badge badge-primary">Senac Centro</div>
                ) : (
                    <div className="badge badge-secondary">Senac Unisinos</div>
                )}
            </div>

            <h2 className="card-title text-xl">
                {service.title}
            </h2>

            <p className="opacity-90">
                {service.description}
            </p>

            <div className="bt-10 h-10 w-full flex items-center justify-between">
                <div className={`flex items-center justify-center gap-2 opacity-80 ${service.status === 'closed' ? 'text-success-content' : 'text-error-content'}`}>
                    <FontAwesomeIcon icon={service.status !== 'closed' ? faCalendarDays : faCheckCircle} className="text-base" />
                    <p className="text-sm">
                        {service.status !== 'closed' ? service.deadline?.split('-').reverse().join('/') : service.resolved_at?.split('-').reverse().join('/')}
                    </p>
                </div>
                

                <div className="avatar rounded-full px-3 py-1 bg-base-300 text-center">
                    <p className="text-xl opacity-80">
                        {service.opened_by!.split(" ")[0].charAt(0).toUpperCase()}
                    </p>
                </div>
            </div>
        </div>
    </div>
)