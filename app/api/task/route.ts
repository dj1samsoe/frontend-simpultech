"use server";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Task } from "@/types/task";

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "public", "task.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    return new NextResponse(JSON.stringify(data), {
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

export async function POST(req: NextRequest) {
  try {
    const { id, completed } = await req.json();
    if (typeof id !== "string" || typeof completed !== "boolean") {
      return new NextResponse(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const filePath = path.join(process.cwd(), "public", "task.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const tasks = JSON.parse(fileContents) as Task[];

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed } : task
    );

    await fs.writeFile(filePath, JSON.stringify(updatedTasks, null, 2), "utf8");

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
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
