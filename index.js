const { readFileSync } = require('fs');

function getPeca(pecas, apre) {
  return pecas[apre.id];
}

function calcularTotalApresentacao(pecas, apre) {
  let total = 0;
  switch (getPeca(pecas, apre).tipo) {
    case "tragedia":
      total = 40000;
      if (apre.audiencia > 30) {
        total += 1000 * (apre.audiencia - 30);
      }
      break;
    case "comedia":
      total = 30000;
      if (apre.audiencia > 20) {
          total += 10000 + 500 * (apre.audiencia - 20);
      }
      total += 300 * apre.audiencia;
      break;
    default:
      throw new Error(`Peça desconhecia: ${getPeca(pecas, apre).tipo}`);
  }
  return total;
}

function calcularCredito(pecas, apre) {
  let creditos = 0;
  creditos += Math.max(apre.audiencia - 30, 0);
  if (getPeca(pecas, apre).tipo === "comedia") 
     creditos += Math.floor(apre.audiencia / 5);
  return creditos;   
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    { style: "currency", currency: "BRL",
      minimumFractionDigits: 2 }).format(valor/100);
}

function calcularTotalFatura(pecas, apresentacoes) {
  let totalFatura = 0;
  for (let apre of apresentacoes) {
    totalFatura += calcularTotalApresentacao(pecas, apre);
  }
  return totalFatura
}

function calcularTotalCreditos(pecas, apresentacoes) {
  let creditos = 0;
  for (let apre of apresentacoes) {
    creditos += calcularCredito(pecas, apre);
  }
  return creditos;
}

function gerarFaturaStr (fatura, pecas) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  let apresentacoes = fatura.apresentacoes;
  for (let apre of apresentacoes) {
    faturaStr += `  ${getPeca(pecas, apre).nome}: ${formatarMoeda(calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(calcularTotalFatura(pecas, apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calcularTotalCreditos(pecas, apresentacoes)} \n`;
  return faturaStr;
}

function gerarFaturaHTML (fatura, pecas) {
  let faturaHTML = `<html>\n`;
  faturaHTML += `<p> Fatura ${fatura.cliente} </p>\n`;
  faturaHTML += `<ul>\n`;
  let apresentacoes = fatura.apresentacoes;
  for (let apre of apresentacoes) {
    faturaHTML += `<li>  ${getPeca(pecas, apre).nome}: ${formatarMoeda(calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos) </li>\n`;
  }
  faturaHTML += `</ul>\n`;
  faturaHTML += `<p> Valor total: ${formatarMoeda(calcularTotalFatura(pecas, apresentacoes))} </p>\n`;
  faturaHTML += `<p> Créditos acumulados: ${calcularTotalCreditos(pecas, apresentacoes)} </p>\n`;
  faturaHTML += `</html>\n`;
  return faturaHTML;
}

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas);
console.log(faturaStr);
const faturaHTML = gerarFaturaHTML(faturas, pecas);
console.log(faturaHTML);
