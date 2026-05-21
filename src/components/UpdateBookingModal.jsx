"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { readJwt } from "@/lib/jwt";

export default function UpdateBookingModal({ booking, onClose, onSaved }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      patientName: booking.patientName,
      gender: booking.gender,
      phone: booking.phone,
      appointmentDate: booking.appointmentDate,
      appointmentTime: booking.appointmentTime,
    }
  });

  const onSubmit = async (data) => {
    const payload = {
      patientName: data.patientName,
      gender: data.gender,
      phone: data.phone,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${booking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${readJwt()}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const updated = await res.json();
        toast.success("Appointment updated successfully!");
        onSaved(updated);   
        onClose();
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Update failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Check console.");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="text-xl font-bold mb-6">Update Booking</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input 
            className="input input-bordered w-full" 
            value={booking.doctorName || ""} 
            readOnly 
          />

          <input 
            className="input input-bordered w-full" 
            value={booking.userEmail || ""} 
            readOnly 
          />

          <input 
            className="input input-bordered w-full" 
            placeholder="Patient Name" 
            {...register("patientName", { required: true })} 
          />

          <select className="select select-bordered w-full" {...register("gender", { required: true })}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input 
            className="input input-bordered w-full" 
            placeholder="Phone Number" 
            {...register("phone", { required: true })} 
          />

          <input 
            type="date" 
            className="input input-bordered w-full" 
            {...register("appointmentDate", { required: true })} 
          />

          
          <select className="select select-bordered w-full" {...register("appointmentTime", { required: true })}>
            <option value="">Select Time Slot</option>
          
            {booking.availability?.map?.((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
            {booking.doctorAvailability?.map?.((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
            
            {!booking.availability && !booking.doctorAvailability && (
              <option value={booking.appointmentTime}>{booking.appointmentTime}</option>
            )}
          </select>

          <div className="modal-action mt-6">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}