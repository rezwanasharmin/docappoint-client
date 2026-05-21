"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Spinner from "@/components/Spinner";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session?.user) router.replace(`/login?from=${pathname}`);
  }, [isPending, session, pathname, router]);

  if (isPending || !session?.user) return <Spinner />;

  return (
    <div className="container mx-auto grid gap-6 py-8 md:grid-cols-[200px_1fr]">
      <aside className="space-y-2">
        <Link className="block rounded p-2 hover:bg-base-200" href="/dashboard/my-bookings">My Bookings</Link>
        <Link className="block rounded p-2 hover:bg-base-200" href="/dashboard/my-profile">My Profile</Link>
      </aside>
      <div>{children}</div>
    </div>
  );
}

