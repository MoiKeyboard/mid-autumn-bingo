import { useState, useRef, useEffect } from 'react';

const PUZZLE_BANK = [
  [ // Lantern
    { id: 1, name: 'Loop', color: '#ef9f5dff', targetX: 90, targetY: 0, style: { width: '20px', height: '20px', borderRadius: '50%' } },
    { id: 2, name: 'Top Cap', color: '#ef4444', targetX: 50, targetY: 20, style: { width: '100px', height: '30px', clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)' } },
    { id: 3, name: 'Upper Body', color: '#ef4444', targetX: 30, targetY: 50, style: { width: '140px', height: '60px', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)' } },
    { id: 4, name: 'Lower Body', color: '#ef4444', targetX: 30, targetY: 98, style: { width: '140px', height: '60px', clipPath: 'polygon(0 0, 100% 20%, 80% 100%, 20% 100%)' } },
    { id: 5, name: 'String', color: '#eab308', targetX: 96, targetY: 158, style: { width: '8px', height: '30px' } },
    { id: 6, name: 'Knot', color: '#eab308', targetX: 85, targetY: 188, style: { width: '30px', height: '30px', clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' } },
    { id: 7, name: 'Fringe', color: '#ef4444', targetX: 70, targetY: 218, style: { width: '60px', height: '40px', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' } },
  ],
  [ // Teacup
    { id: 1, name: 'Cup Body', color: '#ef9f5dff', targetX: 50, targetY: 100, style: { width: '100px', height: '60px', borderRadius: '0 0 50px 50px' } },
    { id: 2, name: 'Handle', color: '#ef9f5dff', targetX: 130, targetY: 110, style: { width: '30px', height: '30px', borderRadius: '50%', border: '5px solid #ef9f5dff', background: 'transparent' } },
    { id: 3, name: 'Base', color: '#ef4444', targetX: 70, targetY: 160, style: { width: '60px', height: '15px', borderRadius: '5px' } },
    { id: 4, name: 'Steam 1', color: '#eab308', targetX: 80, targetY: 60, style: { width: '10px', height: '30px', borderRadius: '50%', opacity: 0.5 } },
    { id: 5, name: 'Steam 2', color: '#eab308', targetX: 110, targetY: 50, style: { width: '10px', height: '40px', borderRadius: '50%', opacity: 0.5 } }
  ],
  [ // Moon & Cloud
    { id: 1, name: 'Moon', color: '#fef08a', targetX: 60, targetY: 50, style: { width: '80px', height: '80px', borderRadius: '50%' } },
    { id: 2, name: 'Cloud Base', color: '#e2e8f0', targetX: 30, targetY: 100, style: { width: '120px', height: '40px', borderRadius: '20px' } },
    { id: 3, name: 'Cloud Puff 1', color: '#e2e8f0', targetX: 50, targetY: 80, style: { width: '50px', height: '50px', borderRadius: '50%' } },
    { id: 4, name: 'Cloud Puff 2', color: '#e2e8f0', targetX: 90, targetY: 90, style: { width: '40px', height: '40px', borderRadius: '50%' } }
  ],
  [ // Jade Rabbit
    { id: 1, name: 'Body', color: '#fff', targetX: 70, targetY: 120, style: { width: '70px', height: '50px', borderRadius: '35px 35px 20px 20px' } },
    { id: 2, name: 'Head', color: '#fff', targetX: 40, targetY: 100, style: { width: '40px', height: '40px', borderRadius: '50%' } },
    { id: 3, name: 'Ear 1', color: '#fca5a5', targetX: 45, targetY: 60, style: { width: '15px', height: '45px', borderRadius: '50% 50% 0 0', transform: 'rotate(-20deg)' } },
    { id: 4, name: 'Ear 2', color: '#fca5a5', targetX: 65, targetY: 65, style: { width: '15px', height: '40px', borderRadius: '50% 50% 0 0', transform: 'rotate(10deg)' } },
    { id: 5, name: 'Tail', color: '#fff', targetX: 130, targetY: 140, style: { width: '20px', height: '20px', borderRadius: '50%' } }
  ],
  [ // Star
    { id: 1, name: 'Center', color: '#fef08a', targetX: 80, targetY: 100, style: { width: '40px', height: '40px' } },
    { id: 2, name: 'Top Point', color: '#fef08a', targetX: 80, targetY: 60, style: { width: '40px', height: '40px', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' } },
    { id: 3, name: 'Bottom Point', color: '#fef08a', targetX: 80, targetY: 140, style: { width: '40px', height: '40px', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' } },
    { id: 4, name: 'Left Point', color: '#fef08a', targetX: 40, targetY: 100, style: { width: '40px', height: '40px', clipPath: 'polygon(100% 0, 100% 100%, 0 50%)' } },
    { id: 5, name: 'Right Point', color: '#fef08a', targetX: 120, targetY: 100, style: { width: '40px', height: '40px', clipPath: 'polygon(0 0, 100% 50%, 0 100%)' } }
  ]
];

export function TangramPuzzle({ onWin }: { onWin: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [selectedPuzzle] = useState(() => PUZZLE_BANK[Math.floor(Math.random() * PUZZLE_BANK.length)]);
  
  const [pieces, setPieces] = useState(() => 
    selectedPuzzle.map(s => ({
      ...s,
      x: Math.random() * 150 + 20, // Random scatter horizontally
      y: Math.random() * 100 + 320, // Random scatter below the silhouette
      isLocked: false
    }))
  );

  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    if (pieces.every(p => p.isLocked)) {
      setTimeout(onWin, 1500);
    }
  }, [pieces, onWin]);

  const handlePointerDown = (id: number, e: React.PointerEvent) => {
    const piece = pieces.find(p => p.id === id);
    if (piece?.isLocked) return;
    
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setActiveId(id);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeId || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate new position relative to the puzzle container
    let newX = e.clientX - rect.left - 20; // -20 roughly centers the cursor on piece
    let newY = e.clientY - rect.top - 20;

    setPieces(prev => prev.map(p => p.id === activeId ? { ...p, x: newX, y: newY } : p));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!activeId) return;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    setPieces(prev => prev.map(p => {
      if (p.id === activeId) {
        // Snap check
        const dx = Math.abs(p.x - p.targetX);
        const dy = Math.abs(p.y - p.targetY);
        
        // Generous snap tolerance (30px)
        if (dx < 30 && dy < 30) {
          return { ...p, x: p.targetX, y: p.targetY, isLocked: true };
        }
      }
      return p;
    }));
    setActiveId(null);
  };

  const isComplete = pieces.every(p => p.isLocked);

  return (
    <div className="glass-panel animate-fade-in" style={{ textAlign: 'center', userSelect: 'none', touchAction: 'none' }}>
      <h3 style={{ marginBottom: '1rem' }}>Assemble the Shape</h3>
      <p style={{ color: 'var(--color-text-muted)' }}>Drag the pieces to fit the silhouette.</p>
      
      {/* Puzzle Container */}
      <div 
        ref={containerRef}
        style={{
          margin: '2rem auto',
          width: '200px',
          height: '450px', // Extra height to scatter pieces at the bottom
          position: 'relative',
          background: 'transparent',
        }}
      >
        {/* Silhouette Outline */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '200px', height: '300px',
          boxShadow: isComplete ? '0 0 30px rgba(212, 175, 55, 0.5)' : 'none',
          transition: 'box-shadow 0.5s',
          borderRadius: '20px',
          zIndex: 0
        }}>
          {selectedPuzzle.map(s => (
            <div 
              key={`shadow-${s.id}`} 
              style={{
                position: 'absolute',
                background: 'rgba(255,255,255,0.1)',
                border: '1px dashed rgba(255,255,255,0.2)',
                transform: `translate(${s.targetX}px, ${s.targetY}px)`,
                ...s.style
              }} 
            />
          ))}
        </div>

        {/* Draggable Pieces */}
        {pieces.map(p => (
          <div 
            key={p.id}
            onPointerDown={(e) => handlePointerDown(p.id, e)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
              position: 'absolute',
              background: p.color,
              boxShadow: p.isLocked ? 'inset 0 0 10px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.3)',
              transform: `translate(${p.x}px, ${p.y}px)`,
              cursor: p.isLocked ? 'default' : 'grab',
              zIndex: activeId === p.id ? 10 : (p.isLocked ? 1 : 2),
              ...p.style
            }} 
          />
        ))}
      </div>

      {isComplete && (
        <p style={{ color: 'var(--color-accent)', fontWeight: 'bold' }} className="animate-fade-in glow-pulse">
          Puzzle Complete!
        </p>
      )}
    </div>
  );
}
