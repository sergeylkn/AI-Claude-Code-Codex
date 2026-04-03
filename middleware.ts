import { NextResponse } from "next/server";

// Guest mode enabled: courses and lesson workspace are available without registration.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: []
};
