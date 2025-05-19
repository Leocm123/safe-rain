// Constantes e configurações
const API_KEY = "454e7f38f2d24562a582d4eb492942bf"; // chave da OpenWeatherMap
const RAIN_THRESHOLD_LOW = 5; // mm - Risco baixo
const RAIN_THRESHOLD_MEDIUM = 15; // mm - Risco médio
const RAIN_THRESHOLD_HIGH = 30; // mm - Risco alto

// Elementos do DOM
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const resultSection = document.getElementById("resultSection");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const alertBox = document.getElementById("alertBox");
const cityNameEl = document.getElementById("cityName");
const weatherConditionEl = document.getElementById("weatherCondition");
const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const rainAmountEl = document.getElementById("rainAmount");
const riskLevelEl = document.getElementById("riskLevel");
const alertTitleEl = document.getElementById("alertTitle");
const alertMessageEl = document.getElementById("alertMessage");
const whatsappBtn = document.getElementById("whatsappBtn");
const rainAnimation = document.getElementById("rainAnimation");

// Criação da animação de chuva
function createRaindrops(isEmergency = false) {
  rainAnimation.innerHTML = "";
  // Mais gotas de chuva no modo de emergência
  const numberOfDrops = isEmergency ? 200 : 100;

  for (let i = 0; i < numberOfDrops; i++) {
    const drop = document.createElement("div");
    drop.className = "raindrop";
    drop.style.left = `${Math.random() * 100}%`;
    // Chuva mais rápida no modo de emergência
    const speed = isEmergency
      ? 0.3 + Math.random() * 0.4
      : 0.5 + Math.random() * 0.7;
    drop.style.animationDuration = `${speed}s`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    // Gotas mais grossas no modo de emergência
    if (isEmergency) {
      drop.style.width = `${2 + Math.random() * 3}px`;
      drop.style.height = `${15 + Math.random() * 15}px`;
      drop.style.opacity = `${0.7 + Math.random() * 0.3}`;
    } else {
      drop.style.opacity = `${0.3 + Math.random() * 0.7}`;
    }
    rainAnimation.appendChild(drop);
  }
}

// Iniciar animação de chuva
createRaindrops();

// Função para buscar dados meteorológicos
async function fetchWeatherData(city) {
  showLoading();

  // Verificar se é o modo de teste
  if (city.toUpperCase() === "TESTE") {
    // Simular um pequeno atraso para dar impressão de processamento
    setTimeout(() => {
      // Criar um objeto de dados fictício para simular uma resposta da API
      const mockData = {
        name: "TESTE",
        sys: { country: "BR" },
        weather: [{ description: "tempestade severa" }],
        main: { temp: 23, humidity: 95 },
        rain: { "3h": 85.5 },
      };

      // Processar os dados de teste
      processWeatherData(mockData);
      hideLoading();
    }, 1000);
    return;
  }

  // Se não for teste, prosseguir com chamada normal à API
  try {
    // Mostrar a URL sendo usada no console (sem a chave API para segurança)
    console.log(`Buscando dados para: ${city}`);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=pt_br`;
    console.log("Fazendo requisição à API...");

    const response = await fetch(apiUrl);
    console.log("Status da resposta:", response.status);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          "Cidade não encontrada. Verifique o nome e tente novamente."
        );
      } else if (response.status === 429) {
        throw new Error(
          "Limite de requisições excedido. Tente novamente mais tarde."
        );
      } else {
        throw new Error(
          `Erro na API (código ${response.status}): ${response.statusText}`
        );
      }
    }

    const data = await response.json();
    console.log("Dados recebidos:", data);
    processWeatherData(data);
  } catch (error) {
    console.error("Erro na busca:", error);
    showError(error.message);
  } finally {
    hideLoading();
  }
}

// Função para processar os dados meteorológicos
function processWeatherData(data) {
  // Verificar se é um teste
  const isTesting = cityInput.value.trim().toUpperCase() === "TESTE";

  // Informações gerais
  if (isTesting) {
    cityNameEl.textContent = `MODO DE TESTE - Simulação de Emergência`;
  } else {
    cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  }

  // Simulação de dados para teste ou dados reais da API
  let weatherDescription, temperature, humidity, rainAmount;

  if (isTesting) {
    // Dados simulados para teste de emergência
    weatherDescription = "Tempestade severa";
    temperature = "23";
    humidity = "95";
    rainAmount = 85.5; // Valor alto para simular emergência
  } else {
    // Dados reais da API
    weatherDescription = data.weather[0].description;
    temperature = Math.round(data.main.temp);
    humidity = data.main.humidity;

    // Chuva nas últimas 3 horas (se disponível)
    rainAmount = 0;
    if (data.rain && data.rain["3h"]) {
      rainAmount = data.rain["3h"];
    } else if (data.rain && data.rain["1h"]) {
      // Se só tivermos dados de 1h, multiplicamos por 3 como estimativa
      rainAmount = data.rain["1h"] * 3;
    }
  }

  // Atualizar a interface
  weatherConditionEl.textContent =
    weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
  temperatureEl.textContent = `${temperature}°C`;
  humidityEl.textContent = `${humidity}%`;
  rainAmountEl.textContent = `${rainAmount.toFixed(1)} mm`;

  // Determinar nível de risco
  let riskLevel;
  let alertClass;
  let alertTitle;
  let alertMessage;

  if (rainAmount >= RAIN_THRESHOLD_HIGH || isTesting) {
    riskLevel = "Alto";
    alertClass = "alert-level-high";
    alertTitle = "ALERTA CRÍTICO DE ENCHENTE";
    alertMessage = isTesting
      ? "⚠ SIMULAÇÃO DE EMERGÊNCIA ⚠ Este é um teste do sistema de alerta. Em um cenário real, esta área estaria sob risco extremo de enchentes. Chuvas muito intensas foram detectadas. Procure abrigo em local seguro e alto, e siga as orientações da Defesa Civil."
      : "Chuvas muito intensas detectadas. Há alto risco de enchentes e deslizamentos. Procure abrigo em local seguro e alto, e fique atento às orientações da Defesa Civil.";
  } else if (rainAmount >= RAIN_THRESHOLD_MEDIUM) {
    riskLevel = "Médio";
    alertClass = "alert-level-medium";
    alertTitle = "Alerta de Chuvas Intensas";
    alertMessage =
      "O volume de chuva está acima do normal nas últimas horas. " +
      "Fique atento e evite áreas sujeitas a alagamentos.";
  } else if (rainAmount >= RAIN_THRESHOLD_LOW) {
    riskLevel = "Baixo";
    alertClass = "alert-level-low";
    alertTitle = "Aviso de Chuva";
    alertMessage =
      "Chuvas leves detectadas. Mantenha-se informado sobre as condições meteorológicas.";
  } else {
    riskLevel = "Sem risco";
    alertBox.style.display = "none";
    resultSection.style.display = "block";
    return; // Se não houver risco, não exibimos alerta
  }

  riskLevelEl.textContent = riskLevel;

  // Configurar e exibir alerta
  alertBox.className = `alert-box ${alertClass}`;
  alertTitleEl.textContent = alertTitle;
  alertMessageEl.textContent = alertMessage;
  alertBox.style.display = "block";

  // Configurar botão de compartilhamento do WhatsApp
  const whatsappMessage = `${alertTitle}: ${alertMessage} (Dados de ${data.name}, ${data.sys.country})`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  whatsappBtn.onclick = () => window.open(whatsappUrl, "_blank");

  // Exibir seção de resultados
  resultSection.style.display = "block";

  // Se for teste, intensificar animação de chuva
  if (isTesting) {
    createRaindrops(isTesting);
  }
}

// Funções de UI
function showLoading() {
  loading.style.display = "block";
  resultSection.style.display = "none";
  errorMessage.style.display = "none";
}

function hideLoading() {
  loading.style.display = "none";
}

function showError(message) {
  errorMessage.style.display = "block";
  document.getElementById("errorText").textContent = message;
}

// Event listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  // Verificar se é o modo de teste
  if (city.toUpperCase() === "TESTE") {
    fetchWeatherData(city);
    return;
  }

  if (city) {
    fetchWeatherData(city);
  } else {
    showError("Por favor, digite o nome de uma cidade.");
  }
});

cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

// Permitir buscar uma cidade de exemplo para demonstração
function demoCity() {
  cityInput.value = "São Paulo";
  searchBtn.click();
}

// Event listeners para o diálogo de ajuda
document.getElementById("helpBtn").addEventListener("click", () => {
  document.getElementById("helpDialog").style.display = "block";
});

document.getElementById("closeHelpBtn").addEventListener("click", () => {
  document.getElementById("helpDialog").style.display = "none";
});

// Iniciamos com um pequeno atraso para permitir que a página carregue completamente
setTimeout(() => {
  // Se quiser iniciar com uma cidade de demonstração, descomente a linha abaixo:
  // demoCity();
}, 500);
