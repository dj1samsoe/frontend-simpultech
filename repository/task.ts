import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class TaskRepository {
  protected prisma = prisma;

  get collection() {
    return this.prisma.task;
  }

  async findMany(args: Prisma.TaskFindManyArgs) {
    const data = await this.collection.findMany(args);
    return data;
  }

  async update(args: Prisma.TaskUpdateArgs) {
    const data = await this.collection.update(args);
    return data;
  }
}
