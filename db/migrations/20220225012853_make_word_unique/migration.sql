/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,word]` on the table `OfficialWord` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OfficialWord_categoryId_word_key" ON "OfficialWord"("categoryId", "word");
