"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileModal({ user, onClose }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { name: user.name, image: user.image },
  });

  const onSubmit = async ({ name, image }) => {
    const { error } = await authClient.updateUser({ name, image });
    if (error) return toast.error(error.message);
    toast.success("Profile updated successfully!");
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-xl font-bold">Update Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
          <input className="input input-bordered w-full" placeholder="Name" {...register("name", { required: true })} />
          <input className="input input-bordered w-full" placeholder="Photo URL" {...register("image")} />
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

