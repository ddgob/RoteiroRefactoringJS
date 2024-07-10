var formatarMoeda = require("./util.js");

module.exports = function gerarFaturaStr (fatura, calc) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    let apresentacoes = fatura.apresentacoes;
    for (let apre of apresentacoes) {
        faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
    }
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(apresentacoes))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(apresentacoes)} \n`;
    return faturaStr;
}
  
function gerarFaturaHTML (fatura, calc) {
    let faturaHTML = `<html>\n`;
    faturaHTML += `<p> Fatura ${fatura.cliente} </p>\n`;
    faturaHTML += `<ul>\n`;
    let apresentacoes = fatura.apresentacoes;
    for (let apre of apresentacoes) {
        faturaHTML += `<li>  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos) </li>\n`;
    }
    faturaHTML += `</ul>\n`;
    faturaHTML += `<p> Valor total: ${formatarMoeda(calc.calcularTotalFatura(apresentacoes))} </p>\n`;
    faturaHTML += `<p> Créditos acumulados: ${calc.calcularTotalCreditos(apresentacoes)} </p>\n`;
    faturaHTML += `</html>\n`;
    return faturaHTML;
}