// app/secretaria/layout.tsx
import React from 'react';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Secretaria Digital - IPVP',
  description: 'Sistema de Gestão Documental da Igreja Presbiteriana de Várzea do Poço',
};

export default function SecretariaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Nota: Futuramente, aqui incluiremos a lógica de validação da sessão
  // Ex: const session = await getServerSession();
  // if (!session) redirect('/login');

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {/* Barra Lateral de Navegação */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight text-blue-400">
            IPVP <span className="text-white text-sm block font-normal">Secretaria Digital</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase px-2 mb-2">Documentos</p>
          <a href="/secretaria/atas" className="block px-4 py-2 rounded hover:bg-slate-800 transition-colors">
            Atas de Reunião
          </a>
          <a href="/secretaria/editais" className="block px-4 py-2 rounded hover:bg-slate-800 transition-colors">
            Editais e Ofícios
          </a>
          <a href="/secretaria/comunicados" className="block px-4 py-2 rounded hover:bg-slate-800 transition-colors">
            Comunicados
          </a>

          <div className="pt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase px-2 mb-2">Administração</p>
            <a href="/secretaria/membros" className="block px-4 py-2 rounded hover:bg-slate-800 transition-colors">
              Rol de Membros (84)
            </a>
            <a href="/secretaria/configuracoes" className="block px-4 py-2 rounded hover:bg-slate-800 transition-colors">
              Configurações
            </a>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-400 text-center">
          Logado como: Rev. Fredson Cerqueira
        </div>
      </aside>

      {/* Área Principal de Conteúdo */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <div className="text-slate-600 font-medium">Painel Administrativo</div>
          <div className="flex items-center space-x-4">
             <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
               Novo Documento +
             </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8">
          {/* Aqui é onde as páginas (atas, membros, etc) serão renderizadas */}
          {children}
        </section>
      </main>
    </div>
  );
}