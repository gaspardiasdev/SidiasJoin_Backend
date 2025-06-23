export declare class CreateServiceRequestDTO {
    categoryId: number;
    name: string;
    description?: string;
}
export declare class UpdateServiceRequestDTO {
    categoryId?: number;
    name?: string;
    description?: string;
    active?: boolean;
}
export declare class ServiceResponseDTO {
    id: number;
    name: string;
    description?: string | null;
    active: boolean;
    categoryId: number;
    createdAt: Date;
}
