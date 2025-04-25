import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const criarImagemEvento = async (req: Request, res: Response) => {
  try {
    const { evento_id, url, descricao, ordem } = req.body;

    const novaImagemEvento = await prisma.imagemEvento.create({
      data: { evento_id, url, descricao, ordem },
    });

    return res.status(201).json(novaImagemEvento);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao criar a imagem do evento", detalhes: error });
  }
};

export const atualizarImagemEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { url, descricao, ordem } = req.body;

    const imagemEventoAtualizado = await prisma.imagemEvento.update({
      where: { id: Number(id) },
      data: { url, descricao, ordem },
    });

    return res.status(201).json(imagemEventoAtualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao actualizar a imagem do evento", detalhes: error });
  }
};

export const listarImagemEventos = async (req: Request, res: Response) => {
  try {
    const imagensEvento = await prisma.imagemEvento.findMany();
    return res.status(200).json(imagensEvento);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao listar as imagens do eventos", detalhes: error });
  }
};
