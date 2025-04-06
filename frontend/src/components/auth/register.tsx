"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

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
import Link from "next/link"

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
        message: "Confirm password must be at least 6 characters.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export function RegisterForm() {
    const { register, registerLoading, registerError } = useAuth();
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setServerError(null);
        const { username, password } = data;

        try {
            register({
                username,
                password,
                onSuccess: () => {
                    setTimeout(() => {
                        router.push('/login');
                    }, 100);
                }
            });
        } catch {
            setServerError('Registration failed. Please try again.');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">Create an Account</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </div>

                {registerError && (
                    <div className="bg-red-50 p-4 rounded-md text-red-500 text-sm">
                        {registerError instanceof Error
                            ? registerError.message
                            : 'Registration failed. Please try again.'}
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
                                Create a unique username
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
                                Must be at least 6 characters
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Re-enter your password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={registerLoading}>
                    {registerLoading ? 'Creating Account...' : 'Register'}
                </Button>
            </form>
        </Form>
    )
} 