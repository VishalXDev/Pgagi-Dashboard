import Head from 'next/head';
import DashboardLayout from '../components/layout/DashboardLayout';
import WeatherDashboard from '../components/weather/weatherDashboard';

export default function WeatherPage() {
  return (
    <DashboardLayout>
      <Head>
        <title>PGAGI | Weather</title>
      </Head>
      <WeatherDashboard />
    </DashboardLayout>
  );
}
