import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const criarEvento = async (req: Request, res: Response) => {
  try {
    const { titulo, descricao, data_inicio, data_fim, local, criado_por } =
      req.body;

    const novoEvento = await prisma.evento.create({
      data: {
        titulo,
        descricao,
        data_inicio: new Date(data_inicio),
        data_fim: new Date(data_fim),
        local,
        criado_por,
      },
    });

    return res.status(201).json(novoEvento);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao criar evento", detalhes: error });
  }
};

export const atualizarEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, data_inicio, data_fim, local, criado_por } =
      req.body;

    const eventoAtualizado = await prisma.evento.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descricao,
        data_inicio: new Date(data_inicio),
        data_fim: new Date(data_fim),
        local,
        criado_por,
      },
    });

    return res.status(201).json(eventoAtualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao actualizar evento", detalhes: error });
  }
};

export const listarEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await prisma.evento.findMany();
    return res.status(200).json(eventos);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao listar eventos", detalhes: error });
  }
};
