"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedProviderServices = SeedProviderServices;
const fs = require("fs");
const path = require("path");
const prisma_service_1 = require("../connection/prisma.service");
const prisma = new prisma_service_1.PrismaService();
const providerServiceFilePath = path.join(__dirname, '../json/PROVIDER_SERVICES.json');
const readJson = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};
const providerServices = readJson(providerServiceFilePath);
async function SeedProviderServices() {
    for (const item of providerServices) {
        await prisma.providerService.upsert({
            where: {
                providerId_serviceId: {
                    providerId: item.providerId,
                    serviceId: item.serviceId,
                },
            },
            update: {
                primaryFlag: item.primaryFlag,
            },
            create: item,
        });
    }
    console.log('provider services seeded');
}
//# sourceMappingURL=provider_service.seed.js.map