"use client";

import { useState, useEffect } from 'react';

export default function GeradorAta() {
  const [tipo, setTipo] = useState('Conselho');
  const [numero, setNumero] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [endereco, setEndereco] = useState('Rua Coronel João Pinho, 91, Centro, Várzea do Poço-BA');
  const [devocional, setDevocional] = useState('');
  const [pautas, setPautas] = useState(['']);
  const [resolucoes, setResolucoes] = useState(['']);
  
  // Lista de membros (nomes corrigidos conforme solicitado)
  const membrosPadrao = [
    "Pr. Fredson Fagundes Cerqueira",
    "Pb. Elique Rios Filho",
    "Pb. Adevaldo Marques Rios"
  ];

  const [presentes, setPresentes] = useState<string[]>([]);

  // Lógica para marcar oficiais automaticamente ao selecionar "Conselho"
  useEffect(() => {
    if (tipo === 'Conselho') {
      setPresentes(membrosPadrao);
    } else {
      setPresentes([]);
    }
  }, [tipo]);

  const adicionarItem = () => {
    setPautas([...pautas, '']);
    setResolucoes([...resolucoes, '']);
  };

  const gerarTextoAta = () => {
    const listaPautas = pautas.map((p, i) => `${i + 1}. ${p}`).join('; ');
    const listaResolucoes = resolucoes.map((r, i) => `${i + 1}. ${r}`).join('; ');

    return `Às ${hora} horas do dia ${data}, na ${endereco}, reuniu-se o ${tipo} da Igreja Presbiteriana de Várzea do Poço. Estavam presentes: ${presentes.join(', ')}. O Presidente deu início aos trabalhos com a leitura bíblica e oração (DEVOCIONAL): ${devocional}. PAUTA: ${listaPautas}. RESOLUÇÕES: ${listaResolucoes.length > 0 ? listaResolucoes : 'Nada a declarar'}. ENCERRAMENTO: Sem mais nada a tratar, eu, ${presentes.includes("Pb. Adevaldo Marques Rios") ? "Pb. Adevaldo Marques Rios" : "____________________"}, secretário(a), lavrei a presente ata que vai assinada por mim e pelo Presidente. Várzea do Poço-BA, ${data}.`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-2xl font-bold text-slate-800 border-b pb-4 mb-6">Redigir Documento</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Tipo de Reunião</label>
          <select 
            value={tipo} 
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border rounded-md p-2 bg-slate-50"
          >
            <option value="Conselho">Conselho</option>
            <option value="Assembleia">Assembleia</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Número da Ata</label>
          <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className="w-full border rounded-md p-2" placeholder="Ex: 212" />
        </div>
      </div>

      <div className="space-y-4">
        <section className="bg-slate-50 p-4 rounded-md">
          <h2 className="font-bold mb-2">1. Dados e Presentes</h2>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} className="mr-2 p-2 border rounded" />
          <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} className="p-2 border rounded" />
          
          <div className="mt-4">
            <p className="text-sm font-bold mb-2">Marcar Presentes:</p>
            <div className="grid grid-cols-1 gap-2">
              {membrosPadrao.map(membro => (
                <label key={membro} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={presentes.includes(membro)}
                    onChange={() => {
                      setPresentes(prev => prev.includes(membro) ? prev.filter(p => p !== membro) : [...prev, membro])
                    }}
                  />
                  <span>{membro}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        <section>
          <label className="block font-bold">2. Devocional</label>
          <textarea 
            className="w-full border p-2 rounded h-20" 
            placeholder="Texto bíblico e breve resumo..."
            value={devocional}
            onChange={(e) => setDevocional(e.target.value)}
          />
        </section>

        <section className="space-y-4">
          <h2 className="font-bold">3. Pauta e Resoluções</h2>
          {pautas.map((_, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 border-l-4 border-blue-500 bg-blue-50">
              <input 
                placeholder={`Pauta ${index + 1}`} 
                className="p-2 border rounded" 
                value={pautas[index]}
                onChange={(e) => {
                  const newPautas = [...pautas];
                  newPautas[index] = e.target.value;
                  setPautas(newPautas);
                }}
              />
              <input 
                placeholder={`Resolução ${index + 1}`} 
                className="p-2 border rounded" 
                value={resolucoes[index]}
                onChange={(e) => {
                  const newRes = [...resolucoes];
                  newRes[index] = e.target.value;
                  setResolucoes(newRes);
                }}
              />
            </div>
          ))}
          <button onClick={adicionarItem} className="text-blue-600 text-sm font-bold">+ Adicionar Assunto</button>
        </section>

        <div className="mt-8 border-t pt-6">
          <h2 className="font-bold mb-2 text-blue-800">Resultado da Ata:</h2>
          <div className="p-4 bg-slate-100 border rounded text-justify text-slate-700 leading-relaxed italic">
            {gerarTextoAta()}
          </div>
        </div>
      </div>
    </div>
  );
}
