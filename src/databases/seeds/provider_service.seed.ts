import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../connection/prisma.service';

const prisma = new PrismaService();
const providerServiceFilePath = path.join(__dirname, '../json/PROVIDER_SERVICES.json');

interface IProviderService {
  providerId: number;
  serviceId: number;
  primaryFlag: boolean;
}

const readJson = <T>(filePath: string): T => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as T;
};
const providerServices: IProviderService[] = readJson<IProviderService[]>(providerServiceFilePath);

export async function SeedProviderServices() {
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
