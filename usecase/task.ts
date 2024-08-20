import { TaskRepository } from "@/repository/task";

export class TaskUseCase {
  private readonly repository: TaskRepository;

  constructor() {
    this.repository = new TaskRepository();
  }

  async getAllTask() {
    try {
      const data = await this.repository.findMany({
        orderBy: {
          id: "asc",
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async updateTask(id: string, completed: boolean) {
    try {
      const data = await this.repository.update({
        where: {
          id,
        },
        data: {
          completed,
        },
      });
      return data;
    } catch (error) {
      console.error("Error updating task:", error);
      return null;
    }
  }
}
