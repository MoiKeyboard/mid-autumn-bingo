import { useState } from 'react';

import { QUESTION_BANK, Question } from './quizData';

export function FestivalQuiz({ onWin }: { onWin: () => void }) {
  const [questions] = useState<Question[]>(() => 
    [...QUESTION_BANK].sort(() => 0.5 - Math.random()).slice(0, 3)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === questions[currentIndex].answer) {
      setScore(s => s + 1);
    }
    setShowNote(true);
  };

  const handleNext = () => {
    setShowNote(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const passed = score >= 3;
    return (
      <div className="glass-panel" style={{ textAlign: 'center' }}>
        <h3>Quiz Finished!</h3>
        <p>You scored {score} out of 3.</p>
        {passed ? (
          <>
            <p style={{ color: '#22c55e', fontWeight: 'bold' }}>You passed!</p>
            <button onClick={onWin}>Claim Stamp</button>
          </>
        ) : (
          <>
            <p style={{ color: '#ef4444' }}>You need 3 correct to pass.</p>
            <button onClick={() => {
              setCurrentIndex(0);
              setScore(0);
              setIsFinished(false);
            }}>Try Again</button>
          </>
        )}
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="glass-panel animate-fade-in">
      <div style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
        Question {currentIndex + 1} of 3
      </div>
      <h3 style={{ marginBottom: '1.5rem' }}>{currentQ.q}</h3>
      
      {!showNote ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentQ.options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handleAnswer(i)} 
              style={{ 
                textAlign: 'left', 
                background: 'rgba(30,41,59,0.6)', 
                boxShadow: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '1rem',
                color: 'var(--color-text)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
                e.currentTarget.style.borderColor = 'var(--color-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(30,41,59,0.6)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className="animate-fade-in">
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--color-accent)' }}>Did you know?</span><br/>
            {currentQ.note}
          </p>
          <button onClick={handleNext} style={{ width: '100%' }}>Next</button>
        </div>
      )}
    </div>
  );
}
