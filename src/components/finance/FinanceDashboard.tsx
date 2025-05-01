import { useState, useEffect } from 'react';
import { useGetDailyStockDataQuery } from '../../services/financeApi';
import { Line } from 'react-chartjs-2';
import { StockPoint, StockApiResponse } from '../../types/finance';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function FinanceDashboard() {
  const [symbol, setSymbol] = useState('AAPL');
  const { data, isFetching } = useGetDailyStockDataQuery(symbol) as {
    data: StockApiResponse | undefined;
    isFetching: boolean;
  };

  const [chartData, setChartData] = useState<StockPoint[]>([]);

  useEffect(() => {
    const daily = data?.['Time Series (Daily)'];
    if (daily) {
      const transformed: StockPoint[] = Object.entries(daily)
        .slice(0, 30)
        .reverse()
        .map(([date, values]) => ({
          date,
          close: parseFloat(values['4. close']),
        }));
      setChartData(transformed);
    }
  }, [data]);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 rounded-xl shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-300 neon-text">📈 Stock Market - {symbol}</h2>

      <div className="flex gap-4 items-center mb-6">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="border border-purple-700 bg-black/50 text-white px-4 py-2 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter stock symbol (e.g., AAPL)"
        />
      </div>

      {isFetching && <p className="text-gray-300">Loading...</p>}

      {!isFetching && chartData.length > 0 && (
        <div className="bg-black/70 p-4 rounded-lg border border-purple-700 shadow-md">
          <Line
            data={{
              labels: chartData.map((p) => p.date),
              datasets: [
                {
                  label: `${symbol} Close Price`,
                  data: chartData.map((p) => p.close),
                  borderColor: '#8B5CF6',
                  backgroundColor: 'rgba(139, 92, 246, 0.3)',
                  fill: true,
                  tension: 0.4,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  labels: { color: 'white' },
                },
              },
              scales: {
                x: {
                  ticks: { color: 'white' },
                },
                y: {
                  ticks: { color: 'white' },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
