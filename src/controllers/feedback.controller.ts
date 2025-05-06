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

export const buscarFeedbacksPorUsuario = async (
  req: Request,
  res: Response
) => {
  try {
    const { usuario_id } = req.params;

    // Verifica se o ID do usuário foi fornecido
    if (!usuario_id) {
      return res.status(400).json({ erro: "ID do usuário é obrigatório" });
    }

    const feedbacks = await prisma.feedback.findMany({
      where: {
        aluno_id: Number(usuario_id),
      },
      select: {
        id: true,
        texto: true,
        pontuacao: true,
        data_criacao: true,
        professor: {
          select: {
            nome: true,
            sobrenome: true,
            email: true,
          },
        },
        evento: {
          select: {
            titulo: true,
          },
        },
      },
      orderBy: {
        data_criacao: "desc",
      },
    });

    // Formata a resposta para simplificar a estrutura
    const feedbacksFormatados = feedbacks.map((feedback) => ({
      id: feedback.id,
      texto: feedback.texto,
      pontuacao: feedback.pontuacao,
      data_criacao: feedback.data_criacao,
      professor_nome: `${feedback.professor.nome} ${feedback.professor.sobrenome}`,
      professor_email: feedback.professor.email,
      evento_titulo: feedback.evento.titulo,
    }));

    return res.status(200).json(feedbacksFormatados);
  } catch (error) {
    console.error("Erro detalhado:", error);
    return res
      .status(500)
      .json({ erro: "Erro ao buscar feedbacks do usuário", detalhes: error });
  }
};

export const buscarFeedbacksPorProfessor = async (
  req: Request,
  res: Response
) => {
  try {
    const { professor_id } = req.params;

    // Verifica se o ID do usuário foi fornecido
    if (!professor_id) {
      return res.status(400).json({ erro: "ID do usuário é obrigatório" });
    }

    const feedbacks = await prisma.feedback.findMany({
      where: {
        professor_id: Number(professor_id),
      },
      select: {
        id: true,
        texto: true,
        pontuacao: true,
        data_criacao: true,
        aluno: {
          select: {
            nome: true,
            sobrenome: true,
            email: true,
          },
        },
        evento: {
          select: {
            titulo: true,
          },
        },
      },
      orderBy: {
        data_criacao: "desc",
      },
    });

    // Formata a resposta para simplificar a estrutura
    const feedbacksFormatados = feedbacks.map((feedback) => ({
      id: feedback.id,
      texto: feedback.texto,
      pontuacao: feedback.pontuacao,
      data_criacao: feedback.data_criacao,
      aluno_nome: `${feedback.aluno.nome} ${feedback.aluno.sobrenome}`,
      professor_email: feedback.aluno.email,
      evento_titulo: feedback.evento.titulo,
    }));

    return res.status(200).json(feedbacksFormatados);
  } catch (error) {
    console.error("Erro detalhado:", error);
    return res
      .status(500)
      .json({ erro: "Erro ao buscar feedbacks do usuário", detalhes: error });
  }
};
