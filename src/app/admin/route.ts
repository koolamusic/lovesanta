import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { type User } from "@prisma/client";
// import { users } from "./_users";

// export async function POST(request: Request)
export async function GET(_request: Request) {
  try {
    // const users: Omit<User, "id" | "createdAt" | "updatedAt">[] =
    //   await request.json();
    const users: Pick<
      User,
      "name" | "username" | "passcode" | "region" | "bio"
    >[] = [
      {
        name: "Suzie Cameron Andrew",
        username: "suzie",
        passcode: "000006",
        region: "europe",
        bio: "Beautiful handbag with matching shoes",
      },
    ];

    const createdUsers = await db.user.createMany({
      data: users,
      // Optional: skips records that conflict with unique constraints
      skipDuplicates: true,
    });

    console.log({ createdUsers });

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
