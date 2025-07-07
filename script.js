const pecas = {
  "Relação com retentor":      [158.00, 20000],
  "Pneu dianteiro":            [0.00,   40000],
  "Pneu traseiro":             [0.00,   20000],
  "Pastilha dianteira":       [25.00,   6000],
  "Pastilha traseira":        [25.00,   6000],
  "Vela":                     [30.00,  12000],
  "Filtro de combustível":    [0.00,  12000],
  "Filtro de ar":             [0.00,  12000],
  "Cabo de embreagem":        [0.00,  45000],
  "Cabo do acelerador":       [0.00,  45000],
  "Óleo do motor":            [45.00,   3000]
};

// Gera inputs das peças no formulário
window.onload = () => {
  const container = document.getElementById("pecasContainer");
  for (let nome in pecas) {
    let input = document.createElement("input");
    input.type = "number";
    input.step = "0.01";
    input.placeholder = `Valor em R$ (${pecas[nome][0]})`;
    input.id = nome;
    container.appendChild(
      Object.assign(document.createElement("label"), {
        className: "peca-label",
        innerText: `${nome} (durabilidade: ${pecas[nome][1]} km)`
      })
    );
    container.appendChild(input);
  }
};

document.getElementById("calcForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const km = parseFloat(document.getElementById("km").value);
  const consumo = parseFloat(document.getElementById("consumo").value);
  const precoGasolina = parseFloat(document.getElementById("gasolina").value);

  let totalPecas = 0;
  let pecasDetalhes = "";
  for (let nome in pecas) {
    const precoInputado = parseFloat(document.getElementById(nome).value);
    if (!isNaN(precoInputado) && precoInputado > 0) pecas[nome][0] = precoInputado;

    const [preco, durabilidade] = pecas[nome];
    if (preco > 0 && durabilidade > 0) {
      const custo = (preco / durabilidade) * km;
      totalPecas += custo;
      pecasDetalhes += `<li>${nome}: R$ ${custo.toFixed(2)}</li>`;
    } else {
      pecasDetalhes += `<li>${nome}: valor não informado</li>`;
    }
  }

  const litros = km / consumo;
  const gastoGasolina = litros * precoGasolina;
  const total = totalPecas + gastoGasolina;

  document.getElementById("resultado").innerHTML = `
    <h3>Resultado</h3>
    <ul>${pecasDetalhes}</ul>
    <p><strong>Gasolina:</strong> R$ ${gastoGasolina.toFixed(2)}</p>
    <p><strong>TOTAL:</strong> R$ ${total.toFixed(2)}</p>
    <p><em>Custo por km:</em> R$ ${(total / km).toFixed(2)} / km</p>
  `;
});
