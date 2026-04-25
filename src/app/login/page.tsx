// app/login/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Defina sua senha mestra aqui (ou use variáveis de ambiente da Vercel)
    const SENHA_MESTRA = "IPVP2026"; 

    if (password === SENHA_MESTRA) {
      // Cria um cookie simples que expira em 24h
      document.cookie = "ipvp_auth=true; path=/; max-age=86400; SameSite=Strict";
      router.push('/secretaria');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Secretaria Digital</h1>
          <p className="text-slate-500 text-sm">IPVP - Várzea do Poço</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Senha de Acesso</label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
          >
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}