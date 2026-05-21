"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";

const pwRule = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async ({ name, email, password, image }) => {
    if (!pwRule.test(password)) return toast.error("Password needs 1 uppercase, 1 lowercase, min 6 chars");
    const { error } = await signUp.email({ name, email, password, image });
    if (error) return toast.error(error.message);
    toast.success("Account created. Please log in.");
    router.push("/login");
  };

  return (
    <section className="container mx-auto max-w-md py-16">
      <h1 className="mb-6 text-3xl font-bold">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="input input-bordered w-full" placeholder="Name" {...register("name", { required: true })} />
        <input className="input input-bordered w-full" placeholder="Email" {...register("email", { required: true })} />
        <input className="input input-bordered w-full" placeholder="Photo URL" {...register("image")} />
        <input type="password" className="input input-bordered w-full" placeholder="Password" {...register("password", { required: true })} />
        <button className="btn btn-primary w-full">Register</button>
      </form>
      <button   onClick={async () => {
    await signIn.social({ provider: "google" });

    setTimeout(async () => {
      const email = localStorage.getItem("better-auth-email");
      if (email) {
        await getJwt(email);
      }
    }, 2000);
  }} className="btn btn-outline mt-3 w-full">Continue with Google</button>
      <p className="mt-4 text-sm">Already have an account? <Link href="/login" className="link">Login</Link></p>
    </section>
  );
}

