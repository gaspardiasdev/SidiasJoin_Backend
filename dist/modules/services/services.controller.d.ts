import { CreateServiceRequestDTO, UpdateServiceRequestDTO } from './services.dto';
import { ServicesService } from './services.service';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServicesService);
    create(data: CreateServiceRequestDTO): Promise<{
        description: string | null;
        categoryId: number;
        name: string;
        active: boolean;
        id: number;
        createdAt: Date;
    }>;
    list(categoryId?: number, name?: string): Promise<{
        description: string | null;
        categoryId: number;
        name: string;
        active: boolean;
        id: number;
        createdAt: Date;
    }[]>;
    findById(id: number): Promise<{
        description: string | null;
        categoryId: number;
        name: string;
        active: boolean;
        id: number;
        createdAt: Date;
    }>;
    update(id: number, data: UpdateServiceRequestDTO): Promise<{
        description: string | null;
        categoryId: number;
        name: string;
        active: boolean;
        id: number;
        createdAt: Date;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
    getProvidersByService(serviceId: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        email: string;
        phone: string | null;
        location: string | null;
        imageUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
        about: string | null;
        lat: import("@prisma/client/runtime/library").Decimal | null;
        lng: import("@prisma/client/runtime/library").Decimal | null;
        status: import(".prisma/client").$Enums.Status;
        verified: boolean;
        isOnline: boolean;
        lastSeen: Date | null;
        updatedAt: Date;
        passwordHash: string;
    }[]>;
}
