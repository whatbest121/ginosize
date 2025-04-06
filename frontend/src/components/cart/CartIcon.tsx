'use client';

import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export function CartIcon() {
    const { totalItems } = useCartStore();

    return (
        <Link href="/cart" className="relative inline-flex items-center">
            <ShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs min-w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                </Badge>
            )}
        </Link>
    );
} 