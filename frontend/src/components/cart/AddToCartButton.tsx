'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CartItem, useCartStore } from '@/store/cartStore';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
    item: {
        id: string;
        name: string;
        price: number;
        image?: string;
    };
    // สามารถเพิ่ม props เพิ่มเติมได้ตามต้องการ
    className?: string;
}

export function AddToCartButton({ item, className }: AddToCartButtonProps) {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCartStore();

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: quantity,
            image: item.image
        };

        addItem(cartItem);

        // แสดง notification หรือ feedback ว่าเพิ่มสินค้าลงตะกร้าแล้ว
        alert(`Added ${quantity} ${item.name} to cart`);

        // รีเซ็ตจำนวนกลับเป็น 1
        setQuantity(1);
    };

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex items-center mb-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="h-8 w-8"
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="h-8 w-8"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <Button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white"
            >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
            </Button>
        </div>
    );
} 