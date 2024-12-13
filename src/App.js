import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Clientes from "./components/pages/Clientes";
import Produtos from "./components/pages/Produtos.js";
import Pedidos from "./components/pages/Pedidos";

function App() {
  console.log("App.js carregado");
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Sistema</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/clientes">Clientes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/produtos">Produtos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pedidos">Pedidos</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/" element={<h1 id="h1">Bem-vindo ao Sistema!!</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
