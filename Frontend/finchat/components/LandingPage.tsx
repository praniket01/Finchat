"use client";
import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LandingPage= () => {
const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Finchat</h1>
        <p className="text-gray-600 mb-6">
          Your Financial assistant to help you manage and grow your finances effortlessly.
        </p>
        <div className="flex flex-col space-y-4">
          <Link href={"./components/Signup"}>
                 Sign Up
          </Link>
          <button
            onClick={()=> {router.push("/api/auth/signin")}}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
