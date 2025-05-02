/*
  Warnings:

  - A unique constraint covering the columns `[aluno_id,evento_id,criado_por]` on the table `destaques` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "destaques_aluno_id_evento_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "destaques_aluno_id_evento_id_criado_por_key" ON "destaques"("aluno_id", "evento_id", "criado_por");
