"use client";

import { useState, useEffect } from 'react';

// Funções para conversão por extenso
const numeroParaExtenso = (n: number, feminino = false) => {
  const unidades = ["zero", feminino ? "uma" : "um", feminino ? "duas" : "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const dezenas = ["", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const especiais = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const centenas = ["", "cento", feminino ? "duzentas" : "duzentos", feminino ? "trezentas" : "trezentos", feminino ? "quatrocentas" : "quatrocentos", feminino ? "quinhentas" : "quinhentos", feminino ? "seiscentas" : "seiscentos", feminino ? "setecentas" : "setecentas", feminino ? "oitocentas" : "oitocentas", feminino ? "novecentas" : "novecentas"];

  if (n === 100) return "cem";
  if (n < 10) return unidades[n];
  if (n >= 10 && n < 20) return especiais[n - 10];
  if (n < 100) return dezenas[Math.floor(n / 10)] + (n % 10 !== 0 ? " e " + unidades[n % 10] : "");
  if (n < 1000) return centenas[Math.floor(n / 100)] + (n % 100 !== 0 ? " e " + numeroParaExtenso(n % 100, feminino) : "");
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
  const horaExt = numeroParaExtenso(h, true);
  const minExt = m > 0 ? ` e ${numeroParaExtenso(m)} minutos` : '';
  return `${horaExt} hora${h !== 1 ? 's' : ''}${minExt}`;
};

export default function SecretariaDigital() {
  const [sociedade, setSociedade] = useState('Conselho');
  const [numero, setNumero] = useState('212');
  const [data, setData] = useState('');
  const [horaInício, setHoraInício] = useState('');
  const [horaFim, setHoraFim] = useState('');
  
  // Estrutura de dados
  const configuracoes = {
    Conselho: {
      nome: "Conselho",
      endereco: "Avenida Dr. Durval Gama, nº 17, Centro, Várzea do Poço-BA",
      secretario: "Pb. Adevaldo Marques Rios",
      membros: ["Pr. Fredson Fagundes Cerqueira", "Pb. Elique Rios Filho", "Pb. Adevaldo Marques Rios"],
      autoMarcar: true
    },
    UPH: {
      nome: "União Presbiteriana de Homens",
      endereco: "Avenida Dr. Durval Gama, nº 17, Centro, Várzea do Poço-BA",
      secretario: "Adevaldo Marques Rios",
      membros: ["José dos Santos Oliveira", "Robério Araújo Evangelista", "Adevaldo Marques Rios", "Elique Rios Filho", "Antônio Rios dos Santos"],
      autoMarcar: true
    },
    SAF: {
      nome: "Sociedade Auxiliadora Feminina",
      endereco: "Avenida Dr. Durval Gama, nº 17, Centro, Várzea do Poço-BA",
      secretario: "Jucirene Lopes da Silva Cunha",
      membros: ["Iradã Rios de Abreu", "Thayz Mota Cunha Franco", "Jucirene Lopes da Silva Cunha", "Elizânia Gonçalves da Silva Rios", "Izabel Mota de Sousa Cunha"],
      autoMarcar: false
    }
  };

  const [presentes, setPresentes] = useState<string[]>([]);
  
  // Novos estados da Devocional
  const [devocionalDirigente, setDevocionalDirigente] = useState('');
  const [devocionalLeitura, setDevocionalLeitura] = useState('');
  const [devocionalLouvor, setDevocionalLouvor] = useState('');
  const [devocionalOracao, setDevocionalOracao] = useState('');
  
  const [pautas, setPautas] = useState(['']);
  const [resolucoes, setResolucoes] = useState(['']);
  const [oracaoFinal, setOracaoFinal] = useState('');

  useEffect(() => {
    const config = configuracoes[sociedade as keyof typeof configuracoes];
    setPresentes(config.autoMarcar ? config.membros : []);
  }, [sociedade]);

  const gerarTextoPrincipal = () => {
    const config = configuracoes[sociedade as keyof typeof configuracoes];
    const numExtenso = numeroParaExtenso(parseInt(numero)).toUpperCase();
    const dataExtenso = dataPorExtenso(data);
    const horaExtenso = horaPorExtenso(horaInício);
    const horaFimExtenso = horaPorExtenso(horaFim);
    
    const isSAF = sociedade === 'SAF';
    const sigla = sociedade === 'Conselho' ? 'CONSELHO' : sociedade;
    
    return `ATA ${numExtenso} (${numero}) DA REUNIÃO DO ${sociedade === 'Conselho' ? 'CONSELHO' : sociedade.toUpperCase()} DA IGREJA PRESBITERIANA DE VÁRZEA DO POÇO – BA[1]. Aos ${dataExtenso}, às ${horaExtenso}, reuniu-se o ${config.nome} (${sigla}) da Igreja Presbiteriana de Várzea do Poço – BA, no templo situado à ${config.endereco}. QUÓRUM[2]: Procedida a verificação de quórum, constatou-se a presença de: ${presentes.join('; ')}. Ficando assim caracterizado o quórum regimental para a realização dos trabalhos. DEVOCIONAL[3]: A devocional foi conduzida por ${devocionalDirigente || '__________'}, com a leitura bíblica em ${devocionalLeitura || '__________'}, entoando-se os louvores ${devocionalLouvor || '__________'} e oração proferida por ${devocionalOracao || '__________'}. Em seguida, a presidência passou a palavra ao secretário para a leitura da ata anterior, a qual foi aprovada. PAUTA E RESOLUÇÕES[4]: Passou-se às pautas e deliberações: ${pautas.map((p, i) => `${i + 1}- ${p}. Resolução: ${resolucoes[i]}`).join('; ')}. ENCERRAMENTO[5]: Nada mais havendo a tratar, a reunião foi encerrada às ${horaFimExtenso}, com oração proferida por ${oracaoFinal || '__________'}. Eu, ${config.secretario}, lavrei a presente ata, que será devidamente assinada.`;
  };

  const gerarRodape = () => {
    return `
____________________________________________________
[1] ATA nº ${numeroParaExtenso(parseInt(numero))} (${numero}) - Número, data e hora da reunião por extenso.
[2] QUÓRUM - Registro dos presentes e verificação de legalidade.
[3] DEVOCIONAL - Dirigente, leitura bíblica, louvores e oração.
[4] PAUTA E RESOLUÇÕES - Itens discutidos e decisões tomadas.
[5] ENCERRAMENTO - Horário de término e registro da assinatura.`;
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 print:p-0 print:bg-white">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Painel de Edição */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 print:hidden">
          <div className="flex justify-between items-center mb-6 border-b pb-4 text-black">
            <h1 className="text-xl font-bold">Escrivão Digital IPVP</h1>
            <div className="space-x-2">
              <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Imprimir PDF</button>
              <button onClick={() => {
                navigator.clipboard.writeText(gerarTextoPrincipal() + "\n" + gerarRodape());
                alert("Texto copiado!");
              }} className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition">Copiar Texto</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
            {/* Coluna 1: Dados */}
            <div className="space-y-4">
              <h2 className="font-bold text-blue-700 text-xs">DADOS BÁSICOS</h2>
              <select value={sociedade} onChange={e => setSociedade(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
                <option value="Conselho">Conselho da Igreja</option>
                <option value="UPH">UPH - Homens</option>
                <option value="SAF">SAF - Mulheres</option>
              </select>
              <input type="number" value={numero} onChange={e => setNumero(e.target.value)} className="w-full p-2 border rounded" placeholder="Nº da Ata" />
              <input type="date" value={data} onChange={e => setData(e.target.value)} className="w-full p-2 border rounded" />
              <div className="flex gap-2">
                <input type="time" value={horaInício} onChange={e => setHoraInício(e.target.value)} className="w-1/2 p-2 border rounded" title="Hora de Início" />
                <input type="time" value={horaFim} onChange={e => setHoraFim(e.target.value)} className="w-1/2 p-2 border rounded" title="Hora de Término" />
              </div>
            </div>

            {/* Coluna 2: Presenças */}
            <div className="space-y-4">
              <h2 className="font-bold text-blue-700 text-xs">PRESENÇAS ({sociedade})</h2>
              <div className="max-h-48 overflow-y-auto space-y-1 border p-2 rounded">
                {configuracoes[sociedade as keyof typeof configuracoes].membros.map(m => (
                  <label key={m} className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" checked={presentes.includes(m)} 
                      onChange={() => setPresentes(prev => prev.includes(m) ? prev.filter(n => n !== m) : [...prev, m])} />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Coluna 3: Devocional e Encerramento */}
            <div className="space-y-2">
              <h2 className="font-bold text-blue-700 text-xs">DEVOCIONAL</h2>
              <input placeholder="Quem conduziu a devocional?" value={devocionalDirigente} onChange={e => setDevocionalDirigente(e.target.value)} className="w-full p-2 border text-sm rounded" />
              <input placeholder="Qual o texto lido? (ex: Sl 23)" value={devocionalLeitura} onChange={e => setDevocionalLeitura(e.target.value)} className="w-full p-2 border text-sm rounded" />
              <input placeholder="Músicas ou hinos cantados?" value={devocionalLouvor} onChange={e => setDevocionalLouvor(e.target.value)} className="w-full p-2 border text-sm rounded" />
              <input placeholder="Quem orou no final da devocional?" value={devocionalOracao} onChange={e => setDevocionalOracao(e.target.value)} className="w-full p-2 border text-sm rounded" />
              
              <h2 className="font-bold text-blue-700 text-xs mt-4">ENCERRAMENTO</h2>
              <input placeholder="Quem orou no encerramento da reunião?" value={oracaoFinal} onChange={e => setOracaoFinal(e.target.value)} className="w-full p-2 border text-sm rounded" />
            </div>
          </div>

          {/* Seção Inferior: Pautas */}
          <div className="mt-6 text-black border-t pt-4">
             <h2 className="font-bold text-blue-700 text-xs mb-2 uppercase">Assuntos da Reunião</h2>
             {pautas.map((_, i) => (
               <div key={i} className="flex gap-2 mb-2">
                 <input placeholder={`Pauta ${i+1}`} value={pautas[i]} onChange={e => {
                   const n = [...pautas]; n[i] = e.target.value; setPautas(n);
                 }} className="w-1/2 p-2 border rounded text-sm" />
                 <input placeholder={`Resolução ${i+1}`} value={resolucoes[i]} onChange={e => {
                   const n = [...resolucoes]; n[i] = e.target.value; setResolucoes(n);
                 }} className="w-1/2 p-2 border rounded text-sm" />
               </div>
             ))}
             <button onClick={() => {setPautas([...pautas, '']); setResolucoes([...resolucoes, ''])}} className="text-blue-600 text-xs font-bold">+ Adicionar Assunto</button>
          </div>
        </div>

        {/* Visualização da Ata - Estilo Manuscrito */}
        <div className="bg-white p-12 shadow-2xl min-h-[29.7cm] print:shadow-none print:p-0">
          <div className="text-justify text-[13pt] leading-[1.8] font-serif text-slate-800">
            <p className="whitespace-pre-wrap">
              {gerarTextoPrincipal()}
            </p>
            <p className="mt-12 text-sm text-slate-500 font-mono italic">
              {gerarRodape()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
