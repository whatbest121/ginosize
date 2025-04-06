"use client"

import { InputForm } from "@/components/auth/login"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginPage() {
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
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <div className="space-y-4">
                    <InputForm />
                    <div className="text-center text-sm text-gray-500">
                        <p>Use your account to login</p>
                        <p>Backend API runs on port 3023</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
