const botao = document.getElementById("buscar");

botao.addEventListener("click", buscarClima);

async function buscarClima() { // async “Vai lá buscar… quando voltar eu continuo”
  const cidade = document.getElementById("cidade").value;

  const chave = "878fc7ac52776bece18efebcef8ef2bf";

  const url =
   
}