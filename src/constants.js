export const JSONLD_HOME_PAGE = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "The most important questions",
  description:
    "This page contains the answer to the most important questions in live",
};

export const JSONLD_QUESTION_PAGE = ({ question, answer }) => ({
  "@context": "https://schema.org",
  "@type": "Question",
  name: question,
  upvoteCount: "196",
  acceptedAnswer: {
    "@type": "Answer",
    text: answer,
  },
});
