import { useState } from 'react';

interface Question {
  q: string;
  options: string[];
  answer: number;
  note: string;
}

const QUESTIONS: Question[] = [
  {
    q: "Who is the Moon Goddess in Chinese mythology?",
    options: ["Guan Yin", "Nuwa", "Chang'e", "Mazu"],
    answer: 2,
    note: "Chang'e drank the elixir of immortality and floated to the moon."
  },
  {
    q: "Why are pomelos eaten during the festival?",
    options: ["They are sweet", "Their name sounds like 'blessing'", "They are round like the moon", "They keep away evil spirits"],
    answer: 1,
    note: "The Chinese word for pomelo sounds like 'to bless' or 'to protect'."
  },
  {
    q: "What do lanterns symbolize?",
    options: ["Lighting the path to prosperity", "Scaring away the Nian monster", "Guiding the spirits home", "Welcoming the harvest"],
    answer: 0,
    note: "Lanterns are lit to symbolize lighting the path to prosperity and good fortune."
  },
  {
    q: "Why is the festival on the 15th day of the 8th month?",
    options: ["It is the harvest season", "The moon is at its brightest and roundest", "It marks the middle of autumn", "All of the above"],
    answer: 3,
    note: "The 15th of the 8th lunar month coincides with the harvest, mid-autumn, and the brightest full moon."
  },
  {
    q: "What is traditionally hidden inside mooncakes?",
    options: ["Coins", "Messages", "Salted Egg Yolks", "Red Beans"],
    answer: 2,
    note: "The salted egg yolk in the center represents the full moon."
  }
];

export function FestivalQuiz({ onWin }: { onWin: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === QUESTIONS[currentIndex].answer) {
      setScore(s => s + 1);
    }
    setShowNote(true);
  };

  const handleNext = () => {
    setShowNote(false);
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const passed = score >= 5;
    return (
      <div className="glass-panel" style={{ textAlign: 'center' }}>
        <h3>Quiz Finished!</h3>
        <p>You scored {score} out of 5.</p>
        {passed ? (
          <>
            <p style={{ color: '#22c55e', fontWeight: 'bold' }}>You passed!</p>
            <button onClick={onWin}>Claim Stamp</button>
          </>
        ) : (
          <>
            <p style={{ color: '#ef4444' }}>You need 5 correct to pass.</p>
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

  const currentQ = QUESTIONS[currentIndex];

  return (
    <div className="glass-panel animate-fade-in">
      <div style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
        Question {currentIndex + 1} of 5
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
