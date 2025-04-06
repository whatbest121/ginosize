"use client"

import { RegisterForm } from "@/components/auth/register"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RegisterPage() {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/items')
        }
    }, [isAuthenticated, router])

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
                <div className="space-y-4">
                    <RegisterForm />
                    <div className="text-center text-sm text-gray-500">
                        <p>Create an account to access the application</p>
                        <p>Backend API runs on port 3023</p>
                    </div>
                </div>
            </div>
        </main>
    )
} 