export type CreateUserDTO = {
    fullName: string;
    userName: string;
    bio: string;
    email: string;
    password: string;
    image: string;
    bannerImg: string;
}

export type UpdateUserDTO = Pick<CreateUserDTO, "fullName" | "userName" | "bio" | "image" | "bannerImg"> & { id: number; };