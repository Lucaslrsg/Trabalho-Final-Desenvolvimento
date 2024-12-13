import React, { useState, useEffect } from "react";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [novoPedido, setNovoPedido] = useState({ clienteId: "", produtoIds: [] });
  const [filtro, setFiltro] = useState("");
  const [mostrarPedidos, setMostrarPedidos] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/pedidos")
      .then((res) => res.json())
      .then((data) => setPedidos(data));

    fetch("http://localhost:8080/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data));

    fetch("http://localhost:8080/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos( data));
  }, []);

  const adicionarPedido = () => {
    if (!novoPedido.clienteId || novoPedido.produtoIds.length === 0) {
      alert("Selecione um cliente e ao menos um produto.");
      return;
    }
  
    fetch("http://localhost:8080/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idCliente: novoPedido.clienteId, // altere para idCliente
        idsProdutos: novoPedido.produtoIds, // altere para idsProdutos
      }),
    }).then(() => {
      alert("Pedido adicionado com sucesso");
      setNovoPedido({ clienteId: "", produtoIds: [] });
      fetch("http://localhost:8080/pedidos")
        .then((res) => res.json())
        .then((data) => setPedidos(data));
    });
  };
  const realizarBusca = () => {
    setMostrarPedidos(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Pedidos</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar por cliente ou produto"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-primary mt-2 w-100" onClick={realizarBusca}>
          Buscar Pedidos
        </button>
      </div>

      {mostrarPedidos && (
        <ul className="list-group mb-4">
          {pedidos
  .filter((pedido) => {
    const clienteNome = pedido.cliente ? pedido.cliente.nome : '';  // Verifica se cliente existe
    const produtosNomes = pedido.produtos ? pedido.produtos.map((produto) => produto.nome).join(", ") : '';  // Verifica se produtos existem
    return (
      clienteNome.toLowerCase().includes(filtro.toLowerCase()) ||
      produtosNomes.toLowerCase().includes(filtro.toLowerCase())
    );
  })
  .map((pedido) => (
    <li key={pedido.id} className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <strong>Cliente:</strong> {pedido.cliente ? pedido.cliente.nome : 'Desconhecido'} <br />
          <strong>Produtos:</strong> {pedido.produtos && pedido.produtos.length > 0 ? pedido.produtos.map((p) => p.nome).join(", ") : 'Nenhum produto'}
        </div>
      </div>
    </li>
  ))}

        </ul>
      )}

      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Adicionar Pedido</h3>

          <div className="mb-3">
            <label className="form-label">Cliente</label>
            <select
              className="form-select"
              value={novoPedido.clienteId}
              onChange={(e) => setNovoPedido({ ...novoPedido, clienteId: e.target.value })}
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Produtos</label>
            <select
              multiple
              className="form-select"
              value={novoPedido.produtoIds}
              onChange={(e) =>
                setNovoPedido({
                  ...novoPedido,
                  produtoIds: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
            >
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary w-100" onClick={adicionarPedido}>
            Adicionar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pedidos;
