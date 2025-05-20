# 🌧️ SAFERAIN - Sistema de Alerta de Enchentes

Projeto acadêmico desenvolvido como parte do Desafio Profissional da Universidade Cesumar (UNICESUMAR), com foco na aplicação prática de tecnologias web para resolver problemas sociais reais — neste caso, alertas de enchentes e chuvas intensas.

---

## 📌 Resumo

O SAFERAIN é um sistema web interativo que permite consultar **dados meteorológicos em tempo real**, com foco na **prevenção de enchentes** e **disseminação de alertas climáticos**. Ele oferece uma interface simples e informativa, ideal para usuários finais e gestores públicos locais. Também serve como ferramenta didática para estudar o consumo de APIs e o desenvolvimento full stack com boas práticas de segurança.

---

## 🎯 Objetivo

Desenvolver uma aplicação capaz de alertar sobre riscos climáticos, **informando a população sobre chuvas intensas**, seu volume recente e os **níveis de risco de enchente** associados. O sistema também permite o **compartilhamento imediato de alertas via WhatsApp**, promovendo a comunicação entre comunidades e facilitando decisões preventivas em tempo hábil.

---

## 🧩 Funcionalidades

- 🔎 Busca por cidade (ex: `São Paulo`, `Curitiba,BR`)
- ☁️ Condição climática e temperatura atual
- 💧 Volume de chuva das últimas 3 horas
- 📊 Cálculo automático do nível de risco: `Sem risco`, `Baixo`, `Médio`, `Alto`
- 📢 Exibição de alertas com cores e textos personalizados
- 🌧️ Animação de chuva com intensidade dinâmica
- 📱 Compartilhamento do alerta via WhatsApp
- 🧪 **Modo de teste** para simular emergências

---

## ⚙️ Tecnologias Utilizadas

- Frontend: `HTML5`, `CSS3`, `JavaScript`
- Backend: `Node.js`, `Express`, `Axios`
- API: [OpenWeatherMap](https://openweathermap.org/)
- Hospedagem de código: `GitHub`
- Controle de variáveis sensíveis: `.env`


---

## ⚙️ Como Rodar o Projeto

### 🔁 Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- Editor como [VS Code](https://code.visualstudio.com/)
- Extensão **Live Server** (ou qualquer servidor local para frontend)

---

### 📁 Estrutura do Projeto

saferain_project/

├── client/ ← Código do site (HTML/CSS/JS)

├── server/ ← Backend Node.js para proteger a API key

├── .gitignore

├── package.json


---

### 1. Backend (API Proxy)

1. Acesse a pasta do projeto no terminal:

`bash

cd saferain_project

2. Instale as dependências do servidor:

`bash

npm install

3. Crie um arquivo .env dentro da pasta server/ com o seguinte conteúdo:

OPENWEATHER_API_KEY=SUA_CHAVE_DA_API_AQUI

4. Inicie o servidor backend:

`bash

node server/server.js

O servidor ficará disponível em: http://localhost:3000
