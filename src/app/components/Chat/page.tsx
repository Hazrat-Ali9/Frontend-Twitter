import React, { useState } from "react";

interface Message {
  text: string;
  sender: "sender" | "receiver";
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello!", sender: "receiver" },
    { text: "Hi there!", sender: "sender" },
    { text: "How are you?", sender: "receiver" },
    { text: "I'm good, thanks!", sender: "sender" },
  ]);

  const [input, setInput] = useState<string>("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "sender" }]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-[500px] max-w-lg border border-gray-300 rounded-lg overflow-hidden">
      <header className="p-4 bg-gray-800 text-white text-center">
        <h1>Hazrat Ali</h1>
      </header>
      <div className="flex-1 p-4 overflow-y-auto flex flex-col bg-gray-700">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-xs p-3 my-2 rounded-lg break-words text-black ${
              message.sender === "sender"
                ? "self-end bg-gray-100"
                : "self-start bg-gray-100"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t border-gray-300 bg-gray-700">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-3 border border-gray-300 rounded-lg mr-2 text-black"
        />
        <button
          onClick={handleSendMessage}
          className="p-3 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
