"use server";
import { NextRequest, NextResponse } from "next/server";
import { GroupChatUseCase } from "@/usecase/group-chat";

const usecase = new GroupChatUseCase();

export async function GET(request: NextRequest) {
  try {
    const response = await usecase.getAllGroupChat();
    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse("Error fetching data", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
