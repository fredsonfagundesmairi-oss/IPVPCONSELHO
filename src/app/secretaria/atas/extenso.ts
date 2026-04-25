// app/secretaria/atas/extenso.ts

export function numeroParaExtenso(n: number): string {
  const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const dezenaEspecial = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const centenas = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

  if (n === 0) return "zero";
  if (n === 100) return "cem";

  let extenso = "";

  if (n >= 100) {
    extenso += centenas[Math.floor(n / 100)];
    n %= 100;
    if (n > 0) extenso += " e ";
  }

  if (n >= 20) {
    extenso += dezenas[Math.floor(n / 10)];
    n %= 10;
    if (n > 0) extenso += " e ";
  } else if (n >= 10) {
    return extenso + dezenaEspecial[n - 10];
  }

  if (n > 0) {
    extenso += unidades[n];
  }

  return extenso;
}

export function dataParaExtenso(dataStr: string): string {
  if (!dataStr) return "";
  const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];
  
  const [ano, mes, dia] = dataStr.split('-').map(Number);
  
  const diaExtenso = numeroParaExtenso(dia);
  const mesExtenso = meses[mes - 1];
  const anoExtenso = `dois mil e vinte e ${numeroParaExtenso(ano % 10)}`; // Ajustado para sua década atual

  return `${diaExtenso} dias do mês de ${mesExtenso} do ano de ${anoExtenso}`;
}