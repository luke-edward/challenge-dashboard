// app/api/users/route.ts
import { NextResponse } from "next/server";
import { User } from "@/types/user";

const names = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Henry",
  "Ivy",
  "Jack",
];
const statuses: User["status"][] = [
  "Active",
  "Waiting",
  "Inactive",
  "Terminated",
];

function generateRandomUser(): User {
  const contactType = Math.random() > 0.5 ? "phone" : "email";
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: names[Math.floor(Math.random() * names.length)],
    contactInfo: {
      type: contactType,
      value:
        contactType === "phone"
          ? `+1${Math.floor(Math.random() * 10000000000)
              .toString()
              .padStart(10, "0")}`
          : `${names[
              Math.floor(Math.random() * names.length)
            ].toLowerCase()}@example.com`,
    },
    status: statuses[Math.floor(Math.random() * statuses.length)],
    dateAdded: new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
    ),
  };
}

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const users = Array.from({ length: 20 }, generateRandomUser);
  return NextResponse.json(users);
}
