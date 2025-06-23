"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedCategories = SeedCategories;
const fs = require("fs");
const path = require("path");
const prisma_service_1 = require("../connection/prisma.service");
const prisma = new prisma_service_1.PrismaService();
const categoriesFilePath = path.join(__dirname, '../json/CATEGORIES.json');
const readJson = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};
const categories = readJson(categoriesFilePath);
async function SeedCategories() {
    for (const category of categories) {
        await prisma.category.upsert({
            where: { id: category.id },
            update: category,
            create: category,
        });
    }
    console.log('categories seeded');
}
//# sourceMappingURL=category.seed.js.map