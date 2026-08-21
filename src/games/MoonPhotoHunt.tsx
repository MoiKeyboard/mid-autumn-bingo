import { useState, useRef, useEffect } from 'react';
import { verifyImage, loadModel } from '../utils/vision';

const PROMPT_BANK = [
  { id: 'round', text: "Find something round like the Full Moon" },
  { id: 'companion', text: "Find a Festival Companion" },
  { id: 'lantern', text: "Find a modern 'Lantern'" },
  { id: 'flora', text: "Find some nature or greenery" },
  { id: 'feast', text: "Find festival food or something to eat" },
  { id: 'utensil', text: "Find something used to eat mooncakes or drink tea" },
  { id: 'transport', text: "Find a vehicle to travel to the lantern festival" },
  { id: 'comfort', text: "Find a cozy place to sit and moon-gaze" },
  { id: 'knowledge', text: "Find something to read festival poems from" },
  { id: 'accessory', text: "Find an accessory to bring to an outdoor festival" }
] as const;

export type PromptId = typeof PROMPT_BANK[number]['id'];

export function MoonPhotoHunt({ onWin }: { onWin: () => void }) {
  const [prompts] = useState(() => 
    [...PROMPT_BANK].sort(() => 0.5 - Math.random()).slice(0, 3)
  );
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    loadModel().then(() => setIsModelLoading(false));
  }, []);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };

  const handleVerify = async () => {
    if (!imgRef.current) return;
    setIsAnalyzing(true);
    
    // Slight delay to make the "scanning" feel real
    await new Promise(r => setTimeout(r, 1000));
    
    const isValid = await verifyImage(imgRef.current, prompts[currentPromptIdx].id);
    setIsAnalyzing(false);

    if (isValid) {
      if (currentPromptIdx < prompts.length - 1) {
        setCurrentPromptIdx(i => i + 1);
        setImageSrc(null);
      } else {
        onWin();
      }
    } else {
      alert("Hmm, that doesn't look quite right to the AI. Try again!");
      setImageSrc(null);
    }
  };

  if (isModelLoading) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center' }}>
        <p className="glow-pulse">Loading AI Vision Model...</p>
      </div>
    );
  }

  const prompt = prompts[currentPromptIdx];

  return (
    <div className="glass-panel animate-fade-in" style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '1rem' }}>Moon Photo Hunt</h3>
      <p style={{ color: 'var(--color-text-muted)' }}>Find and capture:</p>
      <h4 style={{ fontSize: '1.2rem', color: 'var(--color-accent)' }}>{prompt.text}</h4>

      {!imageSrc ? (
        <div style={{ marginTop: '2rem' }}>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            onChange={handleCapture}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <button onClick={() => fileInputRef.current?.click()} className="glow-pulse">
            Open Camera
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '1rem' }}>
          <img 
            ref={imgRef} 
            src={imageSrc} 
            alt="Captured" 
            style={{ maxWidth: '100%', borderRadius: '8px', border: '2px solid var(--color-primary)' }} 
          />
          <div style={{ marginTop: '1rem', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={() => setImageSrc(null)}
              style={{ background: 'transparent', border: '1px solid var(--color-text-muted)', color: 'var(--color-text)' }}
              disabled={isAnalyzing}
            >
              Retake
            </button>
            <button onClick={handleVerify} disabled={isAnalyzing}>
              {isAnalyzing ? 'Scanning...' : 'Verify Image'}
            </button>
          </div>
        </div>
      )}
      
      <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
        Progress: {currentPromptIdx} / 3
      </p>
    </div>
  );
}
