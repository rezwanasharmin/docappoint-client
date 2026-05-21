"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { readJwt } from "@/lib/jwt";

export default function BookingModal({ doctor, onClose }) {
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const payload = { ...data, userEmail: session.user.email, doctorName: doctor.name, doctorId: doctor._id };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${readJwt()}` },
      body: JSON.stringify(payload),
    });
    if (res.ok) { toast.success("Appointment booked successfully!"); reset(); onClose(); }
    else toast.error("Booking failed. Try again.");
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-xl font-bold">Book {doctor.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
          <input className="input input-bordered w-full" placeholder="Patient Name" {...register("patientName", { required: true })} />
          <select className="select select-bordered w-full" {...register("gender", { required: true })}>
            <option value="">Gender</option><option>Male</option><option>Female</option><option>Other</option>
          </select>
          <input className="input input-bordered w-full" placeholder="Phone" {...register("phone", { required: true })} />
          <input type="date" className="input input-bordered w-full" {...register("appointmentDate", { required: true })} />
          <select className="select select-bordered w-full" {...register("appointmentTime", { required: true })}>
            <option value="">Time slot</option>
            {doctor.availability.map((t) => <option key={t}>{t}</option>)}
          </select>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Confirm Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
}

