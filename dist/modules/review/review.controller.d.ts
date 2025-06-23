import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(dto: CreateReviewDto): Promise<{
        id: number;
        createdAt: Date;
        providerId: number;
        clientId: number;
        rating: number;
        comment: string | null;
    }>;
    listByProvider(providerId: number): Promise<({
        client: {
            name: string;
            id: number;
            imageUrl: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        providerId: number;
        clientId: number;
        rating: number;
        comment: string | null;
    })[]>;
    listByClient(clientId: number): Promise<({
        provider: {
            name: string;
            id: number;
            imageUrl: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        providerId: number;
        clientId: number;
        rating: number;
        comment: string | null;
    })[]>;
    findUnique(providerId: number, clientId: number): Promise<{
        id: number;
        createdAt: Date;
        providerId: number;
        clientId: number;
        rating: number;
        comment: string | null;
    } | null>;
    update(providerId: number, clientId: number, dto: UpdateReviewDto): Promise<{
        id: number;
        createdAt: Date;
        providerId: number;
        clientId: number;
        rating: number;
        comment: string | null;
    }>;
    delete(providerId: number, clientId: number): Promise<{
        message: string;
    }>;
}
