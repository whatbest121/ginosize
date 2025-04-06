'use client';

import { useCartStore, CartItem } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CartPage() {
    const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="text-center py-10">Loading...</div>;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold mb-5">Your Cart</h1>
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <Link href="/items">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-5">Your Cart</h1>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {items.map((item) => (
                                <CartRow
                                    key={item.id}
                                    item={item}
                                    updateQuantity={updateQuantity}
                                    removeItem={removeItem}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 bg-gray-50">
                    <div className="flex justify-between items-center">
                        <Button
                            variant="outline"
                            onClick={clearCart}
                            className="text-red-500 border-red-500 hover:bg-red-50"
                        >
                            Clear Cart
                        </Button>
                        <div className="text-right">
                            <div className="text-lg font-medium text-gray-900">
                                Total ({totalItems} items): ฿{totalPrice.toFixed(2)}
                            </div>
                            <Button className="mt-4 bg-green-600 hover:bg-green-700">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Component แสดงแต่ละรายการในตะกร้า
function CartRow({
    item,
    updateQuantity,
    removeItem
}: {
    item: CartItem;
    updateQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
}) {
    return (
        <tr>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    {item.image && (
                        <div className="flex-shrink-0 h-10 w-10 relative mr-3">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="40px"
                                className="object-cover rounded"
                            />
                        </div>
                    )}
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ฿{item.price.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="h-8 w-8"
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center">{item.quantity}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ฿{(item.price * item.quantity).toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </td>
        </tr>
    );
} 