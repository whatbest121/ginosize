"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import Link from "next/link"

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

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})

export function InputForm() {
    const { login, loginLoading, loginError } = useAuth();
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setServerError(null);
        try {
            login({
                ...data,
                onSuccess: () => {
                    setTimeout(() => {
                        router.push('/items');
                    }, 100);
                }
            });
        } catch {
            setServerError('Login failed. Please try again.');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">Login to Your Account</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Don&apos;t have an account? <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
                    </p>
                </div>

                {loginError && (
                    <div className="bg-red-50 p-4 rounded-md text-red-500 text-sm">
                        {loginError instanceof Error
                            ? loginError.message
                            : 'Authentication failed. Please try again.'}
                    </div>
                )}
                {serverError && (
                    <div className="bg-red-50 p-4 rounded-md text-red-500 text-sm">
                        {serverError}
                    </div>
                )}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormDescription>
                                Your registered username
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Your account password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={loginLoading}>
                    {loginLoading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </Form>
    )
} 