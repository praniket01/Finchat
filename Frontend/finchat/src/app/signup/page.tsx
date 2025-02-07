"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { toast } from "react-toastify";

const prisma = new PrismaClient();

const Signup = () => {
  const router = useRouter();

 const [name,setName] = useState("");
 const [password,setPassword] = useState("");
 const [email,setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signup", {
        name,
        email,
        password
      });
      if (response.status === 201) {
        setSuccess(true);
        toast("User Created Successfull Please Sign in")
        router.push("/"); // Redirect to Menu page after successful signup
        
      }
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Your Account
        </h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Signup
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mt-4 text-center">Signup successful!</p>
        )}
        <button
          onClick={() => router.back()}
          className="mt-6 flex items-center justify-center text-gray-700 hover:text-gray-900 transition duration-300"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </button>
      </div>
    </div>
  );
};

export default Signup;
