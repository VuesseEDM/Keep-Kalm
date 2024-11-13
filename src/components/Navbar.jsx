import { Link, useNavigate } from "react-router-dom";
import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from 'firebase/auth';

import '../style/navbar.css';

export const Navbar = () => {
  const immagineAvatar = "img/avatar.png";
  
  const [user] = useAuthState(auth);
  const navigate = useNavigate(); // Aggiungi la funzione useNavigate per navigare

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");  // Dopo il logout, torna alla Home
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      {!user ? (
        <Link to="/login">Login</Link>
      ) : (
        <Link to="/activity">Activity</Link>
      )}

      <div className="user-info">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img 
              src={user?.photoURL || immagineAvatar} 
              width="30" 
              height="30" 
              alt="user-avatar" 
              className="user-avatar" 
            />
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};
