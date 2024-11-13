import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Main } from "./pages/main";
import { Login } from "./pages/login";
import { Activity } from "./pages/activity";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/activity" element={<Activity />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
