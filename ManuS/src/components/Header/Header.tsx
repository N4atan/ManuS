import { useAuth } from "../../contexts/AuthContext";


export const Header = () => {
    const { user } = useAuth();

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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
                )}
            </div>
        </div>
    )
}