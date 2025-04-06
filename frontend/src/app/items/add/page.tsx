'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useEffect } from "react"
import { useItems } from "@/hooks/useItems";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const ItemFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    price: z.coerce.number().min(0, {
        message: "Price must be a positive number.",
    }),
    quantity: z.coerce.number().int().min(1, {
        message: "Quantity must be at least 1.",
    }),
    image: z.string().url({
        message: "Image must be a valid URL.",
    }),
})

export default function AddItemPage() {
    const { addItem, isAddingItem, addItemError } = useItems();
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (addItemError) {
            console.error('Add item error:', addItemError);
        }
    }, [addItemError]);

    const form = useForm<z.infer<typeof ItemFormSchema>>({
        resolver: zodResolver(ItemFormSchema),
        defaultValues: {
            name: "",
            price: 0,
            quantity: 1,
            image: "https://placehold.co/400x300?text=Item+Image",
        },
    })

    function onSubmit(data: z.infer<typeof ItemFormSchema>) {
        setServerError(null);
        console.log('Submitting new item:', data);

        try {
            addItem(data, {
                onSuccess: () => {
                    console.log('Item added successfully');
                    router.push('/items');
                },
                onError: (error) => {
                    console.error('Error adding item:', error);
                    setServerError(error instanceof Error ? error.message : 'Failed to add item');
                }
            });
        } catch {
            setServerError('Failed to add item. Please try again.');
        }
    }

    return (
        <main className="container mx-auto max-w-2xl p-6">
            <h1 className="text-3xl font-bold mb-6">Add New Item</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {addItemError && (
                            <div className="bg-red-50 p-4 rounded-md text-red-500 text-sm">
                                {addItemError instanceof Error
                                    ? addItemError.message
                                    : 'Failed to add item. Please try again.'}
                            </div>
                        )}
                        {serverError && (
                            <div className="bg-red-50 p-4 rounded-md text-red-500 text-sm">
                                {serverError}
                            </div>
                        )}

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Item Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter item name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The name of your product
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Item price in dollars
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="1" step="1" placeholder="1" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Available quantity
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/image.jpg" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        URL to the item image
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/items')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isAddingItem}>
                                {isAddingItem ? 'Adding Item...' : 'Add Item'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    );
} 