"use client";

import React from "react";
import { useSession } from "next-auth/react";
import AccountHeader from "./AccountHeader";
import { getUserById } from "@/actions/user";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import UserStats from "./UserStats";
import { getTest } from "@/actions/test";
import UserPerformance from "./UserPerformance";
import { Test } from "@prisma/client";
import UserTestTable from "./UserTestTable";

export default function Account() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const [testData, setTestData] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        try {
          const [user, tests] = await Promise.all([
            getUserById(session.user.id),
            getTest(session.user.id),
          ]);
          setUserData(user);
          setTestData(tests);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to load user data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [session?.user?.id]);

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col space-y-16">
      <AccountHeader user={userData} />
      <UserStats user={userData} />
      <UserPerformance data={testData} />
      <UserTestTable data={testData}/>
    </div>
  );
}
