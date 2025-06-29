// components/RequireAuth.tsx
"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

interface Props {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getUser();
        setLoading(false);
      } catch {
        router.replace("/");
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p className="p-4">در حال بارگذاری...</p>;

  return <>{children}</>;
}
