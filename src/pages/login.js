import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "../style/login.css";

export const Login = () => {
  const immagineGoogle = "img/google.webp";
  const navigate = useNavigate();
  //const googleIMG = "../img/google.webp";

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      navigate("/activity"); // Una volta effettuato l'accesso, ritorna alla pagina activity
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <img className="logo-google" src={immagineGoogle} alt="google-logo"></img>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};
