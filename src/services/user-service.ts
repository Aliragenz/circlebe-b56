import { PrismaClient, User } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto";
import { CustomError, CustomErrorCode } from "../types/error";

const prisma = new PrismaClient();

class UserService{
     async  getAllUsers(){
    return await prisma.user.findMany();
}

// By ID
 async getUserById(id:number): Promise<User | null>{
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if(!user){
        throw {
            status: 404,
            message: "User not found",
            code: CustomErrorCode.USER_NOT_EXISTS,
        } as CustomError;
    }
    return user;
}

// By Email
 async  getUserByEmail(email:string): Promise<User | null>{
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
}

// Create
 async  createUser(data: CreateUserDTO): Promise<User | null>{
    return await prisma.user.create({data});
}

// Update
 async  updateUser(data: UpdateUserDTO): Promise<User | null>{
    const user = await prisma.user.findUnique({
        where: {
            id: data.id // TODO take data from decode token ?
        }
    });

    if(!user){
        throw new Error("User Not Found!")
    }

    
    
    return await prisma.user.update({
        where: { id: data.id },
        data:{
        fullName: data.fullName,
        userName: data.userName,
        image: data.image,
        bannerImg: data.bannerImg,
        bio: data.bio,
    },
});

}

// Delete
async  deleteUser(id: number): Promise<User | null>{
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if(!user){
        throw {
            status: 404,
            message: "User not found",
            code: CustomErrorCode.USER_NOT_EXISTS,
        } as CustomError;
    }
    
    return await prisma.user.delete({
    where: { id },
});

}
}

export default new UserService();