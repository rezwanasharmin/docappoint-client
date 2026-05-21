"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookingModal from "@/components/BookingModal";
import ReviewSection from "@/components/ReviewSection";
import Spinner from "@/components/Spinner";

export default function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`).then((r) => r.json()).then(setDoctor);
  }, [id]);

  if (!doctor) return <Spinner />;

  return (
    <section className="container mx-auto py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <img src={doctor.image} className="h-96 w-full rounded-2xl object-cover" alt="" />
        <div>
          <h1 className="text-3xl font-bold">{doctor.name}</h1>
          <p className="text-lg text-gray-500">{doctor.specialty}</p>
          <p className="mt-4">{doctor.description}</p>
          <ul className="mt-4 space-y-1">
            <li><b>Experience:</b> {doctor.experience}</li>
            <li><b>Hospital:</b> {doctor.hospital}</li>
            <li><b>Location:</b> {doctor.location}</li>
            <li><b>Fee:</b> ৳{doctor.fee}</li>
            <li><b>Availability:</b> {doctor.availability.join(", ")}</li>
          </ul>
          <button className="btn btn-primary mt-6" onClick={() => setOpen(true)}>Book Appointment</button>
        </div>
      </div>
      <ReviewSection doctorId={id} />
      {open && <BookingModal doctor={doctor} onClose={() => setOpen(false)} />}
    </section>
  );
}

