import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../connection/prisma.service';
import { Role, Status } from '@prisma/client';

const prisma = new PrismaService();
const clientsFilePath = path.join(__dirname, '../json/CLIENTS.json');

interface IClient {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    phone?: string;
    location?: string;
    imageUrl?: string;
    role: keyof typeof Role;
    status: keyof typeof Status;
}

const readJson = <T>(filePath: string): T => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as T;
};

const clients: IClient[] = readJson<IClient[]>(clientsFilePath);

export async function SeedClients() {
    for (const client of clients) {
        await prisma.user.upsert({
            where: { email: client.email },
            update: {
                ...client,
                role: Role[client.role],
                status: Status[client.status],
            },
            create: {
                ...client,
                role: Role[client.role],
                status: Status[client.status],
            },
        });
    }

    console.log('clients seeded');
}