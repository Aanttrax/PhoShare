// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyC0HGnxG0H6WXYKs9Zw-NVTY-FJLxi1CzQ",
  authDomain: "photoshare-fd9fc.firebaseapp.com",
  projectId: "photoshare-fd9fc",
  storageBucket: "photoshare-fd9fc.appspot.com",
  messagingSenderId: "528157491027",
  appId: "1:528157491027:web:3c4cf6cb95a3319c0baba6"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;