"use client";
import { useEffect, useState } from "react";
import DoctorCard from "@/components/DoctorCard";
import Spinner from "@/components/Spinner";

export default function AllAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors?search=${search}&sort=${sort}`)
      .then((r) => r.json())
      .then((d) => { setDoctors(d); setLoading(false); });
  }, [search, sort]);

  return (
    <section className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">All Appointments</h1>
      <div className="mb-6 flex flex-wrap gap-3">
        <input className="input input-bordered flex-1" placeholder="Search by doctor name..."
               value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="select select-bordered" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="fee-asc">Fee: Low to High</option>
          <option value="fee-desc">Fee: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>
      {loading ? <Spinner /> : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => <DoctorCard key={d._id} doctor={d} />)}
        </div>
      )}
    </section>
  );
}

