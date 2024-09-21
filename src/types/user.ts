// types/user.ts
export interface User {
  id: string;
  name: string;
  contactInfo: {
    type: "phone" | "email";
    value: string;
  };
  status: "Active" | "Waiting" | "Inactive" | "Terminated";
  dateAdded: Date;
}

export type SortField = keyof User | "contactInfo";
export type SortOrder = "asc" | "desc";
