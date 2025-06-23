"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedServices = SeedServices;
const fs = require("fs");
const path = require("path");
const prisma_service_1 = require("../connection/prisma.service");
const prisma = new prisma_service_1.PrismaService();
const servicesFilePath = path.join(__dirname, '../json/SERVICES.json');
const readJson = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};
const services = readJson(servicesFilePath);
async function SeedServices() {
    for (const service of services) {
        await prisma.service.upsert({
            where: { id: service.id },
            update: service,
            create: service,
        });
    }
    console.log('services seeded');
}
//# sourceMappingURL=service.seed.js.map