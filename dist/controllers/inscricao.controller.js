"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarInscricoes = exports.atualizarInscricao = exports.criarInscricao = void 0;
const prisma_1 = require("../config/prisma");
const criarInscricao = async (req, res) => {
    try {
        const { usuario_id, evento_id, data_inscricao, status } = req.body;
        const novaInscricao = await prisma_1.prisma.inscricao.create({
            data: { usuario_id, evento_id, data_inscricao, status },
        });
        return res.status(201).json(novaInscricao);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao criar inscrição", detalhes: error });
    }
};
exports.criarInscricao = criarInscricao;
const atualizarInscricao = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario_id, evento_id, data_inscricao, status } = req.body;
        const inscricaoAtualizado = await prisma_1.prisma.inscricao.update({
            where: { id: Number(id) },
            data: { usuario_id, evento_id, data_inscricao, status },
        });
        return res.status(201).json(inscricaoAtualizado);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao actualizar a inscrição", detalhes: error });
    }
};
exports.atualizarInscricao = atualizarInscricao;
const listarInscricoes = async (req, res) => {
    try {
        const inscricoes = await prisma_1.prisma.inscricao.findMany();
        return res.status(200).json(inscricoes);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao listar as inscrições", detalhes: error });
    }
};
exports.listarInscricoes = listarInscricoes;
