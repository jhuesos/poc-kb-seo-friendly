import React from "react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

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

function getMetaTags(questions) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return {};
  }

  console.log(questions);

  const isHome = questions.length > 1;
  const [firstQuestion] = questions;

  const title = isHome
    ? "The most important questions"
    : `The most important questions: "${firstQuestion.question}"`;

  const description = isHome
    ? "This page contains the answer to the most important questions in live"
    : `This page contains the answer to "${firstQuestion.question}"`;

  return { title, description };
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

  const { title, description } = getMetaTags(questions);

  return (
    <main>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
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
