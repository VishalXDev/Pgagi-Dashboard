import { getProviders, signIn } from 'next-auth/react';
import type { GetServerSideProps } from 'next';
import type { ClientSafeProvider } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return { props: { providers: providers ?? {} } };
};

interface SignInProps {
  providers: Record<string, ClientSafeProvider>;
}

export default function SignIn({ providers }: SignInProps) {
  const providerList = Object.values(providers ?? {});

  if (providerList.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">No authentication providers configured.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4">Sign in</h1>
      {providerList.map((provider) => (
        <button
          key={provider.name}
          onClick={() =>
            signIn(provider.id, {
              callbackUrl: '/',
            })
          }
          className="px-6 py-2 mb-3 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Sign in with {provider.name}
        </button>
      ))}
    </div>
  );
}
