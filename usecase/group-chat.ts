import { GroupChatRepository } from "@/repository/group-chat";

export class GroupChatUseCase {
  private readonly repository: GroupChatRepository;

  constructor() {
    this.repository = new GroupChatRepository();
  }

  async getAllGroupChat() {
    try {
      const data = await this.repository.findMany({
        include: {
          messages: true,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
}
