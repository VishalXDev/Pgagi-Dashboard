import { useState, useEffect } from 'react';
import { fetchCities, getCityCoords } from '../../services/weatherHelper';
import { useGetWeatherByCityQuery } from '../../services/weatherApi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ForecastDay } from '../../types/weather';
import LottiePlayer from '../../components/ui/LottiePlayer';
import rainAnimation from '../../../public/animations/rain.json.json'; // ✅ moved from /public to /src/animations

type CitySuggestion = {
  city: string;
  countryCode: string;
};

export default function WeatherDashboard() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('Delhi');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);

  const { data: weatherData, error: weatherError } = useGetWeatherByCityQuery(city);

  useEffect(() => {
    if (query.length > 2) {
      fetchCities(query)
        .then((res: CitySuggestion[]) =>
          setSuggestions(res.map((c) => `${c.city}, ${c.countryCode}`))
        )
        .catch((error) => {
          console.error('Error fetching cities:', error);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const { lat, lon } = await getCityCoords(city);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );
        if (!res.ok) throw new Error('Failed to fetch forecast');
        const json = await res.json();
        setForecast(json.daily.slice(0, 7));
      } catch (error) {
        console.error('Error fetching forecast:', error);
      }
    };

    fetchForecast();
  }, [city]);

  return (
    <div>
      <input
        className="w-full p-2 border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city"
      />

      {suggestions.length > 0 && (
        <ul className="bg-white border mt-2 max-h-40 overflow-y-auto rounded shadow">
          {suggestions.map((s) => (
            <li
              key={s}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setCity(s.split(',')[0]);
                setQuery('');
                setSuggestions([]);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      {weatherError && (
        <div className="mt-6 text-red-500">Failed to load weather data</div>
      )}

      {weatherData && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Current Weather in {weatherData.name}
          </h2>
          <div className="flex gap-6 items-center">
            <LottiePlayer animationData={rainAnimation} className="w-36 h-36" />
            <div>
              <p>Temp: {weatherData.main.temp}°C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind: {weatherData.wind.speed} m/s</p>
              <p>
                {weatherData.weather[0]?.description ?? 'No description available'}
              </p>
              {weatherData.weather[0]?.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">7-Day Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={forecast.map((d) => ({
                temp: d.temp.day,
                dt: new Date(d.dt * 1000).toLocaleDateString(),
              }))}
            >
              <XAxis dataKey="dt" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#1E3A8A"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
