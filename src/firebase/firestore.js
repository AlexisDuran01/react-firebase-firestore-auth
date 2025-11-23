// Este archivo contiene funciones para interactuar con Firestore
// Firestore es la base de datos en la nube de Firebase donde
// guardamos información de forma permanente

// Importamos la configuración de la base de datos (db) desde firebase.js
// db es la "conexión" a nuestra base de datos en Firebase
import { db } from "../firebase";

// Importamos funciones específicas de Firestore para trabajar con datos
// collection: Nos permite acceder a una "colección" (como una tabla en SQL)
// addDoc: Nos permite agregar un nuevo documento (registro) a la colección
import { collection, addDoc } from "firebase/firestore";

// Esta función guarda un dato en Firestore
// Es una función asíncrona (async) porque guardar datos en la nube
// toma tiempo y necesitamos esperar la respuesta

// Parámetro:
// - dato: Un objeto con la información que queremos guardar
//   Ejemplo: { nombre: "Juan", edad: 25 }
export const guardarDato = async (dato) => {

  try {
    // await: "espera a que esto termine antes de continuar"
    // addDoc: Función que agrega un nuevo documento a Firestore

    // await pausa esta función específica
    // "Espera aquí hasta que Firebase responda"
    // PERO la UI sigue funcionando

    // Si NO se usa await, la función continúa sin esperar la respuesta de Firebase
    // y ejecuta inmediatamente el console.log y el alert de abajo
    // Problema: La alerta se mostraría ANTES de que Firebase termine de guardar
    // lo cual sería incorrecto 

    await addDoc(

      collection(db, "datos"),  // ← Especificamos la colección "datos"
      dato                       // ← El objeto que queremos guardar
    );

    // Esta línea NO se ejecuta hasta que Firebase responda
    console.log("Dato guardado");
    alert("¡Guardado exitosamente!");


  } catch (error) {
    console.error("Error al guardar en Firestore:", error);
  }
};


