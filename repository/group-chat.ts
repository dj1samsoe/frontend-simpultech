import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class GroupChatRepository {
  protected prisma = prisma;

  get collection() {
    return this.prisma.groupChat;
  }

  async findMany(args: Prisma.GroupChatFindManyArgs) {
    const data = await this.collection.findMany(args);
    return data;
  }
}
