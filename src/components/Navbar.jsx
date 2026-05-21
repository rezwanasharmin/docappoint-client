"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { clearJwt } from "@/lib/jwt";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  if (typeof window !== "undefined" && user?.email) {
  localStorage.setItem("better-auth-email", user.email);
}

  const handleLogout = async () => {
    await signOut();
    clearJwt();
  };

  return (
    <header className="border-b bg-base-100">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex text-blue-900 items-center gap-2 text-xl font-bold">
          <span className="text-primary">⚕</span> DocAppoint
        </Link>
        <div className="hidden gap-6 md:flex">
          <Link href="/">Home</Link>
          <Link href="/all-appointments">All Appointments</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
     <Image
  src={user?.image || "/avatar.png"}
  alt=""
  width={36}
  height={36}
  style={{ height: "auto", width: "auto" }}
  className="rounded-full"
/>
              <button onClick={handleLogout} className="btn btn-sm btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-sm btn-outline">Login</Link>
              <Link href="/register" className="btn btn-sm btn-primary">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

