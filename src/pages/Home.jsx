// ============================================
// PÁGINA: Home (Página de Inicio)
// ============================================
// Esta es la página principal que ven los usuarios cuando visitan "/"

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
    // Hook para navegar programáticamente a otras rutas
    const navigate = useNavigate();

    // Obtenemos la información del usuario (si está autenticado)
    const { user } = useAuth();

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-8 col-lg-6 text-center">

                    {/* Título principal */}
                    <h1 className="display-4 mb-4">
                        Bienvenido a Mi App
                    </h1>

                    {/* Descripción */}
                    <p className="lead text-muted mb-5">
                        Una aplicación moderna con Firebase y React
                    </p>

                    {/* Mostrar diferentes opciones según si está autenticado */}
                    {user ? (
                        // Usuario autenticado
                        <div>
                            <p className="mb-4">
                                ¡Hola, <strong>{user.displayName || user.email}</strong>!
                            </p>
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => navigate("/dashboard")}
                            >
                                Ir al Dashboard
                            </button>
                        </div>
                    ) : (
                        // Usuario NO autenticado
                        <div>
                            <button
                                className="btn btn-primary btn-lg me-3"
                                onClick={() => navigate("/login")}
                            >
                                Iniciar Sesión
                            </button>
                            <button
                                className="btn btn-outline-secondary btn-lg"
                                onClick={() => navigate("/dashboard")}
                            >
                                Ver Dashboard
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Home;
