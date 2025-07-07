
const pecas = {
  "Relação com retentor": [158.00, 20000],
  "Pneu dianteiro": [0.00, 40000],
  "Pneu traseiro": [0.00, 20000],
  "Pastilha dianteira": [25.00, 6000],
  "Pastilha traseira": [25.00, 6000],
  "Vela": [30.00, 12000],
  "Filtro de combustível": [0.00, 12000],
  "Filtro de ar": [0.00, 12000],
  "Cabo de embreagem": [0.00, 45000],
  "Cabo do acelerador": [0.00, 45000],
  "Óleo do motor": [45.00, 3000]
};

function formatarReal(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function parseValor(texto) {
  return parseFloat(texto.replace(",", "."));
}

function criarInputs() {
  const container = document.getElementById("pecasInputs");
  for (let nome in pecas) {
    const valor = pecas[nome][0].toFixed(2).replace(".", ",");
    const html = `
      <div class="peca-row">
        <label>${nome} (${pecas[nome][1]} km):</label>
        <div>
          <button type="button" onclick="ajustarValor('${nome}', -1)">-</button>
          <input type="text" id="${nome}" value="${valor}" />
          <button type="button" onclick="ajustarValor('${nome}', 1)">+</button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  }
}

function ajustarValor(nome, direcao) {
  const input = document.getElementById(nome);
  let valor = parseValor(input.value);
  if (isNaN(valor)) valor = 0;
  valor += direcao;
  input.value = valor.toFixed(2).replace(".", ",");
}

document.addEventListener("DOMContentLoaded", criarInputs);

document.getElementById("calcForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const km = parseValor(document.getElementById("km").value);
  const consumo = parseValor(document.getElementById("consumo").value);
  const precoGasolina = parseValor(document.getElementById("gasolina").value);

  if (isNaN(km) || isNaN(consumo) || isNaN(precoGasolina)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  let totalPecas = 0;
  let detalhes = "";

  for (let nome in pecas) {
    const preco = parseValor(document.getElementById(nome).value);
    const durabilidade = pecas[nome][1];
    if (preco > 0 && durabilidade > 0) {
      const custo = (preco / durabilidade) * km;
      totalPecas += custo;
      detalhes += `<li>${nome}: ${formatarReal(custo)}</li>`;
    }
  }

  const litros = km / consumo;
  const gastoGasolina = litros * precoGasolina;
  const total = totalPecas + gastoGasolina;

  document.getElementById("resultado").innerHTML = `
    <h3>Resultado</h3>
    <ul>${detalhes}</ul>
    <p><strong>Gasolina:</strong> ${formatarReal(gastoGasolina)}</p>
    <p><strong>Total peças:</strong> ${formatarReal(totalPecas)}</p>
    <p><strong>TOTAL:</strong> ${formatarReal(total)}</p>
    <p><strong>💡 Guarde hoje para manutenção futura:</strong> ${formatarReal(totalPecas)}</p>
    <p><em>Custo por km:</em> ${formatarReal(total / km)} / km</p>
  `;
});
