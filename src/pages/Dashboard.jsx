import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Formulario from "../components/Formulario";
import Lista from "../components/Lista";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            alert("Error al cerrar sesión: " + error.message);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-light bg-light border-bottom">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Mi App con Firebase</span>
                    <div className="d-flex align-items-center">
                        {user?.photoURL && (
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className="rounded-circle me-2"
                                width="40"
                                height="40"
                            />
                        )}
                        <div className="me-3">
                            <div className="fw-bold">{user?.displayName}</div>
                            <small className="text-muted">{user?.email}</small>
                        </div>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <Formulario />
                <Lista />
            </div>
        </div>
    );
};

export default Dashboard;
