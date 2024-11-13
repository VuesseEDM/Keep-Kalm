import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"; // Per ottenere lo stato dell'utente
import { auth } from "../config/firebase"; // Importa l'autenticazione Firebase
import "../style/main.css";

import { BallTriangle } from "react-loader-spinner";

export const Main = () => {
  const [user, loading, error] = useAuthState(auth); // Ottiene lo stato di autenticazione
  const [isLoading, setIsLoading] = useState(true); // Stato di caricamento

  // Imposta lo stato di caricamento quando il caricamento è completo
  useEffect(() => {
    if (loading) {
      setIsLoading(true); // mostra il loader
    } else {
      setIsLoading(false); // Se è caricato, non mostra il loader
    }
  }, [loading]);

  //  logout
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Logout con Firebase
    } catch (error) {
      console.error("Errore durante il logout: ", error);
    }
  };

  if (isLoading) {
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
      <div>
        {" "}
        style={errorContainerStyle}
        <h2>Errore: {error.message}</h2>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <div className="left-image">
          <img
            src="/img/mandala2.png"
            alt="Meditazione sinistra"
            className="image-left"
          />
        </div>

        <div className="text-content">
          <h1>La calma è il nuovo potere</h1>
          <p>
            La meditazione è una pratica antica che aiuta a ridurre lo stress,
            migliorare la concentrazione e favorire il benessere mentale e
            fisico. Praticare la meditazione ogni giorno può migliorare la tua
            qualità della vita, aumentando la consapevolezza del presente e
            aiutandoti a sviluppare una mente più calma e serena.
          </p>

          <h2>I Benefici della Meditazione</h2>
          <ul>
            <li>Riduzione dello stress e dell'ansia</li>
            <li>Aumento della concentrazione e della lucidità mentale</li>
            <li>Controllo delle emozioni e miglioramento dell'umore</li>
            <li>
              Benefici per la salute fisica: abbassamento della pressione
              sanguigna
            </li>
            <li>Maggiore consapevolezza e presenza nel momento</li>
          </ul>

          {/* Bottone per login/logout */}
          {user ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="login-button">Accedi</button>
            </Link>
          )}
        </div>

        <div className="right-image">
          <img
            src="/img/monkey.png"
            alt="Meditazione destra"
            className="image-right"
          />
        </div>
      </div>
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

export default Main;
