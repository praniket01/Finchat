"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



interface Message {
  role: "user" | "assistant"; // Define possible roles
  content: string;
}

const AgentMenu = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checksession = async()=> {
      try {
        const {data} = await axios.get("api/session");
        console.log("Session data",data);

      } catch (error) {
        console.log("No session found");
        redirect("/signin");
      }
    }
    checksession();

  }, [])
  const handleQuery = async () => {
    const userMessage = { role: "user", content: query };
    setMessages((prev: any) => [...prev, userMessage]);

    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/finance-query`, {
        params: { query },
      });
      const botMessage = {
        role: "assistant",
        content: data.response.messages
          .filter((x: any) => x.role === "assistant")
          .map((x: any) => x.content)
          .join(" "),
      };

      // Add the AI response to the state
      setMessages((prev: any) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error querying agent:", error);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setQuery(""); // Clear the input field
      setLoading(false);

    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-center text-2xl font-bold mb-4">Finchat</h1>
      <div className="menu">

      </div>
      <div className="border border-gray-300 rounded-lg p-4 h-96 overflow-y-auto mb-4 bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"
              }`}
          >
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="response">

        <form
          onSubmit={handleQuery}
          className="flex gap-3 items-center"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your message..."
            className="flex-grow p-3 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={handleQuery} disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AgentMenu;