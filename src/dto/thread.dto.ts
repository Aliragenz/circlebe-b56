export type CreateThreadDTO = {
    content: string;
    image?: string;
    likes: number; // To track the number of likes
    likedBy: number[]; // To store IDs of users who liked this thread
    
    userId: number;
}

export type UpdateThreadDTO = CreateThreadDTO & {
    id: number;
};