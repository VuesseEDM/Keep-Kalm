import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
//import { Oval } from "react-loader-spinner";
import { BallTriangle } from "react-loader-spinner";

export const Activity = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth); // Prende lo stato dell'autenticazione

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      navigate("/login"); // Se l'utente non è autenticato, torna al login
    }
  }, [user, loading, navigate, error]);

  if (loading) {
    return (
      <div style={loaderContainerStyle}>
        <BallTriangle
          height={200}
          width={200}
          color="#00BFFF"
          ariaLabel="loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div style={errorContainerStyle}>
        <h2>Errore: {error.message}</h2>
      </div>
    );
  }

  return (
    <div>
      <Timer />
    </div>
  );
};

const loaderContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "86vh",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
};

const errorContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "86vh",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  color: "red",
  fontSize: "1.5em",
};

export default Activity;
