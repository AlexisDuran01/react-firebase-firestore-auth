// Importamos useContext de React para acceder al contexto
import { useContext } from "react";
//useContext es un hook de React que te permite leer y suscribirte a un contexto desde cualquier componente
// Como es un hook, se ejecuta DENTRO del componente


// Importamos el AuthContext que creamos en AuthContextDefinition.js
import { AuthContext } from "../context/AuthContextDefinition";

// Este es un "getter" (método que obtiene o recupera un valor) para que otros 
// componentes puedan acceder fácilmente a la información de autenticación
export function useAuth() {
    // useContext(AuthContext) intenta obtener los datos del contexto
    const context = useContext(AuthContext);
    //    |                      └─ El contexto a leer
    //    └─ El valor actual del contexto

    // Si context es null/undefined, significa que estamos intentando usar
    // useAuth() fuera del AuthProvider, lo cual no está permitido
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }

    // Si todo está bien, devolvemos el contexto con la info del usuario
    return context; //retorna el value del Provider más cercano
}
