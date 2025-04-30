import Head from 'next/head';
import DashboardLayout from "../components/layout/DashboardLayout";
import NewsDashboard from "../components/news/NewsDashboard";

export default function NewsPage() {
  return (
    <DashboardLayout>
      <Head>
        <title>PGAGI | News</title>
      </Head>
      <NewsDashboard />
    </DashboardLayout>
  );
}