"use server";

import { TaskUseCase } from "@/usecase/task";

const usecase = new TaskUseCase();

export async function updateTaskAction(id: string, completed: boolean) {
  const data = await usecase.updateTask(id, completed);
  return data;
}
