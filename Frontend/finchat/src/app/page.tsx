"use client"
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
export default function Home() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
      <div className="container px-6 md:px-12 lg:px-16">
        <div className="text-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl lg:text-6xl">
              Welcome to <span className="text-blue-600">Finchat</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
              Discover insights into the stock market and make informed investment decisions with ease. Your financial partner, redefined.
            </p>
          </div>

          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Link href="/login">
              <button className="flex items-center justify-center h-12 px-8 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-lg transition duration-300">
                Sign In
                <LogIn className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <Link href="/signup">
              <button className="flex items-center justify-center h-12 px-8 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 shadow-lg transition duration-300">
                Sign Up
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
