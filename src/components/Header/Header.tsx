import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../contexts/AuthContext";
import { faArrowRightToBracket, faCubes, faFileExcel, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { exportToExcel } from "../../services/apiSheets";
import { NavLink } from "react-router";
import { userRole } from "../../models/user";


export const Header = () => {
    const { user, logout } = useAuth();


    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">
                    <img src="../../../public/Logo.png" alt="" className="h-full" />
                </a>
            </div>
            <div className="flex gap-2">

                {!user && (
                    <a href="/login" className="btn btn-primary">
                        Login
                    </a>
                )}

                {user && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full bg-base-200 flex items-center justify-center">
                                <p className="text-xl">{user.name.split(" ")[0].charAt(0)}</p>
                            </div>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                            {user.role == userRole.TI && (
                                <li>
                                    <NavLink to="/admin" className="justify-between cursor-pointer">
                                        Administrador
                                        <FontAwesomeIcon icon={faUserGear} />
                                    </NavLink>
                                </li>
                            )}

                            <li>
                                <NavLink to="/services" className="justify-between cursor-pointer">
                                    Serviços
                                    <FontAwesomeIcon icon={faCubes} />
                                </NavLink>
                            </li>

                            <li onClick={() => exportToExcel()}>
                                <a className="justify-between cursor-pointer">
                                    Exportar [.xlsx]
                                    <FontAwesomeIcon icon={faFileExcel} />
                                </a>
                            </li>

                            <li onClick={() => logout()}>
                                <a className="justify-between cursor-pointer">
                                    Sair
                                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}