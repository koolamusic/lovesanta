import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { type User } from "@prisma/client";
// import { 
//   demoUsers as users, 
//   // users
//  } from "./_users";

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

// export async function POST(request: Request)
export async function GET(_request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Not in development mode" },
      { status: 500 },
    );
  }

  try {
    // const users: Omit<User, "id" | "createdAt" | "updatedAt">[] =
    //   await request.json();

    const createdUsers = await db.user.createMany({
      data: users,
      // Optional: skips records that conflict with unique constraints
      skipDuplicates: true,
    });

    // const event = await db.event.findFirstOrThrow({
    //   where: {
    //     id: "cm4hjss4400153b5ug0imp2v3",
    //   },
    // });

    const event = await db.event.create({
      data: {
        name: "Secret Santa 2024",
        year: 2024,
        description: "Secret Santa for the year 2024",
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        status: "ACTIVE",

      },
    });



    const eventCreatePayload = (await db.user.findMany({})).map((user) => ({
      eventId: event.id,
      userId: user.id,
      wishlist: user.bio,
      region: user.region,
      budget: 100,
      hasJoined: true,
    }));

    // Enroll users for the event
    const enrollUsers = await db.participant.createMany({
      data: eventCreatePayload,
      skipDuplicates: true,
    });

    // console.log({ enrollUsers, eventCreatePayload });

    return NextResponse.json(
      {
        message: "Operation created successfully",
        count: createdUsers.count,
        participants: enrollUsers.count,
        payload: eventCreatePayload,
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
