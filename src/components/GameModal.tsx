import { GameId } from '../utils/storage';
import { FestivalQuiz } from '../games/FestivalQuiz';
import { FindThePair } from '../games/FindThePair';
import { TangramPuzzle } from '../games/TangramPuzzle';
import { MoonPhotoHunt } from '../games/MoonPhotoHunt';

interface GameModalProps {
  gameId: GameId | null;
  onClose: () => void;
  onWin: () => void;
}

export function GameModal({ gameId, onClose, onWin }: GameModalProps) {
  if (!gameId) return null;

  const renderGame = () => {
    switch (gameId) {
      case 'quiz': return <FestivalQuiz onWin={onWin} />;
      case 'pair': return <FindThePair onWin={onWin} />;
      case 'tangram': return <TangramPuzzle onWin={onWin} />;
      case 'photo': return <MoonPhotoHunt onWin={onWin} />;
      default: return <p>Game not found.</p>;
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem'
    }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
        <button 
          onClick={onClose}
          style={{ 
            position: 'absolute', top: '-40px', right: '0px', 
            background: 'transparent', color: 'white', padding: '5px', 
            minWidth: '30px', boxShadow: 'none', border: '1px solid rgba(255,255,255,0.3)'
          }}
        >✕ Close</button>
        {renderGame()}
      </div>
    </div>
  );
}
