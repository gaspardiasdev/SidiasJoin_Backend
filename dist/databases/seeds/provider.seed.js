"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedProviders = SeedProviders;
const fs = require("fs");
const path = require("path");
const prisma_service_1 = require("../connection/prisma.service");
const client_1 = require("@prisma/client");
const prisma = new prisma_service_1.PrismaService();
const providersFilePath = path.join(__dirname, '../json/PROVIDERS.json');
const readJson = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};
const providers = readJson(providersFilePath);
async function SeedProviders() {
    for (const provider of providers) {
        await prisma.user.upsert({
            where: { email: provider.email },
            update: {
                ...provider,
                role: client_1.Role[provider.role],
                status: client_1.Status[provider.status],
            },
            create: {
                ...provider,
                role: client_1.Role[provider.role],
                status: client_1.Status[provider.status],
            },
        });
    }
    console.log('providers seeded');
}
//# sourceMappingURL=provider.seed.js.map