import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Adicione a importação da função onAuthStateChanged aqui

const firebaseConfig = {
  apiKey: "AIzaSyBhhXwN0zDagQS5DskS2za6n1E0nLqUzzQ",
  authDomain: "api-project-14d17.firebaseapp.com",
  projectId: "api-project-14d17",
  storageBucket: "api-project-14d17.appspot.com",
  messagingSenderId: "254960972049",
  appId: "1:254960972049:web:1f839ab928387d00ed1cb0",
  measurementId: "G-LNNZE14PLX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, onAuthStateChanged }; // Exporte a função onAuthStateChanged

