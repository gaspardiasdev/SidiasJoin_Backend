import { PrismaService } from 'src/databases/connection/prisma.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './subscription.dto';
export declare class SubscriptionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateSubscriptionDto): Promise<{
        id: number;
        createdAt: Date;
        providerId: number;
        paid: boolean;
        proofUrl: string | null;
        startsAt: Date | null;
        expiresAt: Date | null;
    }>;
    findAll(): Promise<({
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
        paid: boolean;
        proofUrl: string | null;
        startsAt: Date | null;
        expiresAt: Date | null;
    })[]>;
    findByProviderId(providerId: number): Promise<{
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
        paid: boolean;
        proofUrl: string | null;
        startsAt: Date | null;
        expiresAt: Date | null;
    }>;
    update(providerId: number, data: UpdateSubscriptionDto): Promise<{
        id: number;
        createdAt: Date;
        providerId: number;
        paid: boolean;
        proofUrl: string | null;
        startsAt: Date | null;
        expiresAt: Date | null;
    }>;
    delete(providerId: number): Promise<{
        message: string;
    }>;
}
