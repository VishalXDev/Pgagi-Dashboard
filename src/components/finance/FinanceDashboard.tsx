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
    <div>
      <h2 className="text-2xl font-semibold mb-4">Stock Market - {symbol}</h2>

      <div className="flex gap-4 items-center mb-4">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="border p-2 rounded"
          placeholder="Enter stock symbol (e.g., AAPL)"
        />
      </div>

      {isFetching && <p>Loading...</p>}

      {!isFetching && chartData.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <Line
            data={{
              labels: chartData.map((p) => p.date),
              datasets: [
                {
                  label: `${symbol} Close Price`,
                  data: chartData.map((p) => p.close),
                  borderColor: '#1E3A8A',
                  backgroundColor: '#1E3A8A33',
                  fill: true,
                  tension: 0.3,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
              },
              scales: {
                x: { ticks: { maxTicksLimit: 10 } },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
