import { UserService } from './user.service';
import { CreateUserRequestDTO, UpdateUserRequestDTO, UserResponseDTO, ServiceIdsDTO, UpdateEmailDTO, UpdatePasswordDTO, UpdateStatusDTO } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(body: CreateUserRequestDTO): Promise<UserResponseDTO>;
    list(): Promise<UserResponseDTO[]>;
    findById(id: string): Promise<UserResponseDTO>;
    update(id: string, body: UpdateUserRequestDTO): Promise<UserResponseDTO>;
    updatePhoto(id: number, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    delete(id: string): Promise<{
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
    updateVerificationStatus(id: number): Promise<{
        message: string;
    }>;
    addProviderRole(id: number): Promise<{
        message: string;
    }>;
    removeProviderRole(id: number): Promise<{
        message: string;
    }>;
    addServices(userId: number, body: ServiceIdsDTO): Promise<{
        message: string;
    }>;
    removeServices(userId: number, body: ServiceIdsDTO): Promise<{
        message: string;
    }>;
    getProviderWithServices(id: number): Promise<{
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
}
