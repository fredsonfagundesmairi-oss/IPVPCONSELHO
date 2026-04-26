"use client";

import { useState, useEffect } from 'react';

// Conversão por extenso
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

// Rol Geral de Membros da IPVP
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
    if (tipo === 'pres' && !presentes.includes(nome)) {
      setPresentes([...presentes, nome]);
      setBuscaPres('');
    } else if (tipo === 'aus' && !ausentes.includes(nome)) {
      setAusentes([...ausentes, nome]);
      setBuscaAus('');
    }
  };

  const removeMembro = (tipo: 'pres' | 'aus', nome: string) => {
    if (tipo === 'pres') setPresentes(presentes.filter(n => n !== nome));
    if (tipo === 'aus') setAusentes(ausentes.filter(n => n !== nome));
  };

  const renderCampoInteligente = (valor: string, setValor: (v: string) => void, placeholder: string) => {
    const mostrarLista = valor.length >= 3 && !membrosIgreja.includes(valor);
    const resultados = membrosIgreja.filter(m => m.toLowerCase().includes(valor.toLowerCase()));

    return (
      <div className="relative">
        <input 
          type="text" value={valor} onChange={e => setValor(e.target.value)} 
          placeholder={placeholder} className="w-full p-2 border text-sm rounded bg-white"
        />
        {mostrarLista && resultados.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white border shadow-xl z-20 rounded">
            {resultados.map(m => (
              <li key={m} onClick={() => setValor(m)} className="p-2 text-sm hover:bg-blue-100 cursor-pointer border-b">{m}</li>
            ))}
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
    if (ausentes.length > 0) {
      quorumText += ` Ausências registradas: ${ausentes.join('; ')}.`;
    }

    const secretario = sociedade === 'SAF' ? 'Jucirene Lopes da Silva Cunha' : 'Adevaldo Marques Rios';
    const cargoSec = sociedade === 'SAF' ? 'Primeira Secretária' : 'Secretário';

    // A linha de fechamento para inutilizar o restante do espaço em branco
    const linhaFechamento = "_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________";

    return `ATA ${numExtenso} (${numero}) DA REUNIÃO DO ${sociedade.toUpperCase()} DA IGREJA PRESBITERIANA DE VÁRZEA DO POÇO – BA[1]. Aos ${dataExtenso}, às ${horaExtenso}, reuniu-se o ${sociedade === 'Conselho' ? 'Conselho' : sociedade} da Igreja Presbiteriana de Várzea do Poço – BA, no templo situado à Avenida Dr. Durval Gama, nº 17, Centro. QUÓRUM[2]: ${quorumText} Ficando assim caracterizado o quórum regimental para a realização dos trabalhos. DEVOCIONAL[3]: A devocional foi conduzida por ${devocionalDirigente || '__________'}, com a leitura bíblica em ${devocionalLeitura || '__________'}, entoando-se os louvores ${devocionalLouvor || '__________'} e oração proferida por ${devocionalOracao || '__________'}. Em seguida, a presidência passou a palavra ao secretário para a leitura da ata anterior, a qual foi aprovada. PAUTA E RESOLUÇÕES[4]: Passou-se às pautas e deliberações: ${pautas.map((p, i) => `${i + 1}- ${p}. Resolução: ${resolucoes[i]}`).join('; ')}. ENCERRAMENTO[5]: Nada mais havendo a tratar, a reunião foi encerrada às ${horaPorExtenso(horaFim)}, com oração proferida por ${oracaoFinal || '__________'}. Eu, ${secretario}, ${cargoSec}, lavrei a presente ata, que será devidamente assinada. ${linhaFechamento}`;
  };

  const gerarRodape = () => {
    return `[1] ATA nº ${numeroParaExtenso(parseInt(numero))} (${numero}) - Número, data e hora da reunião por extenso.
[2] QUÓRUM - Registro dos presentes (${numeroParaExtenso(presentes.length)}) e ausências (${numeroParaExtenso(ausentes.length)}).
[3] DEVOCIONAL - Momento de liturgia, leitura e oração.
[4] PAUTA E RESOLUÇÕES - Itens discutidos e decisões tomadas.
[5] ENCERRAMENTO - Horário de término e registro da assinatura.`;
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-black">
      
      {/* Força Bruta CSS: Esconde TUDO na tela de impressão, exceto a ata */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #area-de-impressao, #area-de-impressao * {
            visibility: visible;
          }
          #area-de-impressao {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          .no-print { display: none !important; }
        }
      `}} />

      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        
        {/* Painel de Edição - Oculto na Impressão */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 no-print">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-xl font-bold">Escrivão Digital IPVP</h1>
            <div className="space-x-2">
              <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-bold">🖨️ Imprimir Ata Oficial</button>
              <button onClick={() => {
                navigator.clipboard.writeText(gerarTextoPrincipal() + "\n\n" + gerarRodape());
                alert("Ata copiada!");
              }} className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700">Copiar Texto</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h2 className="font-bold text-blue-700 text-xs">DADOS BÁSICOS</h2>
              <select value={sociedade} onChange={e => setSociedade(e.target.value)} className="w-full p-2 border rounded font-semibold bg-slate-50">
                <option value="Conselho">Conselho da Igreja</option>
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

            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 relative">
                <h2 className="font-bold text-blue-800 text-xs uppercase mb-2">Presentes</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {presentes.map(nome => (
                    <span key={nome} className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      {nome} <button type="button" onClick={() => removeMembro('pres', nome)} className="font-bold hover:text-blue-200">×</button>
                    </span>
                  ))}
                </div>
                <input type="text" value={buscaPres} onChange={e => setBuscaPres(e.target.value)} onKeyDown={e => { if(e.key === 'Enter') addMembro('pres', buscaPres); }} placeholder="Buscar presente..." className="w-full p-2 text-sm border rounded" />
                {buscaPres.length >= 3 && (
                  <ul className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white border shadow-lg z-10 rounded">
                    {membrosIgreja.filter(m => m.toLowerCase().includes(buscaPres.toLowerCase())).map(m => (
                      <li key={m} onClick={() => addMembro('pres', m)} className="p-2 text-sm hover:bg-blue-100 cursor-pointer border-b">{m}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-red-50 p-3 rounded-lg border border-red-100 relative">
                <h2 className="font-bold text-red-800 text-xs uppercase mb-2">Ausentes</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {ausentes.map(nome => (
                    <span key={nome} className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      {nome} <button type="button" onClick={() => removeMembro('aus', nome)} className="font-bold hover:text-red-200">×</button>
                    </span>
                  ))}
                </div>
                <input type="text" value={buscaAus} onChange={e => setBuscaAus(e.target.value)} onKeyDown={e => { if(e.key === 'Enter') addMembro('aus', buscaAus); }} placeholder="Buscar ausente..." className="w-full p-2 text-sm border rounded" />
                {buscaAus.length >= 3 && (
                  <ul className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white border shadow-lg z-10 rounded">
                    {membrosIgreja.filter(m => m.toLowerCase().includes(buscaAus.toLowerCase())).map(m => (
                      <li key={m} onClick={() => addMembro('aus', m)} className="p-2 text-sm hover:bg-red-100 cursor-pointer border-b">{m}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-bold text-blue-700 text-xs uppercase">Devocional</h2>
              {renderCampoInteligente(devocionalDirigente, setDevocionalDirigente, "Dirigente")}
              <input placeholder="Texto Bíblico" value={devocionalLeitura} onChange={e => setDevocionalLeitura(e.target.value)} className="w-full p-2 border text-sm rounded" />
              <input placeholder="Hinos" value={devocionalLouvor} onChange={e => setDevocionalLouvor(e.target.value)} className="w-full p-2 border text-sm rounded" />
              {renderCampoInteligente(devocionalOracao, setDevocionalOracao, "Oração Devocional")}
              <h2 className="font-bold text-blue-700 text-xs mt-4 uppercase">Encerramento</h2>
              {renderCampoInteligente(oracaoFinal, setOracaoFinal, "Oração Final")}
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
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

        {/* --- ÁREA EXCLUSIVA DE IMPRESSÃO --- */}
        <div id="area-de-impressao" className="bg-white mx-auto shadow-2xl print:shadow-none mt-8" style={{ width: '210mm', minHeight: '297mm', padding: '20mm', paddingLeft: '10mm' }}>
          
          <div className="relative font-serif text-[13pt] text-black">
            
            {/* Coluna de Números (Margem Esquerda) - Sem bordas, apenas números */}
            <div className="absolute left-0 top-0 bottom-0 w-[40px] text-right pr-3 select-none text-black font-bold font-sans opacity-80 z-0">
              {Array.from({ length: 150 }).map((_, i) => (
                <div key={i} style={{ height: '32px', lineHeight: '32px' }}>{i + 1}</div>
              ))}
            </div>

            {/* Texto da Ata Alinhado com os Números */}
            <div className="pl-[50px] relative z-10 text-justify" style={{ lineHeight: '32px' }}>
              
              {/* Texto Principal com quebra automática e linha de preenchimento no fim */}
              <p className="whitespace-pre-wrap m-0 p-0">
                {gerarTextoPrincipal()}
              </p>
              
              {/* Rodapé pulando uma linha */}
              <p className="mt-[32px] whitespace-pre-wrap italic m-0 p-0 font-mono text-[11pt]">
                {gerarRodape()}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
