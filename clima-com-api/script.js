const API_KEY = "878fc7ac52776bece18efebcef8ef2bf";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Elementos do DOM
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const weatherCard = document.getElementById("weatherCard");
const errorCard = document.getElementById("errorCard");

// Elementos de dados
const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const visibility = document.getElementById("visibility");

// Esconde todos os cards de resultado
function hideResults() {
  weatherCard.classList.add("hidden");
  errorCard.classList.add("hidden");
  loading.classList.add("hidden");
}

// Mostra os dados do clima no card
function showWeather(data) {
  cityName.textContent = data.name;
  countryName.textContent = data.sys.country;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`; // Ícone do clima
  weatherIcon.alt = data.weather[0].description;
  temperature.textContent = `${Math.round(data.main.temp)}°`;   // Math.round() aredonda o valor da temp
  description.textContent = data.weather[0].description
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
  visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
  loading.classList.add("hidden");
  weatherCard.classList.remove("hidden");
}

// Mostra o card de erro
function showError() {
  loading.classList.add("hidden");
  errorCard.classList.remove("hidden");
}

// Busca o clima pela cidade
async function fetchWeather(city) {
  hideResults();
  loading.classList.remove("hidden");
  searchBtn.disabled = true;
  try {
    const response = await fetch(                                                           //  O fetch retorna um objeto Response
      `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`  //  Ela é: true → se o status HTTP estiver entre 200 e 299 
    );                                                                                      //  False → se for 400, 404, 500, etc.
    if (!response.ok) { // “Se NÃO for sucesso…”      // response.ok trata erro HTTP.
      showError();
      return;
    }
    const data = await response.json();
    showWeather(data);
  } catch (err) {     // Mostra o erro no DevTools      // catch trata erro de execução.
    console.error("Erro ao buscar clima:", err);
    showError();
  } finally {
    searchBtn.disabled = false; // Habilita o botão de busca novamente, independentemente do resultado
  }
}

// Event listener do formulário
searchForm.addEventListener("submit", (e) => { // “Quando o formulário for enviado, execute essa função.”
  e.preventDefault(); // Evita que a página seja recarregada ao enviar o formulário
  const city = cityInput.value.trim(); // trim() Remove espaços extras:
  if (city) { // “Se o campo de cidade não estiver vazio ou com algum problema na escrita, execute a busca.”
    fetchWeather(city);         // Se passou na validação:
                                // Chama sua função
                                // Executa a requisição
                                // Mostra o clima
  }
});


