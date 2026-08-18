import { useState, useEffect } from 'react';

const ICONS = ["🏮", "🐇", "🥮", "🌕", "🍃", "☕", "🍵", "⭐"];

export function FindThePair({ onWin }: { onWin: () => void }) {
  const [cards, setCards] = useState<{ icon: string; isFlipped: boolean; isMatched: boolean }[]>(() => {
    const deck = [...ICONS, ...ICONS].sort(() => Math.random() - 0.5);
    return deck.map(icon => ({ icon, isFlipped: false, isMatched: false }));
  });
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      if (cards[first].icon === cards[second].icon) {
        setCards(prev => prev.map((c, i) => i === first || i === second ? { ...c, isMatched: true } : c));
        setMatches(m => m + 1);
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => i === first || i === second ? { ...c, isFlipped: false } : c));
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [flippedIndices, cards]);

  if (matches === ICONS.length) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center' }}>
        <h3>All Pairs Found!</h3>
        <p>Great memory.</p>
        <button onClick={onWin}>Claim Stamp</button>
      </div>
    );
  }

  return (
    <div className="glass-panel animate-fade-in" style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '1rem' }}>Find the Pair</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        maxWidth: '300px',
        margin: '0 auto'
      }}>
        {cards.map((card, i) => (
          <div 
            key={i}
            onClick={() => {
              if (flippedIndices.length < 2 && !card.isFlipped && !card.isMatched) {
                setCards(prev => prev.map((c, idx) => idx === i ? { ...c, isFlipped: true } : c));
                setFlippedIndices(prev => [...prev, i]);
              }
            }}
            style={{
              aspectRatio: '1',
              background: card.isFlipped || card.isMatched ? 'var(--color-primary)' : 'var(--color-accent)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              cursor: card.isMatched ? 'default' : 'pointer',
              transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0)',
              transition: 'transform 0.3s, background 0.3s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            <span style={{ 
              opacity: card.isFlipped || card.isMatched ? 1 : 0, 
              transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'none' 
            }}>
              {card.icon}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
