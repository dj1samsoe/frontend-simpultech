"use server";
import { NextRequest, NextResponse } from "next/server";
import { TaskUseCase } from "@/usecase/task";

const usecase = new TaskUseCase();

export async function GET(req: NextRequest) {
  try {
    const data = await usecase.getAllTask();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
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

export async function POST(req: NextRequest) {
  try {
    const { id, completed } = await req.json();
    if (typeof id !== "string" || typeof completed !== "boolean") {
      return new NextResponse(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const result = await usecase.updateTask(id, completed);

    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating task:", error);

    // Memeriksa tipe error dan menangani pesan kesalahan
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return new NextResponse(
      JSON.stringify({ error: "Error updating task", message: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
