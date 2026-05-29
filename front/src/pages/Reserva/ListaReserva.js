import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get, del } from '../../servicos/api';

function ListaReserva() {
  const [reservas, setReservas] = useState([]);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);

  const carregarReservas = async () => {
    try {
      const dados = await get('reserva');
      setReservas(dados);
    } catch (e) {
      setErro('Erro ao carregar reservas.');
    }
  };

  useEffect(() => {
    carregarReservas();
  }, []);

  const excluir = async (id) => {
    if (!window.confirm('Deseja excluir esta reserva?')) return;
    try {
      await del(`reserva/${id}`);
      setSucesso('Reserva excluída com sucesso!');
      setErro(null);
      carregarReservas();
      setTimeout(() => setSucesso(null), 3000);
    } catch (e) {
      setErro('Erro ao excluir reserva.');
      setSucesso(null);
    }
  };

  const formatarData = (data) =>
    new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

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
          <h4 className="mb-0 text-primary">Reservas</h4>
          <Link to="/reserva/nova" className="btn btn-success">
            <i className="bi bi-plus-circle me-2" />
            Nova
          </Link>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Cliente</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Tipo de Quarto</th>
                <th>Valor Total</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {reservas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    Nenhuma reserva cadastrada.
                  </td>
                </tr>
              ) : (
                reservas.map(r => (
                  <tr key={r.id}>
                    <td className="ps-4">{r.id}</td>
                    <td>{r.cliente}</td>
                    <td>{formatarData(r.checkin)}</td>
                    <td>{formatarData(r.checkout)}</td>
                    <td>{r.tipo_quarto?.nome ?? '—'}</td>
                    <td>R$ {Number(r.valor_total).toFixed(2)}</td>
                    <td className="text-center">
                      <div className="btn-group">
                        <Link
                          to={`/reserva/${r.id}`}
                          className="btn btn-sm btn-outline-info"
                          title="Ver detalhes"
                        >
                          <i className="bi bi-eye" /> Ver
                        </Link>
                        <Link
                          to={`/reserva/editar/${r.id}`}
                          className="btn btn-sm btn-outline-warning"
                          title="Editar"
                        >
                          <i className="bi bi-pencil" /> Editar
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Excluir"
                          onClick={() => excluir(r.id)}
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

export default ListaReserva;
