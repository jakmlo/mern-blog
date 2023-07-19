import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NoMatch from "./components/NoMatch";
import Logout from "./components/Logout";
import Admin from "./pages/Admin";
import RequireAuth from "./components/RequireAuth";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
