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
            <button
            type="button"
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await authClient.signIn.social({
                provider: "google",
                callbackURL: "/"
              });
              setIsLoading(false);
            }}
            className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 mt-3 transition ${
              isLoading
              ? "bg-gray-600 text-gray-300 cursor-not-allowed opacity-50"
              : "bg-white text-purple-700 hover:bg-gray-100 border border-purple-700"
            }`}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24"
              height="24"
              className="inline-block"
            >
              <path
              fill="#4285F4"
              d="M24 9.5c3.54 0 6.73 1.22 9.24 3.22l6.9-6.9C36.45 2.36 30.6 0 24 0 14.82 0 6.73 5.48 2.69 13.44l8.09 6.29C12.9 13.16 17.97 9.5 24 9.5z"
              />
              <path
              fill="#34A853"
              d="M46.1 24.5c0-1.64-.15-3.22-.43-4.75H24v9.01h12.44c-.54 2.9-2.18 5.36-4.65 7.01l7.23 5.62C43.98 37.36 46.1 31.46 46.1 24.5z"
              />
              <path
              fill="#FBBC05"
              d="M13.78 28.73c-1.09-3.22-1.09-6.7 0-9.92l-8.09-6.29C2.01 16.54 0 20.03 0 24c0 3.97 2.01 7.46 5.69 11.48l8.09-6.29z"
              />
              <path
              fill="#EA4335"
              d="M24 48c6.6 0 12.15-2.18 16.23-5.97l-7.23-5.62c-2.01 1.35-4.6 2.15-8.99 2.15-6.03 0-11.1-3.66-13.22-8.73l-8.09 6.29C6.73 42.52 14.82 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            {isLoading ? "Entrando..." : "Entrar com Google"}
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
