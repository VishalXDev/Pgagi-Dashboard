import { getProviders, signIn } from 'next-auth/react';
import type { GetServerSideProps } from 'next';
import type { ClientSafeProvider } from 'next-auth/react';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return { props: { providers: providers ?? {} } };
};

interface SignInProps {
  providers: Record<string, ClientSafeProvider>;
}

export default function SignIn({ providers }: SignInProps) {
  const providerList = Object.values(providers ?? {});

  return (
    <>
      <Head>
        <title>Sign In - PGAGI Dashboard</title>
      </Head>

      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: `url('/bg-signin.jpg')`, 
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-xl shadow-xl text-white max-w-sm w-full text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome to PGAGI</h1>

          {providerList.length === 0 ? (
            <p className="text-lg">No authentication providers configured.</p>
          ) : (
            providerList.map((provider) => (
              <button
                key={provider.name}
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: '/',
                  })
                }
                className="w-full bg-purple-600 hover:bg-purple-800 transition text-white py-2 px-4 rounded mb-3 shadow-lg"
              >
                🔐 Sign in with {provider.name}
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}
