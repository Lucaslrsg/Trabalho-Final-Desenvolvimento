import React, { useState, useEffect } from "react";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nomeBusca, setNomeBusca] = useState("");
  const [novoProduto, setNovoProduto] = useState({ nome: "", preco: "" });
  const [mostrarProdutos, setMostrarProdutos] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data));
  }, []);

  const buscarProdutos = () => {
    setMostrarProdutos(true);
  };

  const adicionarProduto = () => {
    if (!novoProduto.nome || !novoProduto.preco || novoProduto.preco <= 0) {
      alert("Preencha todos os campos corretamente. O preço deve ser maior que zero.");
      return;
    }
    fetch("http://localhost:8080/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoProduto)
    }).then(() => {
      setNovoProduto({ nome: "", preco: "" });
      alert("Produto adicionado com sucesso");
      // Recarregar a lista
      fetch("http://localhost:8080/produtos")
        .then((res) => res.json())
        .then((data) => setProdutos(data));
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Produtos</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar pelo nome"
          value={nomeBusca}
          onChange={(e) => setNomeBusca(e.target.value)}
          className="form-control mb-2"
        />
        <button className="btn btn-primary w-100" onClick={buscarProdutos}>
          Buscar Produtos
        </button>
      </div>
      {mostrarProdutos && (
        <ul className="list-group mb-4">
          {produtos
            .filter((produto) => produto.nome.includes(nomeBusca))
            .map((produto) => (
              <li key={produto.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{produto.nome}</span>
                <span className="badge bg-primary rounded-pill">R$ {produto.preco.toFixed(2)}</span>
              </li>
            ))}
        </ul>
      )}
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title mb-0">Adicionar Produto</h3>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="nomeProduto" className="form-label">Nome do Produto</label>
            <input
              type="text"
              id="nomeProduto"
              placeholder="Nome do produto"
              value={novoProduto.nome}
              onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="precoProduto" className="form-label">Preço do Produto</label>
            <input
              type="number"
              id="precoProduto"
              placeholder="Preço do produto"
              value={novoProduto.preco}
              onChange={(e) => setNovoProduto({ ...novoProduto, preco: parseFloat(e.target.value) })}
              className="form-control"
            />
          </div>
          <button className="btn btn-success w-100" onClick={adicionarProduto}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Produtos;