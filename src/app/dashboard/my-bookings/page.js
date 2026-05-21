"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { readJwt } from "@/lib/jwt";
import UpdateBookingModal from "@/components/UpdateBookingModal";

export default function MyBookings() {
  const { data: session } = useSession();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    if (!session?.user?.email) return;

    const token = readJwt();
    if (!token) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments?email=${session.user.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setItems(data);
      } else {
        console.error("Failed to load bookings - Status:", res.status);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

 
  useEffect(() => {
    // load();
  }, [session?.user?.email]);

  const del = async (id) => {
    try {
      const token = readJwt();

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems((p) => p.filter((x) => x._id !== id));
      toast.success("Appointment deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete appointment");
    }
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">My Bookings</h1>

      {items.length === 0 ? (
        <p className="text-gray-500 py-8">No Bookings Found Yet.</p>
      ) : (
        <div className="grid gap-4">
          {items.map((b) => (
            <div key={b._id} className="card bg-base-100 p-5 shadow">
              <h3 className="font-semibold text-lg">{b.doctorName}</h3>
              <p className="text-sm mt-1">
                {b.appointmentDate} · {b.appointmentTime}
              </p>
              <p className="text-sm mt-1">
                Patient: {b.patientName} • {b.phone}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => setEditing(b)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => del(b._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <UpdateBookingModal
          booking={editing}
          onClose={() => setEditing(null)}
          onSaved={(updatedBooking) => {
            setItems((prev) =>
              prev.map((item) =>
                item._id === updatedBooking._id ? updatedBooking : item
              )
            );
            load();
          }}
        />
      )}
    </>
  );
}