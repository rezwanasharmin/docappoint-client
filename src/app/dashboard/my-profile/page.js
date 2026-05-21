"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function MyProfile() {
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data) => {
    const res = await authClient.updateUser({
      name: data.name,
      image: data.image,
    });
    if (res?.error) return toast.error(res.error.message || "Update failed");
    toast.success("Profile updated successfully!");
    setOpen(false);
    reset();
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">My Profile</h1>
      {session?.user && (
        <div className="card bg-base-100 p-6 shadow">
          <div className="flex items-center gap-4">
            <img src={session.user.image || "/avatar.png"} alt="" className="h-16 w-16 rounded-full" />
            <div>
              <p className="text-lg font-semibold">{session.user.name}</p>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>
          <button className="btn btn-primary mt-4" onClick={() => setOpen(true)}>Update Profile</button>
        </div>
      )}

      {open && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl font-bold">Update Profile</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
              <input className="input input-bordered w-full" placeholder="Name" defaultValue={session?.user?.name || ""} {...register("name")} />
              <input className="input input-bordered w-full" placeholder="Image URL" defaultValue={session?.user?.image || ""} {...register("image")} />
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

