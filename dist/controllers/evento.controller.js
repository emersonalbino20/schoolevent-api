"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarEvento = exports.listarEventosPassados = exports.listarEventos = exports.atualizarEvento = exports.criarEvento = void 0;
const prisma_1 = require("../config/prisma");
const criarEvento = async (req, res) => {
    try {
        const { titulo, descricao, data_inicio, data_fim, local, criado_por } = req.body;
        const novoEvento = await prisma_1.prisma.evento.create({
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
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao criar evento", detalhes: error });
    }
};
exports.criarEvento = criarEvento;
const atualizarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, data_inicio, data_fim, local, criado_por } = req.body;
        const eventoAtualizado = await prisma_1.prisma.evento.update({
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
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao actualizar evento", detalhes: error });
    }
};
exports.atualizarEvento = atualizarEvento;
const listarEventos = async (req, res) => {
    try {
        const eventos = await prisma_1.prisma.evento.findMany({
            where: {
                data_inicio: {
                    gte: new Date(), // apenas eventos a partir de agora
                },
            },
            orderBy: {
                data_inicio: 'asc',
            },
            take: 5, // limita a 5 eventos
            include: {
                criador: {
                    select: {
                        nome: true,
                        sobrenome: true,
                        tipo: true,
                        email: true
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
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao listar eventos", detalhes: error });
    }
};
exports.listarEventos = listarEventos;
const listarEventosPassados = async (req, res) => {
    try {
        const eventos = await prisma_1.prisma.evento.findMany({
            where: {
                data_inicio: {
                    lt: new Date(), // Eventos cuja data_inicio é anterior ao momento atual
                },
            },
            orderBy: {
                data_inicio: 'desc', // Do mais recente ao mais antigo
            },
            take: 5, // Limita a 5 eventos
            include: {
                criador: {
                    select: {
                        nome: true,
                        sobrenome: true,
                        tipo: true,
                        email: true
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
                            }
                        }
                    }
                }
            },
        });
        return res.status(200).json(eventos);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao listar eventos passados", detalhes: error });
    }
};
exports.listarEventosPassados = listarEventosPassados;
const buscarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await prisma_1.prisma.evento.findMany({
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
                        email: true
                    },
                },
                comentarios: {
                    select: {
                        usuario: { select: {
                                nome: true,
                                sobrenome: true,
                                tipo: true,
                                foto_perfil: true
                            }
                        },
                        texto: true
                    }
                }
            },
        });
        return res.status(200).json(evento);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao buscar o evento", detalhes: error });
    }
};
exports.buscarEvento = buscarEvento;
