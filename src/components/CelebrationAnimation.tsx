import { useEffect } from "react";

export function CelebrationAnimation() {
  useEffect(() => {
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 40;
      pointer-events: none;
      overflow: hidden;
    `;

    // Add keyframes for fireworks
    if (!document.querySelector("style[data-fireworks]")) {
      const style = document.createElement("style");
      style.setAttribute("data-fireworks", "true");
      style.innerHTML = `
        @keyframes firework-burst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }

        @keyframes firework-twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .firework-particle {
          position: absolute;
          pointer-events: none;
          font-size: 1.5rem;
          animation: firework-burst 1.2s ease-out forwards;
        }
      `;
      document.head.appendChild(style);
    }

    // Create multiple fireworks at random positions
    const createFirework = (x: number, y: number) => {
      const particles = ["✨", "⭐", "💫", "🌟", "💥", "🎆", "🎇"];
      const colors = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F"];

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "firework-particle";
        particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];

        // Random direction
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 5 + Math.random() * 8;
        const tx = Math.cos(angle) * velocity * 50;
        const ty = Math.sin(angle) * velocity * 50;

        particle.style.cssText = `
          left: ${x}px;
          top: ${y}px;
          --tx: ${tx}px;
          --ty: ${ty}px;
          color: ${colors[Math.floor(Math.random() * colors.length)]};
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.8));
          animation-delay: ${Math.random() * 0.3}s;
        `;

        container.appendChild(particle);
      }
    };

    // Create fireworks at multiple locations across the screen
    const numFireworks = 8;
    for (let i = 0; i < numFireworks; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createFirework(x, y);
      }, i * 300);
    }

    document.body.appendChild(container);

    // Auto-remove after animation completes
    setTimeout(() => {
      try {
        document.body.removeChild(container);
      } catch {
        // Already removed
      }
    }, 3500);

    return () => {
      try {
        document.body.removeChild(container);
      } catch {
        // Already removed
      }
    };
  }, []);

  return null;
}



