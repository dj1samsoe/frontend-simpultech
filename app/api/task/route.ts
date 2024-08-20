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
    const filePath = path.join(process.cwd(), "public", "task.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const tasks = JSON.parse(fileContents);
    const { id, completed } = await req.json();
    const updatedTasks = tasks.map((task: Task) =>
      task.id === id ? { ...task, completed } : task
    );

    const response = await fs.writeFile(
      filePath,
      JSON.stringify(updatedTasks, null, 2),
      "utf8"
    );

    return new NextResponse(JSON.stringify({ success: true, response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return new NextResponse("Error updating task", { status: 500 });
  }
}
