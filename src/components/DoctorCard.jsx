"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function DoctorCard({ doctor }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const onView = () => {
    if (session?.user) router.push(`/doctors/${doctor._id}`);
    else router.push(`/login?from=${encodeURIComponent(`/doctors/${doctor._id}`)}`);
  };

  return (
    <div className="card bg-base-100 shadow-md transition hover:shadow-xl">
      <img src={doctor.image} alt={doctor.name} className="h-56 w-full rounded-t-2xl object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
        <p className="text-sm text-gray-500">{doctor.specialty} · {doctor.experience}</p>
        <p className="mt-2">⭐ {doctor.rating} · ৳{doctor.fee}</p>
        <button onClick={onView} className="btn btn-primary mt-4 w-full">View Details</button>
      </div>
    </div>
  );
}

