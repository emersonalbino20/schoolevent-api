import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const criarDestaque = async (req: Request, res: Response) => {
  try {
    const { aluno_id, evento_id, motivo, criado_por } = req.body;
    const novoDestaque = await prisma.destaque.create({
      data: {
        aluno_id,
        evento_id,
        motivo,
        criado_por,
      },
    });
    return res.status(201).json(novoDestaque);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao criar Destaque", detalhes: error });
  }
};

export const atualizarDestaque = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { aluno_id, evento_id, motivo, criado_por } = req.body;
    const DestaqueAtualizado = await prisma.destaque.update({
      where: { id: Number(id) },
      data: {
        aluno_id,
        evento_id,
        motivo,
        criado_por,
      },
    });
    return res.status(201).json(DestaqueAtualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao actualizar Destaque", detalhes: error });
  }
};

export const listarDestaques = async (req: Request, res: Response) => {
  try {
    const destaques = await prisma.destaque.findMany();
    return res.status(200).json(destaques);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao listar Destaques", detalhes: error });
  }
};

export const buscarDestaquesDoEvento = async (req: Request, res: Response) => {
  try {
    const { evento_id } = req.params;
    
    // Buscar dados do evento
    const evento = await prisma.evento.findUnique({
      where: { id: Number(evento_id) },
      include: {
        criador: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            email: true,
            foto_perfil: true,
          }
        },
        imagens: true,
      }
    });

    if (!evento) {
      return res.status(404).json({ erro: "Evento não encontrado" });
    }

    // Buscar feedbacks do evento
    const feedbacks = await prisma.feedback.findMany({
      where: { evento_id: Number(evento_id) },
      include: {
        aluno: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            email: true,
            foto_perfil: true,
          }
        },
        professor: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
          }
        }
      }
    });

    // Buscar os 10 primeiros alunos com pontuação >= 3
    const alunosDestacados = await prisma.usuario.findMany({
      where: {
        feedbacks_recebidos: {
          some: {
            evento_id: Number(evento_id),
            pontuacao: {
              gte: 3
            }
          }
        },
        tipo: 'aluno'
      },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        email: true,
        foto_perfil: true,
        feedbacks_recebidos: {
          where: {
            evento_id: Number(evento_id),
            pontuacao: {
              gte: 3
            }
          },
          include: {
            professor: {
              select: {
                id: true,
                nome: true,
                sobrenome: true
              }
            }
          }
        }
      },
      take: 2,
      orderBy: {
        nome: 'asc'
      }
    });

    // Buscar destaques já registrados para o evento
    const destaques = await prisma.destaque.findMany({
      where: { evento_id: Number(evento_id) },
      include: {
        aluno: {
          select: {
            id: true, 
            nome: true,
            sobrenome: true,
            email: true,
            foto_perfil: true
          }
        },
        professor: {
          select: {
            id: true,
            nome: true,
            sobrenome: true
          }
        }
      }
    });

    return res.status(200).json({
      evento,
      feedbacks,
      destaques,
      alunosDestacados
    });
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao buscar destaques do evento", detalhes: error });
  }
};

// Manter o método antigo para compatibilidade
export const buscarDestaque = async (req: Request, res: Response) => {
  try {
    const { evento_id } = req.params;
    const destaques = await prisma.destaque.findMany({
      where: { evento_id: Number(evento_id) },
    });
    return res.status(200).json(destaques);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao buscar o destaque", detalhes: error });
  }
};
