import { useState } from "react";
import { Assistant } from "./assistants/openai.js";
import styles from "./App.module.css";
import { Chat } from "../src/components/Chat/Chat.jsx";
import { Controls } from "./components/Controls/Controls.jsx";

function App() {
  const assistant = new Assistant();
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message])
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    try {
      const result = await assistant.chat(content, messages)
      addMessage({ content: result, role: "assistant" })
    } catch (error) {
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again.",
        role: "system"
      })
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="../public/chat-bot.png" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  )
}

export default App
