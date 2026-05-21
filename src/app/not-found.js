import Link from "next/link";
export const metadata = { title: "Not Found" };
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-2">This Page Wandered Off.</p>
      <Link href="/" className="btn btn-primary mt-6">Back Home</Link>
    </div>
  );
}

