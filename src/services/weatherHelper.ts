import axios from 'axios';

const GEODB_API_KEY = process.env.NEXT_PUBLIC_GEODB_API_KEY;
const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

interface GeoCity {
  city: string;
  countryCode: string;
  latitude: number;
  longitude: number;
}

export const fetchCities = async (query: string): Promise<GeoCity[]> => {
  const response = await axios.get(GEO_API_URL, {
    headers: {
      'X-RapidAPI-Key': GEODB_API_KEY!,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
    params: {
      namePrefix: query,
      limit: 5,
      sort: '-population',
    },
  });

  return response.data.data;
};

export const getCityCoords = async (cityName: string): Promise<{ lat: number; lon: number }> => {
  const cities = await fetchCities(cityName);
  const city = cities[0];

  if (!city) {
    throw new Error(`City not found: ${cityName}`);
  }

  return {
    lat: city.latitude,
    lon: city.longitude,
  };
};
