import { useState } from 'react';
import TriviaForm from './components/TriviaForm';
import QuestionCard from './components/QuestionCard';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    category: '',
    difficulty: ''
  });
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState('');
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleFormSubmit = async (formData) => {
    console.log('Form submitted with:', formData);
    setFormData(formData);
    setError('');
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setQuestionData(data.results[0]);
        setIsQuestionVisible(true);
        console.log(data.results[0]);
      } else {
        setError('No questions found. Please try different options.');
        setQuestionData(null);
      }
    } catch (err) {
      setError('An error occurred while fetching the question.');
      setQuestionData(null);
    }
  };

  const handleQuestionSubmit = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer);
    setIsQuestionSubmitted(true);
  };

  const handlePlayAgain = () => {
    // Reset all necessary states to initial values
    setFormData({ firstName: '', category: '', difficulty: '' });
    setIsQuestionVisible(false);
    setIsQuestionSubmitted(false);
    setQuestionData(null);
    setSelectedAnswer('');
    setError('');
  };

  return (
    <div>
      {!isQuestionVisible ? (
        <TriviaForm onFormSubmit={handleFormSubmit} error={error} />
      ) : (
        questionData && !isQuestionSubmitted && (
          <QuestionCard
            questionData={questionData}
            onQuestionSubmit={handleQuestionSubmit}
          />
        )
      )}

      {/* Show results and Play Again button after the question is submitted */}
      {isQuestionSubmitted && (
        <div>
          <div>

            <h2>Question: {questionData.question}</h2>
            <h3>Your Answer: {selectedAnswer}</h3>

            {selectedAnswer === questionData.correct_answer ? (
              <p style={{ color: 'green' }}>✅ Correct! Nice work {formData.firstName}</p>
            ) : (
              <p style={{ color: 'red' }}>
                ❌ Incorrect. Sorry {formData.firstName} The correct answer was: <strong>{questionData.correct_answer}</strong>
              </p>
            )}
          </div>

          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
