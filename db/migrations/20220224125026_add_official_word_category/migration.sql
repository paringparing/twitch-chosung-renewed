-- CreateTable
CREATE TABLE "OfficialCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OfficialCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficialWord" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "word" TEXT NOT NULL,
    "hint" TEXT NOT NULL,

    CONSTRAINT "OfficialWord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OfficialWord" ADD CONSTRAINT "OfficialWord_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "OfficialCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
