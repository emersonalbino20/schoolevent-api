"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarMinhasInscricoes = exports.buscarUsuario = exports.listarUsuarios = exports.atualizarUsuario = exports.criarUsuario = void 0;
const prisma_1 = require("../config/prisma");
const criarUsuario = async (req, res) => {
    try {
        const { nome, sobrenome, email, senha, tipo } = req.body;
        const usuario = await prisma_1.prisma.usuario.findUnique({
            where: { email },
        });
        if (usuario?.email) {
            return res.status(404).json({ erro: "o e-mail já está em uso." });
        }
        const novoUsuario = await prisma_1.prisma.usuario.create({
            data: { nome, sobrenome, email, senha, tipo },
        });
        return res.status(201).json(novoUsuario);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "o e-mail já está em uso.", detalhes: error });
    }
};
exports.criarUsuario = criarUsuario;
const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sobrenome, email, tipo, senha } = req.body;
        const usuarioAtualizado = await prisma_1.prisma.usuario.update({
            where: { id: Number(id) },
            data: { nome, sobrenome, email, tipo, senha },
        });
        return res.status(201).json(usuarioAtualizado);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "o email pertence a um outro usuário", detalhes: error });
    }
};
exports.atualizarUsuario = atualizarUsuario;
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await prisma_1.prisma.usuario.findMany();
        return res.status(200).json(usuarios);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao listar usuários", detalhes: error });
    }
};
exports.listarUsuarios = listarUsuarios;
const buscarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await prisma_1.prisma.usuario.findMany({
            where: { id: Number(id) },
        });
        return res.status(200).json(usuario);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao buscar o usuário", detalhes: error });
    }
};
exports.buscarUsuario = buscarUsuario;
const buscarMinhasInscricoes = async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const usuario = await prisma_1.prisma.inscricao.findMany({
            where: { usuario_id: Number(usuario_id) },
            include: {
                evento: {
                    select: {
                        id: true,
                        titulo: true,
                        descricao: true,
                        data_inicio: true,
                        data_fim: true,
                        criador: {
                            select: {
                                id: true,
                                nome: true,
                                sobrenome: true,
                                email: true,
                                foto_perfil: true,
                                ativo: false,
                            },
                        },
                        local: true,
                    },
                },
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        sobrenome: true,
                        foto_perfil: true,
                    },
                },
            },
        });
        return res.status(200).json(usuario);
    }
    catch (error) {
        return res.status(500).json({
            erro: "Erro ao buscar as inscrições em eventos do usuário",
            detalhes: error,
        });
    }
};
exports.buscarMinhasInscricoes = buscarMinhasInscricoes;
