import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando o Seed...");

  // Deleta tudo primeiro (se quiser limpar antes de popular)
  await prisma.inscricao.deleteMany();
  await prisma.evento.deleteMany();
  await prisma.usuario.deleteMany();

  console.log("✅ Banco limpo!");

  // Criptografar senhas
  //  const senhaHash = await bcrypt.hash("123456", 10);

  // Criar usuários
  const usuario1 = await prisma.usuario.create({
    data: {
      nome: "João",
      sobrenome: "Silva",
      email: "joao@example.com",
      senha: "teste@G1",
      tipo: "administrador", // ou ADMIN dependendo do seu enum
    },
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nome: "Maria",
      sobrenome: "Souza",
      email: "maria@example.com",
      senha: "teste@G1",
      tipo: "professor",
    },
  });

  const usuario3 = await prisma.usuario.create({
    data: {
      nome: "José",
      sobrenome: "Castelo",
      email: "jose@example.com",
      senha: "teste@G1",
      tipo: "aluno",
    },
  });

  console.log("✅ Usuários criados!");

  // Criar eventos
  /* const evento1 = await prisma.evento.create({
    data: {
      titulo: "Evento de Tecnologia",
      descricao: "Um evento sobre as últimas tendências em tecnologia.",
      data_inicio: new Date("2025-05-10T10:00:00Z"),
      data_fim: new Date("2025-05-12T18:00:00Z"),
      criado_por: usuario2.id, // Maria é a criadora
      local: "Centro de Convenções Luanda",
    },
  });

  const evento2 = await prisma.evento.create({
    data: {
      titulo: "Workshop de Programação",
      descricao: "Aprenda a programar do zero!",
      data_inicio: new Date("2025-06-01T09:00:00Z"),
      data_fim: new Date("2025-06-01T17:00:00Z"),
      criado_por: usuario2.id,
      local: "Escola 42 Luanda",
    },
  });

  console.log("✅ Eventos criados!");

  // Criar inscrições
  await prisma.inscricao.createMany({
    data: [
      {
        usuario_id: usuario1.id,
        evento_id: evento1.id,
        data_inscricao: new Date(),
        status: "confirmado",
      },
      {
        usuario_id: usuario1.id,
        evento_id: evento2.id,
        data_inscricao: new Date(),
        status: "pendente",
      },
    ],
  });*/

  //console.log("✅ Inscrições criadas!");

  console.log("🎉 Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no Seed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
