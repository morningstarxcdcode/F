import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="relative">
        {/* Hero section */}
        <div className="relative pt-6 pb-16 sm:pb-24">
          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Welcome to</span>
                <span className="block text-primary">ThelaConnect</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Connecting local vendors with suppliers. Streamline your inventory management and grow your business.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                {!user ? (
                  <>
                    <div className="rounded-md shadow">
                      <Link
                        href="/auth/signup"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10"
                      >
                        Get Started
                      </Link>
                    </div>
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                      <Link
                        href="/auth/signin"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                      >
                        Sign In
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="rounded-md shadow">
                    <Link
                      href="/dashboard"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10"
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Feature section */}
        <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
          <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="relative">
              <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to manage your business
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
                Everything you need to connect with suppliers, manage inventory, and grow your business.
              </p>
            </div>

            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  For Vendors
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Connect with reliable suppliers, manage your inventory, and streamline your operations.
                </p>

                <dl className="mt-10 space-y-10">
                  {[
                    {
                      name: 'Find Suppliers',
                      description: 'Connect with verified suppliers in your area.',
                    },
                    {
                      name: 'Manage Inventory',
                      description: 'Keep track of your stock in real-time.',
                    },
                    {
                      name: 'Order Management',
                      description: 'Place and track orders efficiently.',
                    },
                  ].map((feature) => (
                    <div key={feature.name} className="relative">
                      <dt>
                        <p className="text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  For Suppliers
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Expand your reach and manage your business relationships more effectively.
                </p>

                <dl className="mt-10 space-y-10">
                  {[
                    {
                      name: 'Reach More Vendors',
                      description: 'Connect with vendors looking for your products.',
                    },
                    {
                      name: 'Track Sales',
                      description: 'Monitor your sales and performance.',
                    },
                    {
                      name: 'Efficient Distribution',
                      description: 'Optimize your distribution network.',
                    },
                  ].map((feature) => (
                    <div key={feature.name} className="relative">
                      <dt>
                        <p className="text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="bg-primary">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Trusted by businesses across India
              </h2>
              <p className="mt-3 text-xl text-green-200 sm:mt-4">
                Join thousands of vendors and suppliers who are growing their business with ThelaConnect
              </p>
            </div>
            <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
              <div className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-green-200">
                  Active Vendors
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-white">
                  2,500+
                </dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-green-200">
                  Verified Suppliers
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-white">
                  800+
                </dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-green-200">
                  Orders Processed
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-white">
                  50,000+
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-primary">Join ThelaConnect today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
                >
                  Get started
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
