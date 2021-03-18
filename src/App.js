import React from "react";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getMessage() {
      const res = await fetch("/api/hello");
      const message = await res.text();
      setMessage(message);
    }
    getMessage();
  }, []);
  return (
    <main>
      <h1>My App</h1>
      <p>{message}</p>
    </main>
  );
}

export default App;
