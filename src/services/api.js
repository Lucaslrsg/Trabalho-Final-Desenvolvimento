// api.js
const API_URL = 'http://localhost:8080'; // Altere conforme o seu backend

const request = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error('Erro ao realizar a requisição');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchClientes = () => {
  return request('/clientes');
};

export const searchClientes = (nome) => {
  return request(`/clientes?nome=${nome}`);
};

export const addCliente = (nome) => {
  return request('/clientes', 'POST', { nome });
};

export const fetchProdutos = () => {
  return request('/produtos');
};

export const searchProdutos = (nome) => {
  return request(`/produtos?nome=${nome}`);
};

export const addProduto = (nome, preco) => {
  return request('/produtos', 'POST', { nome, preco });
};

export const fetchPedidos = () => {
  return request('/pedidos');
};

export const addPedido = (idCliente, idsProdutos) => {
  return request('/pedidos', 'POST', { idCliente, idsProdutos });
};
