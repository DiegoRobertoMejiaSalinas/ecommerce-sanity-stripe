import confetti from "canvas-confetti";

export const runConfetti = () => {
  var count = 600;
  var defaults = {
    origin: { y: 0.8 },
  };

  const fire = (particleRatio: number, opts: any) => {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  };

  fire(0.45, {
    spread: 156,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 160,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.4, {
    spread: 180,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.3, {
    spread: 120,
    startVelocity: 45,
  });
};
