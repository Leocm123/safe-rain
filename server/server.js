const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) return res.status(400).json({ message: 'Cidade não informada' });

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json({ message: error.message || 'Erro desconhecido na API' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
