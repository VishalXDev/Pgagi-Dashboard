import { useState, useEffect } from "react";
import Image from "next/image";
import debounce from "lodash.debounce";
import { fetchCities, getCityCoords } from "../../services/weatherHelper";
import { useGetWeatherByCityQuery } from "../../services/weatherApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ForecastDay } from "../../types/weather";
import LottiePlayer from "../../components/ui/LottiePlayer";
import rainAnimation from "../../animations/rain.json.json";

type CitySuggestion = {
  city: string;
  countryCode: string;
};

export default function WeatherDashboard() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Delhi");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);

  const { data: weatherData, error: weatherError } =
    useGetWeatherByCityQuery(city);

  useEffect(() => {
    const handler = debounce(() => {
      if (query.length > 2) {
        fetchCities(query)
          .then((res: CitySuggestion[]) =>
            setSuggestions(res.map((c) => `${c.city}, ${c.countryCode}`))
          )
          .catch((error) => {
            console.error("Error fetching cities:", error);
          });
      } else {
        setSuggestions([]);
      }
    }, 500);

    handler();
    return () => handler.cancel();
  }, [query]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const { lat, lon } = await getCityCoords(city);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );
        if (!res.ok) throw new Error("Failed to fetch forecast");
        const json = await res.json();
        setForecast(json.daily.slice(0, 7));
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
    };

    fetchForecast();
  }, [city]);

  return (
    <div className="p-6 bg-black/60 backdrop-blur-md text-white rounded-xl shadow-lg">
      <input
        className="w-full p-3 border border-purple-500 rounded-lg bg-black/50 text-white placeholder-gray-400 mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city"
      />

      {suggestions.length > 0 && (
        <ul className="bg-black/70 border border-purple-500 mt-2 max-h-40 overflow-y-auto rounded shadow-lg text-white">
          {suggestions.map((s) => (
            <li
              key={s}
              className="p-2 hover:bg-purple-900 cursor-pointer"
              onClick={() => {
                setCity(s.split(",")[0]);
                setQuery("");
                setSuggestions([]);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      {weatherError && (
        <div className="mt-6 text-red-400">
          Failed to load weather data. Please check your API key or try again later.
        </div>
      )}

      {weatherData && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-purple-400 mb-2">
            Current Weather in {weatherData.name}
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-center bg-black/70 p-6 rounded-lg border border-purple-600">
            <LottiePlayer animationData={rainAnimation} className="w-36 h-36" />
            <div className="space-y-2 text-lg">
              <p>🌡 Temp: {weatherData.main.temp}°C</p>
              <p>💧 Humidity: {weatherData.main.humidity}%</p>
              <p>💨 Wind: {weatherData.wind.speed} m/s</p>
              <p>🌥 {weatherData.weather[0]?.description ?? "No description"}</p>
              {weatherData.weather[0]?.icon && (
                <Image
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                  width={80}
                  height={80}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">7-Day Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={forecast.map((d) => ({
                temp: d.temp.day,
                dt: new Date(d.dt * 1000).toLocaleDateString(),
              }))}
            >
              <XAxis dataKey="dt" stroke="#A78BFA" />
              <YAxis stroke="#A78BFA" />
              <Tooltip contentStyle={{ backgroundColor: "#1E293B", color: "#fff" }} />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
