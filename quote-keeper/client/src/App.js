import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [form, setForm] = useState({ text: '', author: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/quotes')
      .then(res => setQuotes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5001/api/quotes', form);
    setQuotes([...quotes, res.data]);
    setForm({ text: '', author: '' });
  };

  return (
    <div className="app-container">
      <h2 className="title">Quote Keeper</h2>

      <form onSubmit={handleSubmit} className="quote-form">
        <input
          name="text"
          placeholder="Quote"
          value={form.text}
          onChange={handleChange}
          className="input"
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="submit-btn">Add Quote</button>
      </form>

      <hr className="divider" />

      <h3 className="subheading">Submitted Quotes</h3>
      <ul className="quote-list">
        {quotes.map((q, idx) => (
          <li key={idx} className="quote-card">
            <blockquote>
              <p className="quote-text">“{q.text}”</p>
              <footer className="quote-author">- {q.author}</footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
