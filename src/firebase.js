// Importamos las funciones necesarias de Firebase
// initializeApp: para iniciar la aplicación de Firebase
// getFirestore: para obtener la base de datos Firestore
// getAuth: para obtener el servicio de autenticación
// GoogleAuthProvider: para autenticación con Google
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Extraemos las variables de entorno usando "Desestructuración"
// ¿Qué es la desestructuración?
// Es una forma corta de sacar propiedades de un objeto y convertirlas en variables.
// En lugar de escribir "import.meta.env.VITE_FIREBASE_API_KEY" cada vez,
// las sacamos todas de una vez y las usamos directamente por su nombre.
const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID
} = import.meta.env;

// Esta es la configuración de Firebase para nuestro proyecto
// Las variables se leen del archivo .env
// En Vite, las variables deben empezar con VITE_ para ser accesibles
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY, // Clave de API para identificar el proyecto
  authDomain: VITE_FIREBASE_AUTH_DOMAIN, // Dominio para autenticación
  projectId: VITE_FIREBASE_PROJECT_ID, // ID único del proyecto
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET, // Bucket para almacenamiento de archivos
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID, // ID para mensajes push
  appId: VITE_FIREBASE_APP_ID // ID de la aplicación web
};

// Inicializamos la aplicación de Firebase con la configuración
const app = initializeApp(firebaseConfig);

// Obtenemos la instancia de Firestore (base de datos) y la exportamos
export const db = getFirestore(app);

// Obtenemos el servicio de autenticación y lo exportamos
export const auth = getAuth(app);

// Creamos un proveedor de Google para autenticación y lo exportamos
export const googleProvider = new GoogleAuthProvider();
