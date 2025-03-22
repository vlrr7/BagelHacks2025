import "./App.css";
import About from "./pages/about.tsx";
import Corporate from "./pages/corporate.tsx";
import Jobseeker from "./pages/jobseeker.tsx";
import Login from "./pages/login.tsx";
import Profile from "./pages/profile.tsx";
import Signup from "./pages/signup.tsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={About} />
        <Route path="/corporate" Component={Corporate} />
        <Route path="/jobseeker" Component={Jobseeker} />
        <Route path="/login" Component={Login} />
        <Route path="/profile" Component={Profile} />
        <Route path="/signup" Component={Signup} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
