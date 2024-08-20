"use server";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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

export async function PUT(request: NextRequest) {
  "use server";
  try {
    const filePath = path.join(process.cwd(), "public", "task.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const tasks = JSON.parse(fileContents);

    const { id, completed } = await request.json();

    // Find the task by id and update its completed status
    const updatedTasks = tasks.map((task: any) =>
      task.id === id ? { ...task, completed } : task
    );

    // Save the updated tasks back to the file
    await fs.writeFile(filePath, JSON.stringify(updatedTasks, null, 2), "utf8");

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return new NextResponse("Error updating task", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
