export declare class CreateCategoryRequestDTO {
    name: string;
    description?: string;
}
export declare class UpdateCategoryRequestDTO {
    name?: string;
    description?: string;
}
export declare class CategoryResponseDTO {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
}
