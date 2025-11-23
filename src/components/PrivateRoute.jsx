// ============================================
// COMPONENTE: PrivateRoute (Ruta Protegida)
// ============================================
// Este componente actúa como un "guardia de seguridad" que protege
// ciertas páginas de tu aplicación. Solo permite el acceso si el
// usuario ha iniciado sesión.

// Importamos Navigate de react-router-dom
// Navigate es un componente que redirige automáticamente al usuario
import { Navigate } from "react-router-dom";

// Importamos nuestro hook personalizado useAuth
// Este hook nos da acceso a la información del usuario autenticado
import { useAuth } from "../hooks/useAuth";

// PrivateRoute es un componente que recibe "children" como prop
// "children" representa el contenido que queremos proteger
// Por ejemplo: <PrivateRoute><Dashboard /></PrivateRoute>
//              En este caso, <Dashboard /> es el "children"
const PrivateRoute = ({ children }) => {

    // Usamos el hook personalizado useAuth para obtener la información del usuario
    // useAuth internamente usa useContext(AuthContext) para leer
    // los datos que el AuthProvider está compartiendo
    const { user } = useAuth();
    // user contiene la información del usuario si está autenticado
    // o es null si NO está autenticado

    // Si NO hay usuario (user es null o undefined), significa que
    // la persona NO ha iniciado sesión
    if (!user) {
        // Redirigimos automáticamente a la página de login
        // 
        // ¿Qué hace "replace"?
        // Reemplaza la entrada ACTUAL del historial de navegación
        // en lugar de agregar una nueva entrada
        // 
        // Flujo completo del historial:
        // 1. Estás en Home:           [Home] ← estás aquí
        // 2. Intentas ir a Dashboard: [Home] → [Dashboard] ← llegas aquí
        // 3. PrivateRoute detecta que NO estás autenticado
        // 4. Con "replace":           [Home] → [Login] ← Dashboard fue REEMPLAZADO por Login
        // 
        // Resultado: Si presionas "Atrás", vuelves a [Home], no a [Dashboard]
        return <Navigate to="/login" replace />;
    }

    // Si llegamos aquí, significa que SÍ hay un usuario autenticado
    // Por lo tanto, permitimos el acceso mostrando el contenido protegido
    return children;
};

// Exportamos el componente para usarlo en otras partes de la app
export default PrivateRoute;

// En App.jsx:
// <Route
//   path="/dashboard"
//   element={
//     <PrivateRoute>
//       <Dashboard />
//     </PrivateRoute>
//   }
// />

// 1. Usuario intenta acceder a /dashboard
// 2. PrivateRoute verifica si hay usuario autenticado
// 3a. Si NO hay usuario → Redirige a /login
// 3b. Si SÍ hay usuario → Muestra <Dashboard />
