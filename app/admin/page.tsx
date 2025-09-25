import { ButtonSignOut } from "../components/Button";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Admin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const users = await auth.api.listUsers({
    query: {
      limit: 100,
      sortDirection: "desc",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  console.log(users);

  return (
    <main className="max-w-4xl mx-auto mt-4 text-end">
      {session && (
        <div className="flex items-center justify-end gap-2">
          <h3>
            {session.user.name} | {session.user.email} |
          </h3>
          <ButtonSignOut />
        </div>
      )}
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className=" text-2xl font-bold">ADMIN DASHBOARD</h1>
        {users && Array.isArray(users.users) && users.users.length > 0 ? (
          <ul className="text-left">
            {users.users.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email}) - {user.role}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}
      </div>
    </main>
  );
}
