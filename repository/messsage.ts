import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class MessageRepository {
  protected prisma = prisma;

  get collection() {
    return this.prisma.message;
  }

  async findMany(args: Prisma.MessageFindManyArgs) {
    const data = await this.collection.findMany(args);
    return data;
  }
}
