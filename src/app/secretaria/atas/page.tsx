"use client";

import React, { useState, useEffect } from 'react';
import membrosData from './membros.json';
import { numeroParaExtenso, dataParaExtenso } from './extenso';

export default function GeradorAtas() {
  const [tipoAta, setTipoAta] = useState('Conselho');
  const [numeroAta, setNumeroAta] = useState('');
  const [dataReuniao, setDataReuniao] = useState('');
  const [textoResolucao, setTextoResolucao] = useState('');
  const [presentes, setPresentes] = useState<string[]>([]);
  const [linhasDeFecho, setLinhasDeFecho] = useState(0);

  const formatarNome = (membro: any) => {
    return membro.sigla ? `${membro.sigla} ${membro.nome}` : membro.nome;
  };

  // Lógica de cálculo de linhas para preenchimento automático (O "Z")
  useEffect(() => {
    // Estimativa baseada em caracteres e número de presentes
    const caracteresPorLinha = 95;
    const linhasCabecalho = 8;
    const linhasPresentes = Math.ceil((presentes.join(", ").length || 0) / caracteresPorLinha);
    const linhasTexto = Math.ceil((textoResolucao.length || 0) / caracteresPorLinha);
    
    const totalUsado = linhasCabecalho + linhasPresentes + linhasTexto;
    const restantes = 43 - totalUsado; // Deixa margem para o rodapé
    setLinhasDeFecho(restantes > 0 ? restantes : 0);
  }, [textoResolucao, presentes]);

  const imprimir = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full print:block">
      
      {/* FORMULÁRIO (Escondido na impressão) */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 overflow-y-auto print:hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Redigir Documento</h2>
          <button 
            onClick={imprimir}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
          >
            Imprimir Ata (PDF)
          </button>
        </div>
        
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Tipo de Documento</label>
              <select 
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={tipoAta}
                onChange={(e) => setTipoAta(e.target.value)}
              >
                <option>Conselho</option>
                <option>Assembleia Geral</option>
                <option>UPH</option>
                <option>SAF</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Número</label>
              <input 
                type="number" 
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-blue-500"
                placeholder="Ex: 273"
                value={numeroAta}
                onChange={(e) => setNumeroAta(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Data da Reunião</label>
            <input 
              type="date" 
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-blue-500"
              onChange={(e) => setDataReuniao(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Marcar Presentes (84 Membros)</label>
            <div className="h-48 overflow-y-auto border border-slate-200 p-3 rounded-md bg-slate-50">
              {membrosData.map((membro: any) => (
                <label key={membro.nome} className="flex items-center space-x-2 mb-2 text-sm hover:bg-slate-100 p-1 rounded cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      const nomeFormatado = formatarNome(membro);
                      if (e.target.checked) setPresentes([...presentes, nomeFormatado]);
                      else setPresentes(presentes.filter(p => p !== nomeFormatado));
                    }}
                  />
                  <span className="text-slate-700">{formatarNome(membro)}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Texto das Resoluções</label>
            <textarea 
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-blue-500 h-64 text-sm"
              placeholder="Descreva as decisões tomadas..."
              value={textoResolucao}
              onChange={(e) => setTextoResolucao(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      {/* PRÉ-VISUALIZAÇÃO A4 (O que será impresso) */}
      <div className="flex justify-center bg-slate-200 p-0 lg:p-4 overflow-y-auto rounded-lg print:bg-white print:p-0">
        <div 
          id="folha-oficial" 
          className="w-[210mm] min-h-[297mm] bg-white p-[20mm] pl-[35mm] shadow-2xl relative text-black print:shadow-none print:m-0"
          style={{ fontFamily: 'Arial, sans-serif', fontSize: '12pt', lineHeight: '1.5', textAlign: 'justify', hyphens: 'auto' }}
        >
          
          {/* Numeração Lateral */}
          <div className="absolute left-[20mm] top-[20mm] text-right w-[8mm] text-slate-400 select-none text-[10pt] print:text-black">
            {Array.from({ length: 45 }, (_, i) => (
              <div key={i+1} className="h-[1.5em]">{i + 1}</div>
            ))}
          </div>

          {/* Conteúdo da Ata */}
          <div className="relative z-10">
            <p className="font-bold text-center mb-8 uppercase underline">
              ATA NÚMERO {numeroAta || "___"} - {tipoAta.toUpperCase()}
            </p>
            
            <p className="mb-4">
              <strong>Ata número {numeroAta ? numeroParaExtenso(parseInt(numeroAta)) : "________"} ({numeroAta || "___"})</strong> da reunião do {tipoAta} da Igreja Presbiteriana de Várzea do Poço-BA. 
              Aos {dataReuniao ? dataParaExtenso(dataReuniao) : "____ dias do mês de ________ de dois mil e vinte e seis"}, 
              reuniram-se na sede da Igreja, situada na Av. Durval Gama, nº 17, Centro, 
              estando presentes: {presentes.length > 0 ? presentes.join(", ") : "________________"}.
            </p>
            
            <p className="whitespace-pre-wrap mb-4">
              {textoResolucao}
            </p>

            {/* Linhas de Fechamento Automáticas */}
            {Array.from({ length: linhasDeFecho }).map((_, i) => (
              <div key={i} className="border-b border-black h-[1.5em] w-full mt-1"></div>
            ))}
          </div>

          {/* Rodapé de Segurança */}
          <div className="absolute bottom-[20mm] left-[35mm] right-[20mm] border-t border-black pt-2 text-[10pt] italic">
            Documento gerado digitalmente pela Secretaria da IPVP - {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>
    </div>
  );
}