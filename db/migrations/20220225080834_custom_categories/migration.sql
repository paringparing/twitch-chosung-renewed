-- CreateTable
CREATE TABLE "CustomCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT false,
    "difficulty" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "CustomCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnCustomCategories" (
    "categoryId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UsersOnCustomCategories_pkey" PRIMARY KEY ("categoryId","userId")
);

-- CreateTable
CREATE TABLE "CustomWord" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "word" TEXT NOT NULL,
    "hint" TEXT NOT NULL,

    CONSTRAINT "CustomWord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomWord_categoryId_word_key" ON "CustomWord"("categoryId", "word");

-- AddForeignKey
ALTER TABLE "CustomCategory" ADD CONSTRAINT "CustomCategory_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCustomCategories" ADD CONSTRAINT "UsersOnCustomCategories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCustomCategories" ADD CONSTRAINT "UsersOnCustomCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CustomCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomWord" ADD CONSTRAINT "CustomWord_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CustomCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
