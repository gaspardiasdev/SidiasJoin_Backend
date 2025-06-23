import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../connection/prisma.service';
import { Role, Status } from '@prisma/client';

const prisma = new PrismaService();
const providersFilePath = path.join(__dirname, '../json/PROVIDERS.json');

interface IProvider {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
    location: string;
    imageUrl: string;
    role: keyof typeof Role;
    status: keyof typeof Status;
}

const readJson = <T>(filePath: string): T => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as T;
};
const providers: IProvider[] = readJson<IProvider[]>(providersFilePath);

export async function SeedProviders() {
    for (const provider of providers) {
        await prisma.user.upsert({
            where: { email: provider.email },
            update: {
                ...provider,
                role: Role[provider.role],      
                status: Status[provider.status],
            },
            create: {
                ...provider,
                role: Role[provider.role],      
                status: Status[provider.status],
            },
        });
    }

    console.log('providers seeded');
}