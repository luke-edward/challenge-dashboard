// app/api/users/route.ts
import { NextResponse } from "next/server";
import { User } from "@/types/user";

const names = [
  "Emma Thompson",
  "Liam Patel",
  "Sophia Rodriguez",
  "Noah Chen",
  "Olivia Nguyen",
  "Ethan Kowalski",
  "Ava Mbeki",
  "Mason Tanaka",
  "Isabella Rossi",
  "William Zhang",
  "Mia Larsson",
  "James O'Brien",
  "Charlotte Dubois",
  "Benjamin Cohen",
  "Amelia Nakamura",
  "Lucas Müller",
  "Harper Singh",
  "Alexander Ivanov",
  "Evelyn Chow",
  "Daniel Okafor",
  "Abigail Sørensen",
  "Michael Novak",
  "Emily Gonzalez",
  "Samuel Kim",
  "Elizabeth Andrade",
  "David Petrov",
  "Sofia Morales",
  "Joseph Katz",
  "Victoria Yamamoto",
  "Henry Nkosi",
  "Grace O'Sullivan",
  "Andrew Gupta",
  "Zoe Van der Berg",
  "Christopher Lee",
  "Chloe Byrne",
  "Jackson Watanabe",
  "Lily Chakrabarti",
  "Sebastian Cruz",
  "Audrey Lefebvre",
  "Gabriel Dos Santos",
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
  console.log("API: Generated", users.length, "users");
  return NextResponse.json(users);
}
