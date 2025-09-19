"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (formData: FormData) => {
    setIsLoading(true);
    await authClient.signIn.email(
      {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        callbackURL: "/",
      },
      {
        onError: (ctx) => {
          console.log("Erro ao efetuar login", ctx);
        }
      }
    );
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950">
      <div className="bg-zinc-900 px-6 py-8 rounded-xl shadow-lg w-full max-w-md border border-purple-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
          Login
        </h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            await signIn(formData);
          }}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              isLoading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed opacity-50"
                : "bg-purple-700 text-white hover:bg-purple-800"
            }`}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-400">
          Não tem uma conta?{" "}
          <a
            href="/register"
            className="text-purple-400 font-semibold hover:underline"
          >
            Registre-se
          </a>
        </p>
      </div>
    </div>
  );
}
