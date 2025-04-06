'use client';

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { CartIcon } from "@/components/cart/CartIcon";

export function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-gray-900">Jenosize</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/items"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 ${pathname === '/items' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                                Items
                            </Link>
                            <Link href="/items/add"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 ${pathname === '/items/add' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                                Add Item
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:space-x-4">
                        <CartIcon />
                        <Button
                            onClick={logout}
                            className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                            Logout
                        </Button>
                    </div>

                    <div className="flex items-center sm:hidden">
                        <div className="flex items-center space-x-2">
                            <CartIcon />
                            <Button
                                onClick={logout}
                                className="p-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                    <Link href="/items"
                        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive('/items')}`}>
                        Items
                    </Link>
                    <Link href="/items/add"
                        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive('/items/add')}`}>
                        Add Item
                    </Link>
                </div>
            </div>
        </nav>
    );
} 