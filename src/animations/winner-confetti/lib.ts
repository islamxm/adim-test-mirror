import { useEffect, useRef, useState } from "react";

import confetti from "canvas-confetti";

const count = 200;
const defaults = {
  origin: { y: 0.7 },
};

const fire = (particleRatio: number, opts: confetti.Options) => {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  });
};

// export const winnerConfettiRun = () => {
//   fire(0.25, {
//     spread: 26,
//     startVelocity: 55,
//   });
//   fire(0.2, {
//     spread: 60,
//   });
//   fire(0.35, {
//     spread: 100,
//     decay: 0.91,
//     scalar: 0.8,
//   });
//   fire(0.1, {
//     spread: 120,
//     startVelocity: 25,
//     decay: 0.92,
//     scalar: 1.2,
//   });
//   fire(0.1, {
//     spread: 120,
//     startVelocity: 45,
//   });
// };

export const winnerConfettiRun = (opts?: confetti.Options) => {
  fire(0.5, opts || {});
};

export const useCanvasConfetti = () => {
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const [c, setC] = useState<confetti.CreateTypes>();

  useEffect(() => {
    if (confettiCanvasRef.current) {
      console.log(confettiCanvasRef.current);
      const ins = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: true,
      });
      setC(() => ins);
    }
  }, []);

  const confettiRun = (particleRatio: number, opts?: confetti.Options) => {
    if (c) {
      c({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }
  };

  return { confettiCanvasRef, confettiRun };
};
