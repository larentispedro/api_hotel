import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get, post, put } from '../../servicos/api';

function FormReserva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState({
    cliente: '',
    checkin: '',
    checkout: '',
    tipoQuartoId: '',
  });
  const [tipos, setTipos] = useState([]);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    get('tipo_quarto')
      .then(setTipos)
      .catch(() => setErro('Erro ao carregar tipos de quarto.'));

    if (editando) {
      get(`reserva/${id}`)
        .then(dados => setForm({
          cliente: dados.cliente,
          checkin: dados.checkin?.slice(0, 10),
          checkout: dados.checkout?.slice(0, 10),
          tipoQuartoId: dados.tipoQuartoId,
        }))
        .catch(() => setErro('Erro ao carregar reserva.'));
    }
  }, [id, editando]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.checkout <= form.checkin) {
      setErro('A data de check-out deve ser posterior ao check-in.');
      return;
    }

    setCarregando(true);
    setErro(null);
    try {
      if (editando) {
        await put(`reserva/${id}`, form);
      } else {
        await post('reserva', form);
      }
      setSucesso(true);
      setTimeout(() => navigate('/reserva'), 1500);
    } catch (e) {
      setErro('Erro ao salvar reserva. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  // Prévia do valor enquanto o usuário preenche
  const tipoSelecionado = tipos.find(t => String(t.id) === String(form.tipoQuartoId));
  const dias = form.checkin && form.checkout && form.checkout > form.checkin
    ? Math.ceil((new Date(form.checkout) - new Date(form.checkin)) / (1000 * 60 * 60 * 24))
    : null;
  const valorPrevia = dias && tipoSelecionado
    ? dias * Number(tipoSelecionado.valor)
    : null;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">

          {sucesso && (
            <div className="alert alert-success">
              Reserva salva com sucesso! Redirecionando...
            </div>
          )}
          {erro && (
            <div className="alert alert-danger">{erro}</div>
          )}

          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white py-3">
              <h5 className="mb-0">
                {editando ? 'Editar Reserva' : 'Nova Reserva'}
              </h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Cliente</label>
                  <input
                    type="text"
                    name="cliente"
                    className="form-control"
                    value={form.cliente}
                    onChange={handleChange}
                    required
                    placeholder="Nome completo do cliente"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Check-in</label>
                    <input
                      type="date"
                      name="checkin"
                      className="form-control"
                      value={form.checkin}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Check-out</label>
                    <input
                      type="date"
                      name="checkout"
                      className="form-control"
                      value={form.checkout}
                      onChange={handleChange}
                      required
                      min={form.checkin || undefined}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Tipo de Quarto</label>
                  <select
                    name="tipoQuartoId"
                    className="form-select"
                    value={form.tipoQuartoId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um tipo de quarto</option>
                    {tipos.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.nome} — R$ {Number(t.valor).toFixed(2)}/diária
                      </option>
                    ))}
                  </select>
                </div>

                {valorPrevia !== null && (
                  <div className="alert alert-info mb-3">
                    <strong>{dias} {dias === 1 ? 'dia' : 'dias'}</strong> ×{' '}
                    R$ {Number(tipoSelecionado.valor).toFixed(2)} ={' '}
                    <strong>R$ {valorPrevia.toFixed(2)}</strong>
                  </div>
                )}

                <hr />
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-link text-muted"
                    onClick={() => navigate('/reserva')}
                  >
                    Voltar para a lista
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-5"
                    disabled={carregando}
                  >
                    {carregando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Cadastrar'}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FormReserva;
