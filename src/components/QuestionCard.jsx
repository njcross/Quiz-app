import { useState, useEffect } from 'react';
import '../css/QuestionCard.css';

export default function QuestionCard({ questionData, onQuestionSubmit }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    // Shuffle answers only once when questionData is set
    if (questionData) {
      const { correct_answer, incorrect_answers } = questionData;
      const allAnswers = [...incorrect_answers, correct_answer];
      setShuffledAnswers(allAnswers.sort(() => Math.random() - 0.5)); // Shuffle answers
    }
  }, [questionData]); // This will run when questionData is updated

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAnswer) {
      setError('Please select an answer before submitting.');
      return;
    }

    setSubmitted(true);
    setError('');
    onQuestionSubmit(selectedAnswer); // Passing selected answer to parent
  };

  if (!questionData) return null;

  const { question, correct_answer } = questionData;

  return (
    <div className="question-card">
      <h2 dangerouslySetInnerHTML={{ __html: question }} />

      {!submitted && (
        <form onSubmit={handleSubmit}>
          {shuffledAnswers.map((answer, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={() => setSelectedAnswer(answer)} // Update selectedAnswer on change
                />
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </label>
            </div>
          ))}
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Submit Answer</button>
        </form>
      )}

      {submitted && (
        <div className="result">
          {selectedAnswer === correct_answer ? (
            <p style={{ color: 'green' }}>✅ Correct!</p>
          ) : (
            <p style={{ color: 'red' }}>
              ❌ Incorrect. The correct answer was: <strong dangerouslySetInnerHTML={{ __html: correct_answer }} />
            </p>
          )}
        </div>
      )}
    </div>
  );
}
