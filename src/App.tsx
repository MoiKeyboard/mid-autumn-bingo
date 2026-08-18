import { useState, useEffect } from 'react';
import { BingoCard } from './pages/BingoCard';
import './index.css';

interface User {
  name: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('bingo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      const newUser = { name: nameInput.trim() };
      setUser(newUser);
      localStorage.setItem('bingo_user', JSON.stringify(newUser));
    }
  };

  if (!user) {
    return (
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '400px', width: '100%', marginTop: '10vh' }}>
        <h1 style={{ textAlign: 'center' }}>Mid-Autumn Festival</h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Welcome! Please register to get your digital bingo card.
        </p>
        <form onSubmit={handleRegister}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Name</label>
            <input 
              type="text" 
              value={nameInput} 
              onChange={(e) => setNameInput(e.target.value)} 
              placeholder="Enter your name"
              required 
            />
          </div>
          <button type="submit" style={{ width: '100%', marginTop: '1rem' }} className="glow-pulse">
            Start Playing
          </button>
        </form>
      </div>
    );
  }

  return <BingoCard user={user} onReset={() => {
    localStorage.removeItem('bingo_user');
    localStorage.removeItem('bingo_state_2026'); // Clear the bingo tiles state
    setUser(null);
  }} />;
}

export default App;
