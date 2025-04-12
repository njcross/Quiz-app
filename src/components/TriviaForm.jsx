import { useState } from 'react';
import '../css/TriviaForm.css';
export default function TriviaForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    category: '',
    difficulty: ''
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.category || !formData.difficulty) {
      setError('All fields are required. Please complete the form.');
    } else {
      setError('');
      onFormSubmit(formData);
    }
  };

  return (
      <div className="trivia-form-container">
          <form onSubmit={handleSubmit} className="trivia-form">
              <h1>Trivia Quiz Setup</h1>
              <p>Welcome! Please fill out the form below to get your custom trivia questions.</p>
              <p className="subtitle">All fields are required before starting the quiz.</p>

              <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label htmlFor="category">Question Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">-- Select a Category --</option>
            <option value="9">General Knowledge</option>
            <option value="21">Sports</option>
            <option value="23">History</option>
            <option value="17">Science & Nature</option>
          </select>
        </div>

        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="">-- Select Difficulty --</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Start Quiz</button>
  </form>
</div>
  );
}
