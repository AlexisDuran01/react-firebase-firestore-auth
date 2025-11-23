// Importamos createContext de React
import { createContext } from "react"; // Crea el "canal de comunicación"

// createContext() es una función que crea un objeto
// Se ejecuta FUERA del componente a diferencia de hooks

// createContext() crea un "almacén global" donde guardaremos la información
// del usuario autenticado. Esto nos permite compartir datos entre componentes
// sin tener que pasar props manualmente por cada nivel del árbol de componentes
export const AuthContext = createContext();
