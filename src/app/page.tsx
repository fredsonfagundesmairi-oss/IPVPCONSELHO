import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4 text-center">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">Secretaria Digital IPVP</h1>
      <p className="text-slate-600 mb-8">Sistema de Gestão de Atas e Documentos</p>
      <Link href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
        Acessar Painel Restrito
      </Link>
    </div>
  );
}