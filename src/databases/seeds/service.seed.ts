import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../connection/prisma.service';

const prisma = new PrismaService();
const servicesFilePath = path.join(__dirname, '../json/SERVICES.json');

interface IService {
  id: number;
  categoryId: number;
  name: string;
  description: string;
}

const readJson = <T>(filePath: string): T => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as T;
};
const services: IService[] = readJson<IService[]>(servicesFilePath);

export async function SeedServices() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: service,
      create: service,
    });
  }
  console.log('services seeded');
}
