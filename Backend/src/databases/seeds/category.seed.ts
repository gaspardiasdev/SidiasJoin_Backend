import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../connection/prisma.service';

const prisma = new PrismaService();
const categoriesFilePath = path.join(__dirname, '../json/CATEGORIES.json');

interface ICategory {
  id: number;
  name: string;
  description: string;
}

const readJson = <T>(filePath: string): T => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as T;
};
const categories: ICategory[] = readJson<ICategory[]>(categoriesFilePath);

export async function SeedCategories() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: category,
    });
  }
  console.log('categories seeded');
}
