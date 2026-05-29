import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../../servicos/api';

function DetalheReserva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    get(`reserva/${id}`)
      .then(setReserva)
      .catch(() => setErro('Reserva não encontrada.'));
  }, [id]);

  const formatarData = (data) =>
    new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

  const calcularDias = (inicio, fim) =>
    Math.ceil((new Date(fim) - new Date(inicio)) / (1000 * 60 * 60 * 24));

  if (erro) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">{erro}</div>
      </div>
    );
  }

  if (!reserva) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Carregando...</p>
      </div>
    );
  }

  const dias = calcularDias(reserva.checkin, reserva.checkout);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">

          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Detalhes da Reserva #{reserva.id}</h5>
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-light"
                  onClick={() => navigate(`/reserva/editar/${reserva.id}`)}
                >
                  <i className="bi bi-pencil me-1" /> Editar
                </button>
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => navigate('/reserva')}
                >
                  Voltar
                </button>
              </div>
            </div>
            <div className="card-body p-4">

              <h6 className="text-muted text-uppercase mb-3">Hóspede</h6>
              <div className="row mb-4">
                <div className="col-sm-4 fw-bold">Cliente</div>
                <div className="col-sm-8">{reserva.cliente}</div>
              </div>

              <hr />
              <h6 className="text-muted text-uppercase mb-3">Período</h6>
              <div className="row mb-2">
                <div className="col-sm-4 fw-bold">Check-in</div>
                <div className="col-sm-8">{formatarData(reserva.checkin)}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4 fw-bold">Check-out</div>
                <div className="col-sm-8">{formatarData(reserva.checkout)}</div>
              </div>
              <div className="row mb-4">
                <div className="col-sm-4 fw-bold">Duração</div>
                <div className="col-sm-8">
                  <span className="badge bg-secondary">
                    {dias} {dias === 1 ? 'dia' : 'dias'}
                  </span>
                </div>
              </div>

              <hr />
              <h6 className="text-muted text-uppercase mb-3">Quarto e Valores</h6>
              <div className="row mb-2">
                <div className="col-sm-4 fw-bold">Tipo de Quarto</div>
                <div className="col-sm-8">{reserva.tipo_quarto?.nome ?? '—'}</div>
              </div>
              <div className="row">
                <div className="col-sm-4 fw-bold fs-5">Valor Total</div>
                <div className="col-sm-8 fs-5 fw-bold text-success">
                  R$ {Number(reserva.valor_total).toFixed(2)}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DetalheReserva;
