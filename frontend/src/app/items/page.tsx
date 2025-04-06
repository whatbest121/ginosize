'use client';

import { useItems } from '@/hooks/useItems';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ItemsPage() {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const { useGetItems } = useItems();
    const { data, isLoading, isError, error } = useGetItems({ page, limit });

    useEffect(() => {
        if (isError && error) {
            console.error('Items page error:', error);
        }
    }, [isError, error]);

    const handlePrevPage = () => {
        if (data?.hasPrevPage) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (data?.hasNextPage) {
            setPage(page + 1);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl font-semibold">Loading items...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-screen p-6">
                <div className="bg-red-50 p-4 rounded-md text-red-500 mb-4 max-w-lg">
                    <h2 className="text-xl font-semibold mb-2">Error loading items</h2>
                    <p className="text-sm">{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
                </div>
            </div>
        );
    }

    return (
        <main className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Items</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.docs.map((item) => (
                    <div key={item._id} className="border rounded-lg overflow-hidden shadow-md">
                        <div className="h-48 bg-gray-200 relative">
                            <Image
                                src={item.image}
                                alt={item.name}
                                className="object-cover"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/400x300?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <div className="flex justify-between mt-2">
                                <div className="text-green-600 font-medium">${item.price.toFixed(2)}</div>
                                <div className="text-gray-600">Qty: {item.quantity}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {(!data || data.docs.length === 0) && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No items found</p>
                </div>
            )}

            {data && data.docs.length > 0 && (
                <div className="flex justify-between items-center mt-8">
                    <div className="text-sm text-gray-500">
                        Showing {data.limit * (data.page - 1) + 1} - {Math.min(data.limit * data.page, data.totalDocs)} of {data.totalDocs} items
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrevPage}
                            disabled={!data.hasPrevPage}
                            className="px-4 py-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={!data.hasNextPage}
                            className="px-4 py-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
} 