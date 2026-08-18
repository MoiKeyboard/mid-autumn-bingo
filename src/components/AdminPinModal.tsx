import { useState } from 'react';

interface AdminPinModalProps {
  gameName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_PIN = "2026"; // Hardcoded for local offline games

export function AdminPinModal({ gameName, isOpen, onClose, onSuccess }: AdminPinModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setPin('');
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '300px', width: '100%', position: 'relative' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', color: 'white', padding: '5px', minWidth: '30px', boxShadow: 'none' }}
        >✕</button>
        <h3 style={{ textAlign: 'center', marginTop: '10px' }}>Admin Stamp</h3>
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Verify completion for {gameName}
        </p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="password" 
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter Admin PIN"
            autoFocus
            style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.2rem' }}
          />
          {error && <p style={{ color: '#ef4444', textAlign: 'center', margin: '0 0 10px 0', fontSize: '0.9rem' }}>Incorrect PIN</p>}
          <button type="submit" style={{ width: '100%' }}>Stamp Square</button>
        </form>
      </div>
    </div>
  );
}
