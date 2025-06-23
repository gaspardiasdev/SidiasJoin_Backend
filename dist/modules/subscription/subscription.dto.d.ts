export declare class CreateSubscriptionDto {
    providerId: number;
    paid: boolean;
    proofUrl?: string;
    startsAt?: string;
    expiresAt?: string;
}
export declare class UpdateSubscriptionDto {
    paid?: boolean;
    proofUrl?: string;
    startsAt?: string;
    expiresAt?: string;
}
