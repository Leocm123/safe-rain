# 🌧️ SAFERAIN - Sistema de Alerta de Enchentes

O SAFERAIN é um sistema web que permite consultar **informações meteorológicas** e detectar **níveis de risco de enchentes** com base nos dados da API da OpenWeatherMap.

Foi desenvolvido como parte de um projeto acadêmico para simular um sistema de alerta que informa **condições climáticas, volume de chuvas recentes e níveis de risco**, com **alertas visuais e integração com o WhatsApp** para compartilhamento.

---

## 📦 Tecnologias Utilizadas

- HTML5, CSS3 e JavaScript
- Node.js + Express (backend)
- API da [OpenWeatherMap](https://openweathermap.org/)
- Git + GitHub

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

ini
OPENWEATHER_API_KEY=SUA_CHAVE_DA_API_AQUI

4. Inicie o servidor backend:

`bash
node server/server.js

O servidor ficará disponível em: http://localhost:3000
