import { PrismaService } from 'src/databases/connection/prisma.service';
export declare class AdminActionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    logAction(params: {
        adminId: number;
        providerId: number;
        action: string;
        note?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        providerId: number;
        adminId: number;
        action: string;
        note: string | null;
    }>;
    listAllLogs(): Promise<({
        admin: {
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
        };
        provider: {
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
        };
    } & {
        id: number;
        createdAt: Date;
        providerId: number;
        adminId: number;
        action: string;
        note: string | null;
    })[]>;
    listByAdmin(adminId: number): Promise<({
        provider: {
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
        };
    } & {
        id: number;
        createdAt: Date;
        providerId: number;
        adminId: number;
        action: string;
        note: string | null;
    })[]>;
    listByProvider(providerId: number): Promise<({
        admin: {
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
        };
    } & {
        id: number;
        createdAt: Date;
        providerId: number;
        adminId: number;
        action: string;
        note: string | null;
    })[]>;
}
