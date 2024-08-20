"use server";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "public", "group-chat.json");
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
