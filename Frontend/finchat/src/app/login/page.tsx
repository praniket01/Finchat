'use client'
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface LoginProps{
  csrfToken?: string;
}

const Login = (props : LoginProps) => {

  const [error, showError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

  
    if (res && !res.error) {
      redirect("/Menu");
    }
    else{
      console.log("error",res);
      showError("Your Password or Email is wrong")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login to Your Account
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login;