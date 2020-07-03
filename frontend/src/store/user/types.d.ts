interface FetchUserDetailsPayload {
    userName: string
};

interface FetchUserDetailsSuccessfulPayload {
    userId: string;
    balance: number;
    productIds: string[];
}