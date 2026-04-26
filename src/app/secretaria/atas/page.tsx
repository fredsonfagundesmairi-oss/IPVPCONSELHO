"use client";

import { useState, useEffect } from 'react';

// Funções para conversão por extenso
const numeroParaExtenso = (n: number, feminino = false) => {
  const unidades = ["zero", feminino ? "uma" : "um", feminino ? "duas" : "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const dezenas = ["", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const especiais = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const centenas = ["", "cento", feminino ? "duzentas" : "duzentos", feminino ? "trezentas" : "trezentos", feminino ? "quatrocentas" : "quatrocentos", feminino ? "quinhentas" : "quinhentos", feminino ? "seiscentas" : "seiscentos", feminino ? "setecentas" : "setecentos", feminino ? "oitocentas" : "oitocentos", feminino ? "novecentas" : "novecentos"];

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
  const horaExt = numeroParaExtenso(h, true); // horas no feminino (duas horas)
  const minExt = m > 0 ? ` e ${numeroParaExtenso(m)} minutos` : '';
  return `${horaExt} hora${h !== 1 ? 's' : ''}${minExt}`;
};

export default function SecretariaDigital() {
  const [sociedade, setSociedade] = useState('UPH');
  const [numero, setNumero] = useState('201');
  const [data, setData] = useState('');
  const [horaInício, setHoraInício] = useState('');
  const [horaFim, setHoraFim] = useState('');
  
  const diretorias = {
    UPH: [
      { nome: "José dos Santos Oliveira", cargo: "Presidente" },
      { nome: "Robério Araújo Evangelista", cargo: "Vice-Presidente" },
      { nome: "Adevaldo Marques Rios", cargo: "1º Secretário" },
      { nome: "Elique Rios Filho", cargo: "2º Secretário" },
      { nome: "Antônio Rios dos Santos", cargo: "Tesoureiro" }
    ],
    SAF: [
      { nome: "Iradã Rios de Abreu", cargo: "Presidente" },
      { nome: "Thayz Mota Cunha Franco", cargo: "Vice-Presidente" },
      { nome: "Jucirene Lopes da Silva Cunha", cargo: "1ª Secretária" },
      { nome: "Elizânia Gonçalves da Silva Rios", cargo: "2ª Secretária" },
      { nome: "Izabel Mota de Sousa Cunha", cargo: "Tesoureira" }
    ]
  };

  const [diretoriaPresente, setDiretoriaPresente] = useState<string[]>([]);
  const [sociosPresentes, setSociosPresentes] = useState(['']);
  const [sociosAusentes, setSociosAusentes] = useState(['']);
  
  const [devocionalOração, setDevocionalOração] = useState('');
  const [devocionalLeitura, setDevocionalLeitura] = useState('');
  const [devocionalCantico, setDevocionalCantico] = useState('');
  
  const [finAnterior, setFinAnterior] = useState('');
  const [finEntradas, setFinEntradas] = useState('');
  const [finSaidas, setFinSaidas] = useState('');
  
  const [pautas, setPautas] = useState(['']);
  const [resolucoes, setResolucoes] = useState(['']);
  const [oracaoEncerramento, setOracaoEncerramento] = useState('');

  // Atualiza a diretoria sempre que trocar a sociedade
  useEffect(() => {
    const diretoriaAtual = sociedade === 'UPH' ? diretorias.UPH : diretorias.SAF;
    setDiretoriaPresente(diretoriaAtual.map(d => d.nome));
  }, [sociedade]);

  const gerarTextoPrincipal = () => {
    const numExtenso = numeroParaExtenso(parseInt(numero)).toUpperCase();
    const numMinusculo = numeroParaExtenso(parseInt(numero));
    const dataExtenso = dataPorExtenso(data);
    const horaExtenso = horaPorExtenso(horaInício);
    const horaFimExtenso = horaPorExtenso(horaFim);
    
    const isSAF = sociedade === 'SAF';
    const nomeSociedade = isSAF ? "Sociedade Auxiliadora Feminina" : "União Presbiteriana de Homens";
    const sigla = isSAF ? "SAF" : "UPH";
    const nomeMembros = isSAF ? "sócias" : "sócios";
    const diretoriaAtual = isSAF ? diretorias.SAF : diretorias.UPH;
    
    const presentesList = sociosPresentes.filter(s => s.trim() !== '');
    const ausentesList = sociosAusentes.filter(s => s.trim() !== '');
    const totalSocios = presentesList.length + diretoriaPresente.length;
    
    const secretarioAtual = diretoriaAtual.find(d => d.cargo.includes("Secretári"));
    const presidenteAtual = diretoriaAtual.find(d => d.cargo.includes("Presidente") && !d.cargo.includes("Vice"));

    return `ATA ${numExtenso} (${numero}) DA REUNIÃO DA ${nomeSociedade.toUpperCase()} DE VÁRZEA DO POÇO – BA[1]. Aos ${dataExtenso}, às ${horaExtenso}, reuniu-se a ${nomeSociedade} (${sigla}) da Igreja Presbiteriana de Várzea do Poço – BA, no templo situado à Avenida Dr. Durval Gama, nº 17, Centro. QUÓRUM[2]: Procedida a verificação de quórum, estiveram presentes os membros da Diretoria: ${diretoriaAtual.filter(d => diretoriaPresente.includes(d.nome)).map(d => `${d.cargo}, ${d.nome}`).join('; ')}. Constatou-se a participação de ${numeroParaExtenso(totalSocios)} ${nomeMembros}: Além da diretoria, estiveram presentes ${presentesList.length > 0 ? presentesList.join('; ') : 'os demais'} e a ausência de ${numeroParaExtenso(ausentesList.length)} ${nomeMembros}: ${ausentesList.length > 0 ? ausentesList.join('; ') : 'nenhum'}; ficando assim caracterizado o quórum regimental para a realização dos trabalhos. DEVOCIONAL[3]: A devocional foi conduzida pel${isSAF ? 'a' : 'o'} Presidente, sendo a oração proferida por ${devocionalOração || '__________'}, seguida da leitura bíblica em ${devocionalLeitura || '__________'} e do cântico do ${devocionalCantico || '__________'}. Em seguida, a presidência passou a palavra ${isSAF ? 'à' : 'ao'} ${secretarioAtual?.cargo} para a leitura da anterior (${parseInt(numero)-1}), a qual, após lida, foi aprovada. No expediente, a tesouraria apresentou o relatório financeiro que consta de saldo do mês anterior ${finAnterior || '___'}, entradas ${finEntradas || '___'}, saída ${finSaidas || '___'}, saldo para o mês seguinte ________, o qual foi apreciado e aprovado. PAUTA E RESOLUÇÕES[4]: Passou-se às pautas: ${pautas.map((p, i) => `${i + 1}- ${p}`).join(', ')}. Quanto às resoluções, ficou definido: ${resolucoes.map((r, i) => `${i + 1}) ${r}`).join('; ')}. ENCERRAMENTO[5]: Nada mais havendo a tratar, a reunião foi encerrada às ${horaFimExtenso}, com oração proferida por ${oracaoEncerramento || '__________'}, seguida da recitação do mote da ${sigla} por todos. Eu, ${secretarioAtual?.nome}, ${secretarioAtual?.cargo}, lavrei a presente ata, que, após lida e aprovada, será devidamente assinada.`;
  };

  const gerarRodape = () => {
    const numMinusculo = numeroParaExtenso(parseInt(numero));
    return `
____________________________________________________
[1] ATA nº ${numMinusculo} (${numero}) - Colocar por extenso o numero, data e hora da reunião.
[2] QUÓRUM - Quantitativo de presentes e registro de ausências.
[3] DEVOCIONAL - Momento devocional, leitura e orações.
[4] PAUTA E RESOLUÇÕES - Registro das discussões e decisões tomadas.
[5] ENCERRAMENTO - Horário do encerramento e responsável pela oração final.`;
  };

  const gerarAtaCompleta = () => {
    return gerarTextoPrincipal() + "\n" + gerarRodape();
  };

  const diretorioAtivo = sociedade === 'UPH' ? diretorias.UPH : diretorias.SAF;
  const secretarioAtivo = diretorioAtivo.find(d => d.cargo.includes("1"));
  const presidenteAtivo = diretorioAtivo.find(d => d.cargo === "Presidente");

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 print:p-0 print:bg-white">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Painel de Edição - Esconde na Impressão */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 print:hidden">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-xl font-bold text-slate-800">Escrivão Digital IPVP</h1>
            <div className="space-x-2">
              <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Imprimir PDF</button>
              <button onClick={() => {
                navigator.clipboard.writeText(gerarAtaCompleta());
                alert("Ata copiada para a área de transferência!");
              }} className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700">Copiar Texto</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coluna 1: Cabeçalho */}
            <div className="space-y-4">
              <h2 className="font-bold text-blue-700 uppercase text-xs">Dados Básicos</h2>
              <select value={sociedade} onChange={e => setSociedade(e.target.value)} className="w-full p-2 border rounded font-bold bg-slate-50">
                <option value="UPH">UPH - Homens</option>
                <option value="SAF">SAF - Mulheres</option>
              </select>
              <input type="number" value={numero} onChange={e => setNumero(e.target.value)} className="w-full p-2 border rounded" placeholder="Nº da Ata" />
              <input type="date" value={data} onChange={e => setData(e.target.value)} className="w-full p-2 border rounded" />
              <div className="flex gap-2">
                <input type="time" value={horaInício} onChange={e => setHoraInício(e.target.value)} className="w-1/2 p-2 border rounded" />
                <input type="time" value={horaFim} onChange={e => setHoraFim(e.target.value)} className="w-1/2 p-2 border rounded" />
              </div>
            </div>

            {/* Coluna 2: Diretoria */}
            <div className="space-y-4">
              <h2 className="font-bold text-blue-700 uppercase text-xs">Diretoria Presente</h2>
              {diretorioAtivo.map(d => (
                <label key={d.nome} className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" checked={diretoriaPresente.includes(d.nome)} 
                    onChange={() => setDiretoriaPresente(prev => prev.includes(d.nome) ? prev.filter(n => n !== d.nome) : [...prev, d.nome])} />
                  <span>{d.cargo}: {d.nome.split(' ')[0]}</span>
                </label>
              ))}
              <div className="pt-2">
                <input placeholder="Outros Presentes (separar por vírgula)" onChange={e => setSociosPresentes(e.target.value.split(','))} className="w-full p-2 border text-sm rounded mb-2" />
                <input placeholder="Ausentes (separar por vírgula)" onChange={e => setSociosAusentes(e.target.value.split(','))} className="w-full p-2 border text-sm rounded" />
              </div>
            </div>

            {/* Coluna 3: Devocional */}
            <div className="space-y-4">
              <h2 className="font-bold text-blue-700 uppercase text-xs">Devocional</h2>
              <input placeholder="Quem orou?" value={devocionalOração} onChange={e => setDevocionalOração(e.target.value)} className="w-full p-2 border text-sm rounded" />
              <input placeholder="Leitura (Ex: Jo 3.16)" value={devocionalLeitura} onChange={e => setDevocionalLeitura(e.target.value)} className="w-full p-2 border text-sm rounded" />
              <input placeholder="Cântico" value={devocionalCantico} onChange={e => setDevocionalCantico(e.target.value)} className="w-full p-2 border text-sm rounded" />
              <input placeholder="Quem orou no final?" value={oracaoEncerramento} onChange={e => setOracaoEncerramento(e.target.value)} className="w-full p-2 border text-sm rounded mt-4" />
            </div>
          </div>

          <div className="mt-6">
             <h2 className="font-bold text-blue-700 uppercase text-xs mb-2">Pautas e Resoluções</h2>
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
             <button onClick={() => {setPautas([...pautas, '']); setResolucoes([...resolucoes, ''])}} className="text-blue-600 text-xs font-bold">+ Adicionar Item</button>
          </div>
        </div>

        {/* Visualização da Ata - Estilizada para Impressão */}
        <div className="bg-white p-12 shadow-2xl rounded-sm border-t-8 border-slate-800 min-h-[29.7cm] print:shadow-none print:border-0 print:p-0">
          <div className="text-justify text-[13pt] leading-[1.8] font-serif text-slate-800">
            <p className="first-line:font-bold whitespace-pre-wrap">
              {gerarTextoPrincipal()}
            </p>
            <p className="mt-8 text-sm whitespace-pre-wrap text-slate-600 font-mono leading-relaxed">
              {gerarRodape()}
            </p>
          </div>
          
          <div className="mt-20 grid grid-cols-2 gap-12 text-center print:mt-16">
            <div className="border-t border-black pt-2">
              <p className="text-sm font-bold uppercase">{presidenteAtivo?.nome}</p>
              <p className="text-xs">{presidenteAtivo?.cargo}</p>
            </div>
            <div className="border-t border-black pt-2">
              <p className="text-sm font-bold uppercase">{secretarioAtivo?.nome}</p>
              <p className="text-xs">{secretarioAtivo?.cargo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
