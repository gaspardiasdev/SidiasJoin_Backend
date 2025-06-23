export declare class CreateReviewDto {
    providerId: number;
    clientId: number;
    rating: number;
    comment?: string;
}
export declare class UpdateReviewDto {
    rating?: number;
    comment?: string;
}
