'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

function SignUp() {
    const router = useRouter()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignUp = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            console.log('Successfully signed up:', response)
            toast.success('Successfully signed up!')
            router.push('/login') // This will now work!
        } catch (error: any) {
            console.log("Signup Error:", error.message)
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email && user.password && user.username) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">Create Account</h2>
                {loading && <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">Processing...</h2>}
                <form onSubmit={onSignUp} className="space-y-5">
                    <div>
                        <label className="block text-green-300 mb-1" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            value={user.username}
                        />
                    </div>

                    <div>
                        <label className="block text-green-300 mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            value={user.email}
                        />
                    </div>

                    <div>
                        <label className="block text-green-300 mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            value={user.password}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition"
                        disabled={buttonDisabled}
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm text-green-300 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-green-400 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
