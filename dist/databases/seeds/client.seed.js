"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedClients = SeedClients;
const fs = require("fs");
const path = require("path");
const prisma_service_1 = require("../connection/prisma.service");
const client_1 = require("@prisma/client");
const prisma = new prisma_service_1.PrismaService();
const clientsFilePath = path.join(__dirname, '../json/CLIENTS.json');
const readJson = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};
const clients = readJson(clientsFilePath);
async function SeedClients() {
    for (const client of clients) {
        await prisma.user.upsert({
            where: { email: client.email },
            update: {
                ...client,
                role: client_1.Role[client.role],
                status: client_1.Status[client.status],
            },
            create: {
                ...client,
                role: client_1.Role[client.role],
                status: client_1.Status[client.status],
            },
        });
    }
    console.log('clients seeded');
}
//# sourceMappingURL=client.seed.js.map