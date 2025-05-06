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
    const eventos = await prisma.evento.findMany({
      where: {
        data_fim: {
          gte: new Date(), // eventos que ainda não terminaram
        },
      },
      orderBy: {
        data_inicio: 'asc',
      },
      take: 5,
      include: {
        criador: {
          select: {
            nome: true,
            sobrenome: true,
            tipo: true,
            email: true,
          },
        },
        inscricoes: {
          select: {
            usuario: true,
          },
        },
        imagens: {
          select: {
            url: true,
            ordem: true,
          },
        },
        destaques: {
          select: {
            aluno: {
              select: {
                nome: true,
                sobrenome: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(eventos);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao listar eventos", detalhes: error });
  }
};

export const listarEventosPassados = async (req: Request, res: Response) => {
  try {
    const eventos = await prisma.evento.findMany({
      where: {
        data_fim: {
          lt: new Date(), // eventos já finalizados
        },
      },
      orderBy: {
        data_fim: 'desc', // do mais recente finalizado para o mais antigo
      },
      take: 5,
      include: {
        criador: {
          select: {
            nome: true,
            sobrenome: true,
            tipo: true,
            email: true,
          },
        },
        inscricoes: {
          select: {
            usuario: true,
          },
        },
        imagens: {
          select: {
            url: true,
            ordem: true,
          },
        },
        destaques: {
          select: {
            aluno: {
              select: {
                nome: true,
                sobrenome: true,
                email: true,
              },
            },
          },
        },
        comentarios: {
          select: {
            usuario: {
              select: {
                foto_perfil: true,
                nome: true,
                tipo: true,
                comentarios: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao listar eventos passados",
      detalhes: error,
    });
  }
};


/*
export const buscarEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Verificar se o evento existe
    const eventoExiste = await prisma.evento.findUnique({
      where: { id: Number(id) }
    });

    if (!eventoExiste) {
      return res.status(404).json({ erro: "Evento não encontrado" });
    }
    
    // Buscar o evento com todas as relações
    const evento = await prisma.evento.findUnique({
      where: { id: Number(id) },
      include: {
        imagens: {
          select: {
            url: true,
            ordem: true,
          },
        },
        inscricoes: {
          select: {
            usuario: {
              select: {
                email: true,
                ativo: true,
              },
            },
          },
        },
        feedbacks: {
          select: {
            aluno_id: true,
            professor_id: true,
            pontuacao: true,
            aluno: {
              select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                foto_perfil: true,
              }
            }
          },
        },
        destaques: {
          select: {
            aluno: {
              select: {
                nome: true,
                sobrenome: true,
                email: true,
              },
            },
          },
        },
        criador: {
          select: {
            nome: true,
            sobrenome: true,
            tipo: true,
            email: true,
          },
        },
        comentarios: {
          select: {
            usuario: {
              select: {
                nome: true,
                sobrenome: true,
                tipo: true,
                foto_perfil: true,
                id: true,
                email: true,
              },
            },
            texto: true,
          },
        },
      },
    });

    // Buscar os alunos com pontuação >= 3 de forma simplificada
    const alunosComFeedbacks = await prisma.feedback.findMany({
      where: {
        evento_id: Number(id),
        pontuacao: {
          gte: 3
        }
      },
      select: {
        pontuacao: true,
        texto: true,
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
            sobrenome: true
          }
        }
      },
      orderBy: {
        pontuacao: 'desc'
      },
      take: 30 // Buscar mais do que precisamos para processar
    });

    // Processar para obter os 10 primeiros alunos únicos
    const alunosProcessados = new Map();
    
    alunosComFeedbacks.forEach(feedback => {
      if (!alunosProcessados.has(feedback.aluno.id)) {
        alunosProcessados.set(feedback.aluno.id, {
          ...feedback.aluno,
          feedback: {
            pontuacao: feedback.pontuacao,
            texto: feedback.texto,
            professor: feedback.professor
          }
        });
      }
    });

    // Obter os 10 primeiros alunos destacados
    const alunosDestacados = Array.from(alunosProcessados.values()).slice(0, 10);

    // Retornar o evento e os alunos destacados
    return res.status(200).json({
      evento,
      alunosDestacados
    });
  } catch (error) {
    console.error("Erro detalhado:", error);
    return res
      .status(500)
      .json({ erro: "Erro ao buscar o evento", detalhes: error });
  }
};*/
export const buscarEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const evento = await prisma.evento.findMany({
      where: { id: Number(id) },
      include: {
        imagens: {
          select: {
            url: true,
            ordem: true,
          },
        },
        inscricoes: {
          select: {
            usuario: {
              select: {
                email: true,
                ativo: true,
              },
            },
          },
        },
        feedbacks: {
          select: {
            aluno_id: true,
            professor_id: true,
        pontuacao: true,
          },
        },
        destaques: {
          select: {
            aluno: {
              select: {
                nome: true,
                sobrenome: true,
                email: true,
              },
            },
          },
        },
        criador: {
          select: {
            nome: true,
            sobrenome: true,
            tipo: true,
            email: true,
          },
        },
        comentarios: {
          select: {
            usuario: {
              select: {
                nome: true,
                sobrenome: true,
                tipo: true,
                foto_perfil: true,
                id: true,
                email: true,
              },
            },
            texto: true,
          },
        },
      },
    });
    return res.status(200).json(evento);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao buscar o evento", detalhes: error });
  }
};
