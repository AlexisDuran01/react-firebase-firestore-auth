
// Este es el componente raíz de la aplicación
// Aquí configuramos las rutas (URLs) y la autenticación

// Importamos herramientas de React Router para manejar la navegación
// BrowserRouter (Router): Habilita el sistema de rutas en la app
// Routes: Contenedor de todas las rutas
// Route: Define una ruta específica (URL)
// Navigate: Redirige automáticamente a otra página
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Importamos el AuthProvider que creamos
// Este componente "envuelve" la app y comparte la info de autenticación
import AuthProvider from "./context/AuthContext";

// Importamos el componente que protege rutas privadas
// Solo permite acceso si el usuario está autenticado
import PrivateRoute from "./components/PrivateRoute";

// Importamos las páginas de la aplicación
import Home from "./pages/Home";           // Página de inicio (pública)
import Login from "./pages/Login";        // Página de inicio de sesión
import Dashboard from "./pages/Dashboard"; // Página principal (protegida)
import NotFound from "./pages/NotFound";   // Página de error 404

// Componente principal de la aplicación
function App() {
  return (
    // BrowserRouter: Habilita el sistema de navegación por URLs
    // Todo lo que esté dentro puede usar rutas
    <BrowserRouter>

      {/* AuthProvider: Envuelve toda la app para compartir la autenticación */}
      {/* Cualquier componente hijo puede usar useAuth() para acceder al usuario */}
      <AuthProvider>

        {/* Routes: Contenedor de todas las rutas de la aplicación */}
        <Routes>
          {/*  <Routes> (actúa como switch) 
              - Evalúa rutas en orden       
              - Primera coincidencia gana   
              - Se detiene al encontrar coincidencia */}

          {/* Ruta raíz muestra una página de inicio */}
          <Route path="/" element={<Home />} />


          {/* RUTA PÚBLICA: Login */}
          {/* Cuando el usuario visita "/login", muestra el componente Login */}
          <Route path="/login" element={<Login />} />

          {/* RUTA PRIVADA: Dashboard */}
          {/* Cuando el usuario visita "/dashboard", primero verifica autenticación */}
          <Route
            path="/dashboard"
            element={
              // PrivateRoute actúa como "guardia de seguridad"  "wrapper" (envoltorio) 
              // Si hay usuario autenticado → Muestra Dashboard
              // Si NO hay usuario → Redirige a /login
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* RUTA DE ERROR: 404 Not Found */}
          {/* Esta ruta captura cualquier URL que no coincida con las anteriores */}
          {/* path="*" significa "cualquier ruta" */}
          <Route path="*" element={<NotFound />} />

        </Routes>

      </AuthProvider>

    </BrowserRouter>
  );
}

// Exportamos el componente para usarlo en main.jsx
export default App;



