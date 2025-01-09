import os
from groq import Groq

os.environ["GROQ_API_KEY"] = "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"
# Ensure GROQ_API_KEY is set in the environment
if not os.getenv("GROQ_API_KEY"):
    raise ValueError("GROQ_API_KEY environment variable is not set.")

# Create Groq client with API key
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            # "content": "Explain the importance of fast language models",
            "content": "which is best 52 week performing stock in Bombay stock exxhange",
        }
    ],
    model="llama3-8b-8192",
)

# Print the first completion's message content
print(chat_completion.choices[0].message.content)