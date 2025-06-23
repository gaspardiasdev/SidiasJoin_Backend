import { PrismaService } from 'src/databases/connection/prisma.service';
import { CreateCategoryRequestDTO, UpdateCategoryRequestDTO } from './category.dto';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCategoryRequestDTO): Promise<{
        description: string | null;
        name: string;
        id: number;
        createdAt: Date;
    }>;
    list(): Promise<{
        description: string | null;
        name: string;
        id: number;
        createdAt: Date;
    }[]>;
    findById(id: number): Promise<{
        description: string | null;
        name: string;
        id: number;
        createdAt: Date;
    }>;
    update(id: number, data: UpdateCategoryRequestDTO): Promise<{
        description: string | null;
        name: string;
        id: number;
        createdAt: Date;
    } | undefined>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
