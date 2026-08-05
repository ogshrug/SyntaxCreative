import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const CONFETTI_COLORS = [
  '#3DCB6C',
  '#F7B32B',
  '#9046CF',
  '#ff6b6b',
  '#45b7d1',
  '#ffd700',
  '#e74c3c',
];

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  width: number;
  height: number;
}

function generateConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.2,
    duration: 2.5 + Math.random() * 2,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    width: 6 + Math.random() * 6,
    height: 10 + Math.random() * 8,
  }));
}

interface CheckoutFlowProps {
  onComplete: () => void;
  onGoHome: () => void;
}

export function CheckoutFlow({ onComplete, onGoHome }: CheckoutFlowProps) {
  const [stage, setStage] = useState<'logo' | 'expand' | 'success'>('logo');
  const confetti = useMemo(
    () => (stage === 'success' ? generateConfetti(140) : []),
    [stage],
  );
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const t1 = setTimeout(() => setStage('expand'), 1400);
    const t2 = setTimeout(() => {
      setStage('success');
      onCompleteRef.current();
    }, 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (stage === 'success') {
    return (
      <div className="fixed inset-0 z-[300] bg-black overflow-hidden">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.left}%`,
              width: piece.width,
              height: piece.height,
              backgroundColor: piece.color,
              animation: `confettiFall ${piece.duration}s ${piece.delay}s ease-in forwards`,
            }}
          />
        ))}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center checkout-success-in">
          <img
            src="/logo1.svg"
            alt="SPOTIFY logo"
            className="w-24 h-24 mb-8"
          />
          <h1
            className="text-fluid-display font-extrabold text-white mb-4"
            style={{ fontWeight: 800 }}
            data-testid="text-order-success"
          >
            Order Placed
          </h1>
          <p className="text-2xl text-white/70 mb-10" data-testid="text-happy-listening">
            Happy listening!
          </p>
          <Button
            size="lg"
            onClick={onGoHome}
            className="bg-white hover:bg-white/90 text-black font-bold px-8 py-6 rounded-sm"
            data-testid="button-back-home"
          >
            <Home className="mr-2 w-5 h-5" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center transition-colors duration-700 ${
        stage === 'expand' ? 'bg-black' : 'bg-background'
      }`}
    >
      <img
        src="/logo1.svg"
        alt=""
        className={stage === 'expand' ? 'checkout-expand' : 'checkout-logo'}
        data-testid="checkout-logo"
      />
    </div>
  );
}
