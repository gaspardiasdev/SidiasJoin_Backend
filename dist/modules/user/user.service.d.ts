import { PrismaService } from 'src/databases/connection/prisma.service';
import { CreateUserRequestDTO, UpdateUserRequestDTO, UserResponseDTO, UpdateEmailDTO, UpdatePasswordDTO, UpdateStatusDTO } from './user.dto';
import { UploadService } from 'src/utils/upload/upload.service';
export declare class UserService {
    private prisma;
    private readonly uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    create(data: CreateUserRequestDTO): Promise<UserResponseDTO>;
    list(): Promise<UserResponseDTO[]>;
    findById(id: number): Promise<UserResponseDTO>;
    findByEmail(email: string): Promise<{
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
    } | null>;
    update(id: number, data: UpdateUserRequestDTO): Promise<UserResponseDTO>;
    updatePhoto(id: number, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
    updateEmail(userId: number, dto: UpdateEmailDTO): Promise<{
        message: string;
    }>;
    updatePassword(userId: number, dto: UpdatePasswordDTO): Promise<{
        message: string;
    }>;
    updateStatus(userId: number, data: UpdateStatusDTO): Promise<{
        message: string;
    }>;
    addProviderRole(userId: number): Promise<void>;
    removeProviderRole(userId: number): Promise<void>;
    addServicesToProvider(userId: number, serviceIds: number[]): Promise<void>;
    removeServicesFromProvider(userId: number, serviceIds: number[]): Promise<{
        message: string;
    }>;
    getServicesByProvider(userId: number): Promise<{
        primaryFlag: boolean;
        description: string | null;
        categoryId: number;
        name: string;
        active: boolean;
        id: number;
        createdAt: Date;
    }[]>;
    setPrimaryFlag(providerId: number, serviceId: number): Promise<{
        message: string;
    }>;
    updateVerificationStatus(id: number): Promise<{
        message: string;
    }>;
    private ensureUserExists;
    private removeSensitiveFields;
    private ensureServicesExist;
}
