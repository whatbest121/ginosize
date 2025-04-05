'use client';

import { useAuth } from "@/hooks/useAuth";
import { InputForm } from "@/components/auth/login";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center">Jenosize App</h1>

        {isAuthenticated ? (
          <div className="space-y-6">
            <div className="text-center text-green-600 font-medium">
              You are logged in!
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Link href="/items"
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-center">
                View Items
              </Link>

              <Link href="/items/add"
                className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md text-center">
                Add New Item
              </Link>

              <button
                onClick={logout}
                className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <InputForm />
            <div className="text-center text-sm text-gray-500">
              <p>Use your account to login</p>
              <p>Backend API runs on port 3023</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
