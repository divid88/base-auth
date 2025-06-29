'use client';
import { useEffect, useState } from "react";
import RequireAuth from "@/components/common/requireAuth";
import { getUser, logout } from "@/lib/auth";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation"


export default function DashboardPage() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter() 

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const logoutSubmit = async() =>{
    await logout()
    router.push("/")
  }

  return (
    <>
     <Button onClick={logoutSubmit}>
        logout
      </Button>
   
    <RequireAuth>
      <div className="p-4">
        <h1 className="text-xl font-bold">داشبورد خصوصی</h1>
        <p>فقط کاربرهای لاگین‌شده می‌توانند این صفحه را ببینند.</p>
        {loading ? (
          <p>در حال بارگذاری اطلاعات کاربر...</p>
        ) : user ? (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">اطلاعات کاربر:</h2>
            <p><strong>نام:</strong> {user.email} </p>
            <p><strong>ایمیل:</strong> {user.email}</p>
            <p><strong>تاریخ عضویت:</strong> </p>
          </div>
        ) : (
          <p>خطا در بارگذاری اطلاعات کاربر.</p>
        )}
      </div>
     
    </RequireAuth>
     </>
  );
}