import React, { useState, useEffect } from "react";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nomeBusca, setNomeBusca] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: "", email: "", telefone: "" });

  useEffect(() => {
    fetch("http://localhost:8080/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data));
  }, []);

  const adicionarCliente = () => {
    const { nome, email, telefone } = novoCliente;
    if (!nome || !email || !telefone) {
      alert("Todos os campos são obrigatórios");
      return;
    }
    fetch("http://localhost:8080/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCliente)
    }).then(() => {
      setNovoCliente({ nome: "", email: "", telefone: "" });
      alert("Cliente adicionado com sucesso");
      // Recarregar a lista
      fetch("http://localhost:8080/clientes")
        .then((res) => res.json())
        .then((data) => setClientes(data));
    });
  };

  const buscarClientes = () => {
    const resultados = clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(nomeBusca.toLowerCase())
    );
    setClientesFiltrados(resultados);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Gestão de Clientes</h2>

      {/* Seção de busca */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Buscar Clientes</h5>
          <div className="input-group">
            <input
              type="text"
              placeholder="Buscar pelo nome"
              value={nomeBusca}
              onChange={(e) => setNomeBusca(e.target.value)}
              className="form-control"
            />
            <button className="btn btn-primary" onClick={buscarClientes}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de clientes */}
      {clientesFiltrados.length > 0 && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Lista de Clientes</h5>
            <ul className="list-group">
              {clientesFiltrados.map((cliente) => (
                <li key={cliente.id} className="list-group-item d-flex flex-column">
                  <div>
                    <strong>Nome:</strong> {cliente.nome}
                  </div>
                  <div>
                    <strong>Email:</strong> {cliente.email}
                  </div>
                  <div>
                    <strong>telefone:</strong> {cliente.telefone}
                  </div>
                  <span className="badge bg-primary rounded-pill align-self-end">ID: {cliente.id}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Formulário de adicionar cliente */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Adicionar Cliente</h5>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Nome do cliente"
              value={novoCliente.nome}
              onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
              className="form-control mb-2"
            />
            <input
              type="email"
              placeholder="Email do cliente"
              value={novoCliente.email}
              onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
              className="form-control mb-2"
            />
            <input
              type="tel"
              placeholder="Telefone do cliente"
              value={novoCliente.telefone}
              onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
              className="form-control"
            />
          </div>
          <button className="btn btn-success w-100" onClick={adicionarCliente}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clientes;
