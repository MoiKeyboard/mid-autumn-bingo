import { useState, useRef, useEffect } from 'react';
import { verifyImage, loadModel } from '../utils/vision';

const PROMPT_BANK = [
  { id: 'rabbit', text: "I am the animal that represents the festival. Find me!" },
  { id: 'lantern', text: "I bring light to the dark autumn night. Find me!" },
  { id: 'teacup', text: "I am traditionally brewed to pair with sweet mooncakes. Find me!" }
] as const;

export type PromptId = typeof PROMPT_BANK[number]['id'];

export function MoonPhotoHunt({ onWin }: { onWin: () => void }) {
  // Select exactly ONE prompt randomly on component mount
  const [prompt] = useState(() => 
    PROMPT_BANK[Math.floor(Math.random() * PROMPT_BANK.length)]
  );
  
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
    
    const isValid = await verifyImage(imgRef.current, prompt.id);
    setIsAnalyzing(false);

    if (isValid) {
      onWin(); // Immediately win after the single successful capture
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

  return (
    <div className="glass-panel animate-fade-in" style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '1rem' }}>Moon Photo Hunt</h3>
      <p style={{ color: 'var(--color-text-muted)' }}>Your mission is to find and capture:</p>
      <h4 style={{ fontSize: '1.2rem', color: 'var(--color-accent)', margin: '1rem 0' }}>{prompt.text}</h4>

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
    </div>
  );
}
