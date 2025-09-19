"use client";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

export function ButtonSignOut() {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.replace("/login") },
    });
  };

  return (
    <div onClick={signOut} className="btn btn-primary">Logout</div>
  )
}
