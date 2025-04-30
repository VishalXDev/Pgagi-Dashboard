import Head from 'next/head';
import DashboardLayout from '../components/layout/DashboardLayout';
import DraggableDashboard from '../components/widget/DraggableDashboard';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';

interface HomeProps {
  session: Session | null;
}

const Home = ({ session }: HomeProps) => {
  return (
    <DashboardLayout>
      <Head>
        <title>PGAGI | Dashboard</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Customizable Dashboard</h1>
      <p>Welcome, {session?.user?.name || 'Guest'}!</p>
      <DraggableDashboard />
    </DashboardLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return { props: { session } };
}

export default Home;
