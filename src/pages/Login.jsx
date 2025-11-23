import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Login = () => {
    const { loginWithGoogle, user } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // useEffect: Se ejecuta automáticamente cuando el componente se monta
    // o cuando cambian las dependencias [user, navigate]

    // ¿Para qué sirve este useEffect?
    // Redirige automáticamente a usuarios YA AUTENTICADOS desde /login a /dashboard
    // Es una "protección inversa" - evita que usuarios autenticados vean el login
    //
    // Flujo:
    // 1. Usuario autenticado intenta ir a /login
    // 2. El componente Login se renderiza
    // 3. useEffect detecta que "user" existe (está autenticado)
    // 4. Automáticamente redirige a /dashboard
    //
    // Resultado: Usuarios autenticados NO pueden ver la página de login
    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Funcionalidad de login con email/password no implementada");
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate("/dashboard");
        } catch (error) {
            alert("Error al iniciar sesión: " + error.message);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="correo@ejemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100 mb-3">
                                    Iniciar Sesión
                                </button>
                            </form>

                            <div className="text-center mb-3">
                                <span className="text-muted">o</span>
                            </div>

                            <button
                                className="btn btn-outline-dark w-100"
                                onClick={handleGoogleLogin}
                                type="button"
                            >
                                Continuar con Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
