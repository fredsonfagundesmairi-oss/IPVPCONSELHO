"use client";

import { useState, useEffect } from 'react';

// Funções de conversão por extenso (Padrão de Atas)
const numeroParaExtenso = (n: number, feminino = false) => {
  const unidades = ["zero", feminino ? "uma" : "um", feminino ? "duas" : "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const dezenas = ["", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const centenas = ["", "cento", feminino ? "duzentas" : "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
  if (n < 10) return unidades[n];
  if (n < 20) return ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"][n - 10];
  if (n < 100) return dezenas[Math.floor(n / 10)] + (n % 10 !== 0 ? " e " + unidades[n % 10] : "");
  return n.toString();
};

const dataPorExtenso = (dataStr: string) => {
  if (!dataStr) return "_________";
  const [ano, mes, dia] = dataStr.split('-').map(Number);
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${numeroParaExtenso(dia)} dias do mês de ${meses[mes - 1]} do ano de ${numeroParaExtenso(ano)}`;
};

const horaPorExtenso = (horaStr: string) => {
  if (!horaStr) return "_________";
  const [h, m] = horaStr.split(':').map(Number);
  return `${numeroParaExtenso(h, true)} hora${h !== 1 ? 's' : ''}${m > 0 ? ' e ' + numeroParaExtenso(m) + ' minutos' : ''}`;
};

const membrosIgreja = [
  "Adeílda Gomes de Oliveira", "Adevaldo Marques Rios", "Agnaldo Vieira de Sá", "Alzerita Santos de Souza", 
  "Antônio Jacinto Filho", "Antônio Rios dos Santos", "Berenalva Souza Rios Nascimento", "Bereni Lopes Rios", 
  "Berenice Maria da Silva Lopes", "Bernadet Araújo da Silva", "Carlito de Oliveira Cunha", "Dalva Cerqueira Silva Matos", 
  "Debura Rios Ribeiro", "Diana Rios Alves Fagundes", "Edelice Lopes da Silva", "Elida Suzart Lima", "Elique Rios Filho", 
  "Elisa Silva Silva Sena", "Elizânia Gonçalves da Silva Rios", "Euflorsina da Cunha Oliveira", "Evangelina de Oliveira Santos", 
  "Evanuzia Santos dos Reis", "Fabiana de Carvalho Barbosa", "Gehanne de Matos Rios", "Gildete Souza Rios", 
  "Guilherina Barbosa Costa", "HELOISA BARBOSA DA SILVA", "Iara Silva Sena", "Imarcélia Lima Rios", "Iraci Maria de Matos Rios", 
  "Iradã Rios de Abreu", "Irandir da Silva Rios", "Ivoneide Sousa Rios Oliveira", "Izabel Mota de Sousa Cunha", 
  "Joseane da Silva Souza", "José de Oliveira Cunha", "José dos Santos Oliveira", "Jucineide Rios Oliveira", 
  "Jucirene Lopes da Silva Cunha", "Leonídio Ferreira dos Santos", "Maria Betina Cunha Franco", "Marilene Goncalves da Silva", 
  "Meire da Silva Almeida Evangelista", "Milton Pereira Rios", "Pb. Adevaldo Marques Rios", "Pb. Elique Rios Filho", 
  "Pr. Fredson Fagundes Cerqueira", "Robério Araújo Evangelista", "Thayz Mota Cunha Franco", "Uriel da Silva Cunha"
].sort();

export default function SecretariaDigital() {
  const [sociedade, setSociedade] = useState('Conselho');
  const [numero, setNumero] = useState('212');
  const [data, setData] = useState('');
  const [horaInício, setHoraInício] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [presentes, setPresentes] = useState<string[]>([]);
  const [ausentes, setAusentes] = useState<string[]>([]);
  const [buscaPres, setBuscaPres] = useState('');
  const [buscaAus, setBuscaAus] = useState('');
  const [devocionalDirigente, setDevocionalDirigente] = useState('');
  const [devocionalLeitura, setDevocionalLeitura] = useState('');
  const [devocionalLouvor, setDevocionalLouvor] = useState('');
  const [devocionalOracao, setDevocionalOracao] = useState('');
  const [pautas, setPautas] = useState(['']);
  const [resolucoes, setResolucoes] = useState(['']);
  const [oracaoFinal, setOracaoFinal] = useState('');

  useEffect(() => {
    if (sociedade === 'Conselho') {
      setPresentes(["Pr. Fredson Fagundes Cerqueira", "Pb. Elique Rios Filho", "Pb. Adevaldo Marques Rios"]);
      setAusentes([]);
    } else {
      setPresentes([]);
      setAusentes([]);
    }
  }, [sociedade]);

  const addMembro = (tipo: 'pres' | 'aus', nome: string) => {
    if (!nome.trim()) return;
    if (tipo === 'pres' && !presentes.includes(nome)) setPresentes([...presentes, nome]);
    else if (tipo === 'aus' && !ausentes.includes(nome)) setAusentes([...ausentes, nome]);
    setBuscaPres(''); setBuscaAus('');
  };

  const renderCampoInteligente = (valor: string, setValor: (v: string) => void, placeholder: string) => {
    const mostrarLista = valor.length >= 3 && !membrosIgreja.includes(valor);
    const resultados = membrosIgreja.filter(m => m.toLowerCase().includes(valor.toLowerCase()));
    return (
      <div className="relative">
        <input type="text" value={valor} onChange={e => setValor(e.target.value)} placeholder={placeholder} className="w-full p-2 border text-sm rounded bg-white text-black" />
        {mostrarLista && resultados.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white border shadow-xl z-20 rounded text-black">
            {resultados.map(m => <li key={m} onClick={() => setValor(m)} className="p-2 text-sm hover:bg-blue-100 cursor-pointer border-b">{m}</li>)}
          </ul>
        )}
      </div>
    );
  };

  const gerarTextoPrincipal = () => {
    const numExtenso = numeroParaExtenso(parseInt(numero)).toUpperCase();
    const dataExtenso = dataPorExtenso(data);
    const horaExtenso = horaPorExtenso(horaInício);
    let quorumText = `Procedida a verificação de quórum, constatou-se a presença de: ${presentes.length > 0 ? presentes.join('; ') : '__________'}.`;
    if (ausentes.length > 0) quorumText += ` Ausências registradas: ${ausentes.join('; ')}.`;
    const secretario = sociedade === 'SAF' ? 'Jucirene Lopes da Silva Cunha' : 'Adevaldo Marques Rios';
    const cargoSec = sociedade === 'SAF' ? 'Primeira Secretária' : 'Secretário';

    return `ATA ${numExtenso} (${numero}) DA REUNIÃO DO ${sociedade.toUpperCase()} DA IGREJA PRESBITERIANA DE VÁRZEA DO POÇO – BA. Aos ${dataExtenso}, às ${horaExtenso}, reuniu-se o ${sociedade === 'Conselho' ? 'Conselho' : sociedade} da Igreja Presbiteriana de Várzea do Poço – BA, no templo situado à Avenida Dr. Durval Gama, nº 17, Centro. QUÓRUM: ${quorumText} Ficando assim caracterizado o quórum regimental para a realização dos trabalhos. DEVOCIONAL: A devocional foi conduzida por ${devocionalDirigente || '__________'}, com a leitura bíblica em ${devocionalLeitura || '__________'}, entoando-se os louvores ${devocionalLouvor || '__________'} e oração proferida por ${devocionalOracao || '__________'}. Em seguida, a presidência passou a palavra ao secretário para a leitura da ata anterior, a qual foi aprovada. PAUTA E RESOLUÇÕES: Passou-se às pautas e deliberações: ${pautas.map((p, i) => `${i + 1}- ${p}. Resolução: ${resolucoes[i]}`).join('; ')}. ENCERRAMENTO: Nada mais havendo a tratar, a reunião foi encerrada às ${horaPorExtenso(horaFim)}, com oração proferida por ${oracaoFinal || '__________'}. Eu, ${secretario}, ${cargoSec}, lavrei a presente ata, que será devidamente assinada. `;
  };

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white text-black">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin-top: 3cm; margin-bottom: 2cm; margin-left: 3cm; margin-right: 2cm; }
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-area { 
            position: relative; 
            width: 100%; 
            height: 100%; 
            box-shadow: none !important;
            padding: 0 !important;
          }
          .line-number { font-weight: bold; font-family: sans-serif; position: absolute; left: -2.5cm; width: 2cm; text-align: center; }
          .footer-print { 
            position: fixed; 
            bottom: 0; 
            width: 100%; 
            font-size: 11pt; 
            line-height: 1.0; 
            text-align: justify;
            font-family: serif;
            font-style: italic;
          }
        }
      `}} />

      <div className="max-w-5xl mx-auto p-4 no-print">
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-xl font-bold">Escrivão Digital IPVP</h1>
            <div className="space-x-2">
              <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">🖨️ Imprimir Ata</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h2 className="font-bold text-blue-700 text-xs uppercase">Dados</h2>
              <select value={sociedade} onChange={e => setSociedade(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
                <option value="Conselho">Conselho</option>
                <option value="UPH">UPH</option>
                <option value="SAF">SAF</option>
              </select>
              <input type="number" value={numero} onChange={e => setNumero(e.target.value)} className="w-full p-2 border rounded" placeholder="Ata Nº" />
              <input type="date" value={data} onChange={e => setData(e.target.value)} className="w-full p-2 border rounded" />
              <div className="flex gap-2">
                <input type="time" value={horaInício} onChange={e => setHoraInício(e.target.value)} className="w-1/2 p-2 border rounded" />
                <input type="time" value={horaFim} onChange={e => setHoraFim(e.target.value)} className="w-1/2 p-2 border rounded" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="font-bold text-blue-700 text-xs uppercase">Presenças</h2>
              <input type="text" value={buscaPres} onChange={e => setBuscaPres(e.target.value)} onKeyDown={e => e.key === 'Enter' && addMembro('pres', buscaPres)} placeholder="Buscar presente..." className="w-full p-2 text-sm border rounded" />
              <div className="flex flex-wrap gap-1">
                {presentes.map(n => <span key={n} className="bg-blue-100 text-blue-800 text-[10px] px-2 py-1 rounded flex items-center">{n} <button onClick={() => setPresentes(presentes.filter(x => x !== n))} className="ml-1 font-bold">×</button></span>)}
              </div>
              <h2 className="font-bold text-red-700 text-xs uppercase">Ausentes</h2>
              <input type="text" value={buscaAus} onChange={e => setBuscaAus(e.target.value)} onKeyDown={e => e.key === 'Enter' && addMembro('aus', buscaAus)} placeholder="Buscar ausente..." className="w-full p-2 text-sm border rounded" />
              <div className="flex flex-wrap gap-1">
                {ausentes.map(n => <span key={n} className="bg-red-100 text-red-800 text-[10px] px-2 py-1 rounded flex items-center">{n} <button onClick={() => setAusentes(ausentes.filter(x => x !== n))} className="ml-1 font-bold">×</button></span>)}
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="font-bold text-blue-700 text-xs uppercase">Devocional</h2>
              {renderCampoInteligente(devocionalDirigente, setDevocionalDirigente, "Dirigente")}
              <input placeholder="Texto Bíblico" value={devocionalLeitura} onChange={e => setDevocionalLeitura(e.target.value)} className="w-full p-2 border text-sm rounded" />
              <input placeholder="Hinos" value={devocionalLouvor} onChange={e => setDevocionalLouvor(e.target.value)} className="w-full p-2 border text-sm rounded" />
              {renderCampoInteligente(devocionalOracao, setDevocionalOracao, "Oração Devocional")}
              <h2 className="font-bold text-blue-700 text-xs mt-2 uppercase">Fim</h2>
              {renderCampoInteligente(oracaoFinal, setOracaoFinal, "Oração Final")}
            </div>
          </div>
          <div className="mt-4 border-t pt-4">
             {pautas.map((_, i) => (
               <div key={i} className="flex gap-2 mb-2">
                 <input placeholder={`Pauta ${i+1}`} value={pautas[i]} onChange={e => { const n = [...pautas]; n[i] = e.target.value; setPautas(n); }} className="w-1/2 p-2 border rounded text-sm" />
                 <input placeholder={`Resolução ${i+1}`} value={resolucoes[i]} onChange={e => { const n = [...resolucoes]; n[i] = e.target.value; setResolucoes(n); }} className="w-1/2 p-2 border rounded text-sm" />
               </div>
             ))}
             <button onClick={() => { setPautas([...pautas, '']); setResolucoes([...resolucoes, '']); }} className="text-blue-600 text-xs font-bold">+ Adicionar Assunto</button>
          </div>
        </div>
      </div>

      {/* ÁREA DE IMPRESSÃO OFICIAL */}
      <div className="print-area bg-white mx-auto shadow-2xl relative overflow-hidden" style={{ width: '210mm', minHeight: '297mm', padding: '0mm' }}>
        
        {/* Camada do Texto e das Linhas Contínuas */}
        <div className="relative font-serif text-[13pt] text-black text-justify" style={{ lineHeight: '30px', margin: '3cm 2cm 2cm 3cm' }}>
          
          {/* Loop para gerar 30 linhas com numeração e traços se estiver vazio */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="relative w-full" style={{ height: '30px' }}>
              <span className="line-number no-print md:block hidden" style={{ position: 'absolute', left: '-2.5cm', width: '2cm', textAlign: 'center', fontWeight: 'bold' }}>{i + 1}</span>
              <span className="only-print" style={{ position: 'absolute', left: '-2.5cm', width: '2cm', textAlign: 'center', fontWeight: 'bold' }}>{i + 1}</span>
              
              {/* Esta camada simula o preenchimento das linhas que não têm texto */}
              <div className="absolute inset-0 pointer-events-none text-slate-300 opacity-50 z-0">
                ________________________________________________________________________________________
              </div>
            </div>
          ))}

          {/* O Texto real sobreposto às linhas para garantir alinhamento */}
          <div className="absolute top-0 left-0 right-0 z-10 whitespace-pre-wrap">
            {gerarTextoPrincipal()}
          </div>
        </div>

        {/* Rodapé fixo na margem inferior padrão */}
        <div className="footer-print p-[10px]" style={{ margin: '0 2cm 2cm 3cm' }}>
          <p>[1] ATA nº {numeroParaExtenso(parseInt(numero))} ({numero}) - Nº, data e hora por extenso.</p>
          <p>[2] QUÓRUM - Registro dos presentes ({numeroParaExtenso(presentes.length)}) e ausências ({numeroParaExtenso(ausentes.length)}).</p>
          <p>[3] DEVOCIONAL - Liturgia, leitura e oração inicial.</p>
          <p>[4] PAUTA E RESOLUÇÕES - Discussões e decisões.</p>
          <p>[5] ENCERRAMENTO - Horário e oração final.</p>
        </div>
      </div>
    </div>
  );
}
