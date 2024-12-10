import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { User } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const users: Omit<User, "id" | "createdAt" | "updatedAt">[] =
      await request.json();

    const createdUsers = await db.user.createMany({
      data: users,
      skipDuplicates: true, // Optional: skips records that conflict with unique constraints
    });

    return NextResponse.json(
      {
        message: "Users created successfully",
        count: createdUsers.count,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating users:", error);
    return NextResponse.json(
      { error: "Failed to create users" },
      { status: 500 },
    );
  }
}
