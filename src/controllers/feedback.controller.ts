import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const criarFeedback = async (req: Request, res: Response) => {
  try {
    const { professor_id, aluno_id, evento_id, texto, pontuacao } = req.body;

    const novoFeedback = await prisma.feedback.create({
      data: {
        professor_id,
        aluno_id,
        evento_id,
        texto,
        pontuacao,
      },
    });

    return res.status(201).json(novoFeedback);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao criar Feedback", detalhes: error });
  }
};

export const atualizarFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { professor_id, aluno_id, evento_id, texto, pontuacao } = req.body;

    const FeedbackAtualizado = await prisma.feedback.update({
      where: { id: Number(id) },
      data: {
        professor_id,
        aluno_id,
        evento_id,
        texto,
        pontuacao,
      },
    });

    return res.status(201).json(FeedbackAtualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao actualizar Feedback", detalhes: error });
  }
};

export const listarFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await prisma.feedback.findMany();
    return res.status(200).json(feedbacks);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao listar Feedbacks", detalhes: error });
  }
};
