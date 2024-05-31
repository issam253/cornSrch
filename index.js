const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/xn', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'مالذي تريد البحث عنه امممم.' });
    }

    const url = `https://tools.betabotz.eu.org/tools/xnxxsearch?q=${encodeURIComponent(query)}`;
    const response = await axios.get(url);

    console.log(response.data); 
    const links = response.data?.result || []; 

    res.json({ links });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
