"use client";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { getJwt } from "@/lib/jwt";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const from = useSearchParams().get("from") || "/";

  const onSubmit = async ({ email, password }) => {
    const { error } = await signIn.email({ email, password });
    if (error) return toast.error(error.message || "Login failed");
    await getJwt(email);
    toast.success("Logged in");
    router.push(from);
  };

 
  const google = async () => {
  await signIn.social({
    provider: "google",
    callbackURL: from,
  });

  setTimeout(async () => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("better-auth-email");
      if (email) {
        await getJwt(email);
      }
    }
  }, 2000);
};

  return (
    <section className="container mx-auto max-w-md py-16">
      <h1 className="mb-6 text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="input input-bordered w-full" placeholder="Email" {...register("email", { required: true })} />
        <input type="password" className="input input-bordered w-full" placeholder="Password" {...register("password", { required: true })} />
        <button className="btn btn-primary w-full" type="submit">Login</button>
      </form>
      <button onClick={google} className="btn btn-outline mt-3 w-full">Continue With Google</button>
      <p className="mt-4 text-sm">Donot Have An Account? <Link href="/register" className="link">Register</Link></p>
    </section>
  );
}

