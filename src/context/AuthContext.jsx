// Importamos herramientas de React para manejar el estado y efectos
import { useEffect, useState } from "react";

// Importamos funciones específicas de Firebase Authentication
import {
    signInWithPopup,      // Función para abrir ventana emergente de inicio de sesión
    signOut,              // Función para cerrar sesión
    onAuthStateChanged    // Función que escucha cambios en el estado de autenticación
} from "firebase/auth";

// Importamos la configuración de Firebase que creamos en otro archivo
import { auth, googleProvider } from "../firebase";

// Importamos el AuthContext del archivo separado
import { AuthContext } from "./AuthContextDefinition";



// Este componente "envuelve" nuestra aplicación y proporciona la información
// de autenticación a todos los componentes hijos
// { children } son todos los componentes que estarán dentro de <AuthProvider>
function AuthProvider({ children }) {


    // user: guarda la información del usuario autenticado (null si no hay usuario)
    // Cuando alguien inicia sesión, aquí se guarda su nombre, email, foto, etc.
    const [user, setUser] = useState(null);

    // loading: indica si estamos verificando el estado de autenticación
    // Empieza en true porque al cargar la app, necesitamos tiempo para verificar
    // si hay un usuario ya autenticado
    const [loading, setLoading] = useState(true);


    // useEffect se ejecuta cuando el componente se monta (aparece en pantalla)
    // El array vacío [] al final significa "ejecuta esto solo UNA VEZ al inicio"
    useEffect(() => {

        // onAuthStateChanged es una función de Firebase que "escucha" cambios
        // en el estado de autenticación. Es como un vigilante que está atento
        // a cuando alguien inicia o cierra sesión

        // Recibe dos parámetros:
        // 1. auth: la configuración de autenticación de Firebase
        // 2. Una función callback que se ejecuta cada vez que hay un cambio
        //
        // Esta función callback recibe automáticamente el usuario actual (currentUser)
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // Cuando hay un cambio:
            // - Si alguien inició sesión: currentUser tendrá los datos del usuario
            // - Si alguien cerró sesión: currentUser será null
            setUser(currentUser);

            // Ya terminamos de verificar, así que loading pasa a false
            // Esto permite que la aplicación se muestre 
            setLoading(false);
        });

        // FUNCIÓN DE LIMPIEZA (cleanup function)
        // Cuando el componente se desmonta (desaparece), necesitamos dejar
        // de escuchar cambios para evitar problemas de memoria
        // unsubscribe() es una función que nos devuelve onAuthStateChanged
        // y sirve para "cancelar la suscripción" 
        return () => unsubscribe();

    }, []); // Array vacío = ejecutar solo una vez al montar el componente


    // Función asíncrona (async) porque las operaciones con Firebase toman tiempo
    // y necesitamos esperar su respuesta
    const loginWithGoogle = async () => {
        try {
            // signInWithPopup es una función de Firebase que:
            // 1. Abre una ventana emergente
            // 2. Muestra la página de inicio de sesión de Google
            // 3. Espera a que el usuario ingrese sus credenciales
            // 4. Devuelve un objeto con la información del usuario

            // Parámetros:
            // - auth: configuración de Firebase
            // - googleProvider: configuración específica para login con Google
            //
            // await = "espera a que esto termine antes de continuar"
            const result = await signInWithPopup(auth, googleProvider);

            // result.user contiene toda la información del usuario:
            // nombre, email, foto de perfil, ID único, etc.
            return result.user;

        } catch (error) {
            // Si algo sale mal (usuario cancela, error de red, etc.)
            // mostramos el error en la consola
            console.error("Error al iniciar sesión con Google:", error);

            // throw error = "lanza el error hacia arriba" para que el componente
            // que llamó a loginWithGoogle() pueda manejarlo
            throw error;
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            // signOut es una función de Firebase que:
            // 1. Cierra la sesión del usuario actual
            // 2. Limpia todos los tokens de autenticación
            // 3. Automáticamente dispara onAuthStateChanged
            //    que actualizará user a null
            await signOut(auth);

        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            throw error;
        }
    };

    // Este objeto contiene todo lo que queremos compartir con otros componentes
    const value = {
        user,              // Información del usuario actual (o null)
        loading,           // Si estamos verificando autenticación
        loginWithGoogle,   // Función para iniciar sesión
        logout             // Función para cerrar sesión
    };

    return (
        // AuthContext.Provider es el componente que "provee" los datos
        // a todos sus componentes hijos
        <AuthContext.Provider value={value}>
            {/* Solo mostramos los children cuando loading es false */}
            {/* Esto evita que la app se muestre antes de saber si hay usuario */}
            {/* !loading significa "si NO está cargando" */}
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Exportamos AuthProvider como default para cumplir con Fast Refresh
export default AuthProvider;
