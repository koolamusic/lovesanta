import { NextResponse } from "next/server";
import { routes } from "~/app/common/routes";
import { db } from "~/server/db";

export async function GET() {
  try {
    const fallbackRoute = await db.event.findFirst({});

    console.log({ fallbackRoute }, "[event]:route.ts");

    if (!fallbackRoute) {
      throw new Error("No events found");
    }

    NextResponse.redirect(`/event/${fallbackRoute.id}`);
  } catch (error) {
    console.error(error);
    NextResponse.redirect(routes.home);
  }
}
