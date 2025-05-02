"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarDestaque = exports.listarDestaques = exports.atualizarDestaque = exports.criarDestaque = void 0;
const prisma_1 = require("../config/prisma");
const criarDestaque = async (req, res) => {
    try {
        const { aluno_id, evento_id, motivo, criado_por } = req.body;
        const novoDestaque = await prisma_1.prisma.destaque.create({
            data: {
                aluno_id,
                evento_id,
                motivo,
                criado_por,
            },
        });
        return res.status(201).json(novoDestaque);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao criar Destaque", detalhes: error });
    }
};
exports.criarDestaque = criarDestaque;
const atualizarDestaque = async (req, res) => {
    try {
        const { id } = req.params;
        const { aluno_id, evento_id, motivo, criado_por } = req.body;
        const DestaqueAtualizado = await prisma_1.prisma.destaque.update({
            where: { id: Number(id) },
            data: {
                aluno_id,
                evento_id,
                motivo,
                criado_por,
            },
        });
        return res.status(201).json(DestaqueAtualizado);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao actualizar Destaque", detalhes: error });
    }
};
exports.atualizarDestaque = atualizarDestaque;
const listarDestaques = async (req, res) => {
    try {
        const destaques = await prisma_1.prisma.destaque.findMany();
        return res.status(200).json(destaques);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao listar Destaques", detalhes: error });
    }
};
exports.listarDestaques = listarDestaques;
const buscarDestaque = async (req, res) => {
    try {
        const { evento_id } = req.params;
        const destaques = await prisma_1.prisma.destaque.findMany({
            where: { evento_id: Number(evento_id) },
        });
        return res.status(200).json(destaques);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao buscar o destaque", detalhes: error });
    }
};
exports.buscarDestaque = buscarDestaque;
