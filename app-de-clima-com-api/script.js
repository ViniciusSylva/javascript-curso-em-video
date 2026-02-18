const botao = document.getElementById("buscar");

botao.addEventListener("click", buscarClima);

async function buscarClima() { // async “Vai lá buscar… quando voltar eu continuo”
  const cidade = document.getElementById("cidade").value;

  const chave = "878fc7ac52776bece18efebcef8ef2bf";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`;
   
  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.cod === "404") {
      alert("Cidade não encontrada");
      return;
    }

    document.getElementById("nomeCidade").innerText = dados.name;
    document.getElementById("temperatura").innerText = `🌡️ ${dados.main.temp} °C`;
    document.getElementById("descricao").innerText = dados.weather[0].description;

    localStorage.setItem("ultimaCidade", cidade);

  } catch (error) {
    alert("Erro ao buscar o clima. Tente novamente.");
    console.error(error);
  }
}

window.onload = () => {
  const ultimaCidade = localStorage.getItem("ultimaCidade");
  if (ultimaCidade) {
    document.getElementById("cidade").value = ultimaCidade;
  }
};