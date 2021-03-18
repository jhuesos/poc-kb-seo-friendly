import React from "react";
import { useEffect, useState } from "react";

async function getQuestions(updater) {
  const res = await fetch("/api/questions");
  const { questions } = await res.json();
  updater(questions);
}

async function getQuestion(updater, id) {
  const res = await fetch(`/api/question/${id}`);
  const question = await res.json();
  updater([question]);
}

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const query = /\/question\/(?<id>\d)/.exec(document.location.pathname);

    if (query === null) {
      getQuestions(setQuestions);
    } else {
      const id = query.groups.id;
      getQuestion(setQuestions, id);
    }
  }, []);

  return (
    <main>
      <h1>Most important questions in life</h1>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <h2>
              <a href={`/question/${q.id}`}>{q.question}</a>
            </h2>
            <p>{q.answer}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
