import { useState, useEffect } from 'react';
import { GameId, getBingoState, markGameComplete, checkWinCondition } from '../utils/storage';
import { AdminPinModal } from '../components/AdminPinModal';
import { GameModal } from '../components/GameModal';

// Game Definitions
const GAMES: Record<GameId, { name: string; type: 'online' | 'offline'; color: string }> = {
  // Online
  tangram: { name: 'Tangram Puzzle', type: 'online', color: '#1e3a8a' }, // Deep Blue
  quiz: { name: 'Festival Quiz', type: 'online', color: '#1e3a8a' },
  pair: { name: 'Find the Pair', type: 'online', color: '#1e3a8a' },
  photo: { name: 'Moon Photo Hunt', type: 'online', color: '#1e3a8a' },
  // Offline
  riddles: { name: 'Lantern Riddles', type: 'offline', color: '#854d0e' }, // Gold/Brown
  dice: { name: 'Mooncake Dice', type: 'offline', color: '#854d0e' },
  pitching: { name: 'Pot Pitching', type: 'offline', color: '#854d0e' },
  chopsticks: { name: 'Chopstick Transfer', type: 'offline', color: '#854d0e' },
  shuttlecock: { name: 'Shuttlecock Kick', type: 'offline', color: '#854d0e' },
};

// According to PDF: Offline games form a gold cross through the middle row and column.
// Online games sit on the 4 corners.
// Fixed grid layout to enforce this balance.
const FIXED_GRID: GameId[][] = [
  ['tangram', 'riddles', 'quiz'],
  ['dice', 'pitching', 'chopsticks'],
  ['pair', 'shuttlecock', 'photo']
];

export function BingoCard({ user, onReset }: { user: any, onReset: () => void }) {
  const [completed, setCompleted] = useState<GameId[]>([]);
  const [activeOfflineGame, setActiveOfflineGame] = useState<GameId | null>(null);
  const [activeOnlineGame, setActiveOnlineGame] = useState<GameId | null>(null);
  const [hasWon, setHasWon] = useState(false);

  // Load state on mount
  useEffect(() => {
    const state = getBingoState();
    setCompleted(state.completedGames);
  }, []);

  // Check win condition whenever completed changes
  useEffect(() => {
    if (checkWinCondition(completed, FIXED_GRID)) {
      setHasWon(true);
    }
  }, [completed]);

  const handleTileClick = (gameId: GameId) => {
    if (completed.includes(gameId)) return; // Already done

    const game = GAMES[gameId];
    if (game.type === 'offline') {
      setActiveOfflineGame(gameId);
    } else {
      setActiveOnlineGame(gameId);
    }
  };

  const handleGameSuccess = (gameId: GameId) => {
    markGameComplete(gameId);
    setCompleted(prev => [...prev, gameId]);
    setActiveOfflineGame(null);
  };

  return (
    <div className="animate-fade-in" style={{ width: '100%', maxWidth: '800px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Digital Bingo Card</h2>
          <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{user.name}</p>
        </div>
        <button 
          onClick={onReset}
          style={{ background: 'transparent', border: '1px solid var(--color-text-muted)', color: 'var(--color-text-muted)', boxShadow: 'none' }}
        >
          Reset
        </button>
      </header>

      {hasWon && (
        <div className="glass-panel animate-fade-in glow-pulse" style={{ marginBottom: '2rem', textAlign: 'center', border: '1px solid var(--color-accent)' }}>
          <h2 style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>BINGO!</h2>
          <p style={{ margin: 0 }}>Congratulations! Show this screen to claim your prize.</p>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        aspectRatio: '1/1',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        {FIXED_GRID.map((row) => 
          row.map((gameId) => {
            const game = GAMES[gameId];
            const isDone = completed.includes(gameId);
            
            return (
              <div 
                key={gameId}
                onClick={() => handleTileClick(gameId)}
                style={{
                  background: isDone ? 'rgba(212, 175, 55, 0.2)' : game.color,
                  border: isDone ? '2px solid var(--color-accent)' : '2px solid transparent',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '10px',
                  cursor: isDone ? 'default' : 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <span style={{ 
                  fontWeight: 600, 
                  fontSize: '1.1rem',
                  opacity: isDone ? 0.5 : 1,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                  {game.name}
                </span>
                
                {isDone && (
                  <div className="animate-fade-in" style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.4)'
                  }}>
                    <span style={{
                      color: 'var(--color-accent)',
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      transform: 'rotate(-15deg)',
                      textShadow: '0 0 10px rgba(0,0,0,0.8)'
                    }}>
                      ✔
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
        Complete any row, column, or diagonal to win.
      </p>

      {/* Admin PIN Modal for Offline Games */}
      <AdminPinModal 
        isOpen={activeOfflineGame !== null}
        gameName={activeOfflineGame ? GAMES[activeOfflineGame].name : ''}
        onClose={() => setActiveOfflineGame(null)}
        onSuccess={() => {
          if (activeOfflineGame) handleGameSuccess(activeOfflineGame);
        }}
      />

      {/* Game Modal for Online Games */}
      <GameModal 
        gameId={activeOnlineGame}
        onClose={() => setActiveOnlineGame(null)}
        onWin={() => {
          if (activeOnlineGame) handleGameSuccess(activeOnlineGame);
          setActiveOnlineGame(null);
        }}
      />
    </div>
  );
}
