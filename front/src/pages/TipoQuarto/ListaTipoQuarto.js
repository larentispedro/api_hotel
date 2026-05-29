import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get, del } from '../../servicos/api';

function ListaTipoQuarto() {
  const [tipos, setTipos] = useState([]);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);

  const carregarTipos = async () => {
    try {
      const dados = await get('tipo_quarto');
      setTipos(dados);
    } catch (e) {
      setErro('Erro ao carregar tipos de quarto.');
    }
  };

  useEffect(() => {
    carregarTipos();
  }, []);

  const excluir = async (id) => {
    if (!window.confirm('Deseja excluir este tipo de quarto?')) return;
    try {
      await del(`tipo_quarto/${id}`);
      setSucesso('Tipo de quarto excluído com sucesso!');
      setErro(null);
      carregarTipos();
      setTimeout(() => setSucesso(null), 3000);
    } catch (e) {
      setErro('Erro ao excluir. Verifique se não há reservas vinculadas.');
      setSucesso(null);
    }
  };

  return (
    <div className="container my-5">

      {sucesso && (
        <div className="alert alert-success alert-dismissible">
          {sucesso}
          <button className="btn-close" onClick={() => setSucesso(null)} />
        </div>
      )}
      {erro && (
        <div className="alert alert-danger alert-dismissible">
          {erro}
          <button className="btn-close" onClick={() => setErro(null)} />
        </div>
      )}

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h4 className="mb-0 text-primary">Tipos de Quarto</h4>
          <Link to="/tipo_quarto/novo" className="btn btn-success">
            <i className="bi bi-plus-circle me-2" />
            Novo
          </Link>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Nome</th>
                <th>Valor por diária</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {tipos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">
                    Nenhum tipo de quarto cadastrado.
                  </td>
                </tr>
              ) : (
                tipos.map(tipo => (
                  <tr key={tipo.id}>
                    <td className="ps-4">{tipo.id}</td>
                    <td>{tipo.nome}</td>
                    <td>R$ {Number(tipo.valor).toFixed(2)}</td>
                    <td className="text-center">
                      <div className="btn-group">
                        <Link
                          to={`/tipo_quarto/editar/${tipo.id}`}
                          className="btn btn-sm btn-outline-warning"
                          title="Editar"
                        >
                          <i className="bi bi-pencil" /> Editar
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Excluir"
                          onClick={() => excluir(tipo.id)}
                        >
                          <i className="bi bi-trash" /> Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListaTipoQuarto;
