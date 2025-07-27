import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-primary">ThelaConnect</span>
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <>
                  <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-primary">
                    Dashboard
                  </Link>
                  <Link href="/inventory" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-primary">
                    Inventory
                  </Link>
                  <Link href="/orders" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-primary">
                    Orders
                  </Link>
                  <Link href="/suppliers" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-primary">
                    Suppliers
                  </Link>
                  <Link href="/settings" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-primary">
                    Settings
                  </Link>
                  <div className="ml-3 relative">
                    <button
                      onClick={logout}
                      className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-primary">
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="ml-3 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/inventory"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
                  >
                    Inventory
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
                  >
                    Orders
                  </Link>
                  <Link
                    href="/suppliers"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
                  >
                    Suppliers
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; 2025 ThelaConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
