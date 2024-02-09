const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.get('/kshitiz', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required.' });
    }

    const options = {
      method: 'POST',
      url: 'https://all-media-downloader1.p.rapidapi.com/xnxx_search',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
        'X-RapidAPI-Host': 'all-media-downloader1.p.rapidapi.com'
      },
      data: { queryXNXX: query }
    };

    const response = await axios.request(options);
    console.log(response.data); 
    const links = response.data?.result?.map(item => item.link) || []; 

    res.json({ links });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
