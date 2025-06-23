import { Role, Status } from '@prisma/client';
import { ServiceResponseDTO } from '../services/services.dto';
export declare class CreateUserRequestDTO {
    name: string;
    email: string;
    password: string;
    phone?: string;
    location?: string;
    imageUrl?: string;
    role?: Role;
}
export declare class UpdateUserRequestDTO {
    name?: string;
    phone?: string;
    location?: string;
    about?: string;
    lat?: number;
    lng?: number;
    status?: Status;
    verified?: boolean;
    isOnline?: boolean;
    lastSeen?: Date;
}
export declare class UploadPhotoDTO {
    file: any;
}
export declare class UserResponseDTO {
    id: number;
    name: string;
    email: string;
    role: Role;
    status: Status;
    phone?: string;
    location?: string;
    imageUrl?: string;
    about?: string;
    lat?: number;
    lng?: number;
    verified: boolean;
    isOnline: boolean;
    lastSeen?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class UpdateEmailDTO {
    email: string;
}
export declare class UpdatePasswordDTO {
    currentPassword: string;
    newPassword: string;
}
export declare class UpdateStatusDTO {
    status: 'pendente' | 'ativo' | 'suspenso';
}
export declare class ServiceIdsDTO {
    serviceIds: number[];
}
export declare class ProviderWithServicesDTO {
    provider: UserResponseDTO;
    services: ServiceResponseDTO[];
}
export declare class HttpErrorResponseDTO {
    message: string;
    error: string;
    statusCode: number;
}
