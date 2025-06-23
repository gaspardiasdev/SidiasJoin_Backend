import { CreateLikeDto } from './like.dto';
import { PrismaService } from 'src/databases/connection/prisma.service';
export declare class LikeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    like(dto: CreateLikeDto): Promise<{
        createdAt: Date;
        providerId: number;
        clientId: number;
    }>;
    unlike(clientId: number, providerId: number): Promise<{
        createdAt: Date;
        providerId: number;
        clientId: number;
    }>;
    exists(clientId: number, providerId: number): Promise<boolean>;
    toggle(dto: CreateLikeDto): Promise<{
        liked: boolean;
        message: string;
    }>;
    listClientsWhoLiked(providerId: number): Promise<({
        client: {
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
        createdAt: Date;
        providerId: number;
        clientId: number;
    })[]>;
    listProvidersLikedByClient(clientId: number): Promise<({
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
        createdAt: Date;
        providerId: number;
        clientId: number;
    })[]>;
}
