"use client";
export async function getJwt(email) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jwt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const { token } = await res.json();
  localStorage.setItem("docappoint-jwt", token);
  return token;
}
export const readJwt = () => (typeof window !== "undefined" ? localStorage.getItem("docappoint-jwt") : null);
export const clearJwt = () => localStorage.removeItem("docappoint-jwt");

