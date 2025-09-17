export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950">
      <div className="bg-zinc-900 px-6 py-8 rounded-xl shadow-lg w-full max-w-md border border-purple-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">Criar Conta</h1>
        <form className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
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
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1">
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-300 mb-1">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800 transition"
          >
            Registrar
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-400">
          Já tem uma conta?{' '}
          <a href="/login" className="text-purple-400 font-semibold hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
