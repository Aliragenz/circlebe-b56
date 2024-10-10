import { PrismaClient, Thread, User } from "@prisma/client";
import { CreateThreadDTO, UpdateThreadDTO } from "../dto/thread.dto";
import { CustomError, CustomErrorCode } from "../types/error";

const prisma = new PrismaClient();

class ThreadService {
  async getAllThreads(): Promise<Thread[]> {
    return await prisma.thread.findMany({
      include: {
        user: true,
      },
    });
  }

  async getThreadById(id: number): Promise<Thread | null> {
    const thread = await prisma.thread.findUnique({
      where: { id },
    });

    if (!thread) {
      throw {
        status: 404,
        message: "Thread not found!",
        code: CustomErrorCode.USER_NOT_EXISTS,
      } as CustomError;
    }

    return thread;
  }

  async updateThreadLike({ id, likesCount, likedBy }: { id: number; likesCount: number; likedBy: number[] }) {
    return await prisma.thread.update({
      where: { id }, // Specify the thread ID
      data: { 
        likesCount, // Update likes count
        likedBy // Update the list of users who liked the thread
      },
    });
  }

  async createThread(data: CreateThreadDTO, user: User): Promise<Thread | null> {
    return await prisma.thread.create({
      data: {
        content: data.content,
        image: data.image,
        userId: data.userId,
      },
    });
  }

  async updateThread(data: UpdateThreadDTO): Promise<Thread | null> {
    const thread = await prisma.thread.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!thread) {
      throw {
        status: 404,
        message: "Thread not found!",
        code: CustomErrorCode.USER_NOT_EXISTS,
      } as CustomError;
    }

    return await prisma.thread.update({
      where: { id: data.id }, // Use data.id to find the thread
      data: {
        content: data.content,
        image: data.image,
      },
    });
  }

  async deleteThread(id: number): Promise<Thread | null> {
    const thread = await prisma.thread.findUnique({
      where: { id },
    });

    if (!thread) {
      throw {
        status: 404,
        message: "Thread not found!",
        code: CustomErrorCode.USER_NOT_EXISTS,
      } as CustomError;
    }

    return await prisma.thread.delete({
      where: { id },
    });
  }
}

export default new ThreadService();
