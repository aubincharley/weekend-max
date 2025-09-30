import axios from 'axios';
import fs from 'fs';

async function extractCities() {
  const citiesSet = new Set(); // Utilise un Set pour éviter les doublons
  let offset = 0;
  const limit = 100;
  let totalFetched = 0;

  try {
    while (offset < 9000) { // Limite arbitraire pour éviter une boucle infinie
      const url = `https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/tgvmax/records?limit=${limit}&offset=${offset}`;
      const response = await axios.get(url);

      const records = response.data.results;
      if (!records.length) break; // Stop si plus de résultats

      records.forEach(record => {
        const city = record.destination;
        if (city) {
          citiesSet.add(city.trim());
        }
      });

      totalFetched += records.length;
      console.log(`Fetched ${records.length} records... (Total: ${totalFetched})`);

      offset += limit;
    }

    const cities = Array.from(citiesSet).sort();
    fs.writeFileSync('cities.json', JSON.stringify(cities, null, 2));
    console.log(`✅ ${cities.length} unique cities saved to cities.json`);

  } catch (error) {
    console.error('❌ Error fetching cities:', error);
  }
}

extractCities();
