import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get, post, put } from '../../servicos/api';

function FormTipoQuarto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState({ nome: '', valor: '' });
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (editando) {
      get(`tipo_quarto/${id}`)
        .then(dados => setForm({ nome: dados.nome, valor: dados.valor }))
        .catch(() => setErro('Erro ao carregar tipo de quarto.'));
    }
  }, [id, editando]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    try {
      if (editando) {
        await put(`tipo_quarto/${id}`, form);
      } else {
        await post('tipo_quarto', form);
      }
      setSucesso(true);
      setTimeout(() => navigate('/tipo_quarto'), 1500);
    } catch (e) {
      setErro('Erro ao salvar tipo de quarto. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">

          {sucesso && (
            <div className="alert alert-success">
              Tipo de quarto salvo com sucesso! Redirecionando...
            </div>
          )}
          {erro && (
            <div className="alert alert-danger">{erro}</div>
          )}

          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white py-3">
              <h5 className="mb-0">
                {editando ? 'Editar Tipo de Quarto' : 'Novo Tipo de Quarto'}
              </h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    className="form-control"
                    value={form.nome}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Suíte, Standard, Luxo..."
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Valor por diária (R$)</label>
                  <input
                    type="number"
                    name="valor"
                    className="form-control"
                    value={form.valor}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>

                <hr />
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-link text-muted"
                    onClick={() => navigate('/tipo_quarto')}
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

export default FormTipoQuarto;
