import TipoQuarto from "../models/TipoQuarto.js";

async function inserir(req, res) {
  const { nome, valor } = req.body;

  try {
    const novo = await TipoQuarto.create({ nome, valor });
    res.json(novo);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar tipo de quarto" });
  }
}

async function listar(req, res) {
  const lista = await TipoQuarto.findAll();
  res.json(lista);
}

async function selecionar(req, res) {
  const { id } = req.params;

  const item = await TipoQuarto.findByPk(id);

  if (!item) {
    return res.status(404).json({ erro: "Não encontrado" });
  }

  res.json(item);
}

async function alterar(req, res) {
  const { id } = req.params;
  const { nome, valor } = req.body;

  const item = await TipoQuarto.findByPk(id);

  if (!item) {
    return res.status(404).json({ erro: "Não encontrado" });
  }

  await item.update({ nome, valor });

  res.json(item);
}

async function excluir(req, res) {
  const { id } = req.params;

  const item = await TipoQuarto.findByPk(id);

  if (!item) {
    return res.status(404).json({ erro: "Não encontrado" });
  }

  await item.destroy();

  res.json({ mensagem: "Deletado com sucesso" });
}

export default { listar, selecionar, excluir, inserir, alterar };