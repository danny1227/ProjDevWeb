import logo from "../src/assets/CIG.png";
import userIcon from "../src/assets/usuario.png"
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { Secret } from "./hooks/Secret.tsx";
import { Navbar, Container, Nav} from "react-bootstrap";

import "./App.scss";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { AuthProvider  } from "./hooks/UseAuth.tsx";
import { RegisterUser } from "./pages/RegisterUser.tsx";
import { useAuth } from "../src/hooks/UseAuth.tsx";
import { NavPage } from "./pages/NavPage.tsx";

function App() {
  const { user, logout } = useAuth(); // Usamos `user` para verificar si está logueado

  return (
    <AuthProvider>
      <Navbar className="bg-body-tertiary barrita">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img alt="Logo" src={logo} width="65" height="40" className="d-inline-block align-top" />
            {' '}
          </Navbar.Brand>
            <NavPage>
            </NavPage>
            <Navbar.Brand href="#home">
            <img
              alt="User"
              src={userIcon}
              width="40"
              height="40"
              className=""
            />
            </Navbar.Brand>
        </Container>
      </Navbar>
      <br></br>
      <br></br>
      <br></br>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={<ProtectedRoute> <HomePage /> </ProtectedRoute> }
        />
        <Route path="/home" element={ <ProtectedRoute> {" "} <HomePage />{" "} </ProtectedRoute> }
        />
        <Route path="/secret"  element={ <ProtectedRoute> {" "} <Secret />{" "} </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
