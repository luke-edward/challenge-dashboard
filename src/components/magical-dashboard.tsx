// components/Dashboard.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { User, SortField, SortOrder } from "@/types/user";

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      console.log("Frontend: Received", data.length, "users from API");
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const sortUsers = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }

    const sortedUsers = [...users].sort((a, b) => {
      let aValue: any =
        field === "contactInfo" ? a.contactInfo.value : a[field];
      let bValue: any =
        field === "contactInfo" ? b.contactInfo.value : b[field];

      if (field === "dateAdded") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="p-8 rounded-full bg-white shadow-lg">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-800 flex items-center">
            <Sparkles className="mr-2 text-purple-500" />
            User Dashboard
          </h1>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {["name", "contactInfo", "status", "dateAdded"].map(
                    (field) => (
                      <TableHead key={field}>
                        <Button
                          variant="ghost"
                          onClick={() => sortUsers(field as SortField)}
                          className="font-bold text-gray-700 hover:text-purple-600 transition-colors duration-200"
                        >
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <TableCell className="font-medium text-gray-900">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {user.contactInfo.value}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "Waiting"
                            ? "bg-yellow-100 text-yellow-800"
                            : user.status === "Inactive"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {new Date(user.dateAdded).toLocaleDateString()}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
