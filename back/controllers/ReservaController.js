import Reserva from "../models/Reserva.js";
import TipoQuarto from "../models/TipoQuarto.js";

async function inserir(req, res) {
  const { cliente, checkin, checkout, tipoQuartoId } = req.body;

  try {
    const tipo = await TipoQuarto.findByPk(tipoQuartoId);

    if (!tipo) {
      return res.status(404).json({ erro: "Tipo de quarto não encontrado" });
    }

    const dataInicio = new Date(checkin);
    const dataFim = new Date(checkout);

    const dias = Math.ceil((dataFim - dataInicio) / (1000 * 60 * 60 * 24));
    const valor_total = dias * tipo.valor;

    const reserva = await Reserva.create({
      cliente,
      checkin,
      checkout,
      tipoQuartoId,
      valor_total
    });

    res.json({
      reserva,
      dias,
      valor_total
    });

  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar reserva" });
  }
}

async function listar(req, res) {
  const lista = await Reserva.findAll({ include: TipoQuarto });
  res.json(lista);
}

async function selecionar(req, res) {
  const { id } = req.params;

  const reserva = await Reserva.findByPk(id, {
    include: TipoQuarto
  });

  if (!reserva) {
    return res.status(404).json({ erro: "Reserva não encontrada" });
  }

  res.json(reserva);
}

async function alterar(req, res) {
  const { id } = req.params;
  const { cliente, checkin, checkout, tipoQuartoId } = req.body;

  try {
    const reserva = await Reserva.findByPk(id);

    if (!reserva) {
      return res.status(404).json({ erro: "Reserva não encontrada" });
    }

    const tipo = await TipoQuarto.findByPk(tipoQuartoId);

    if (!tipo) {
      return res.status(404).json({ erro: "Tipo de quarto não encontrado" });
    }

    const dataInicio = new Date(checkin);
    const dataFim = new Date(checkout);
    const dias = Math.ceil((dataFim - dataInicio) / (1000 * 60 * 60 * 24));
    const valor_total = dias * tipo.valor;

    await reserva.update({
      cliente,
      checkin,
      checkout,
      tipoQuartoId,
      valor_total
    });

    res.json(reserva);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao alterar reserva" });
  }
}

async function excluir(req, res) {
  const { id } = req.params;

  const reserva = await Reserva.findByPk(id);

  if (!reserva) {
    return res.status(404).json({ erro: "Reserva não encontrada" });
  }

  await reserva.destroy();

  res.json({ mensagem: "Reserva deletada com sucesso" });
}

export default { listar, selecionar, excluir, inserir, alterar };