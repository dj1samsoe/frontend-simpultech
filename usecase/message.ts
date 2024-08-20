import { MessageRepository } from "@/repository/messsage";

export class MessageUseCase {
  private readonly repository: MessageRepository;

  constructor() {
    this.repository = new MessageRepository();
  }

  async getAllMessage() {
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
}
