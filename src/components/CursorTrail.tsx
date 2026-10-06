import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  shape: 'pizza' | 'sparkle' | 'dot' | 'steam';
  rotation: number;
  rotSpeed: number;
}

const BRAND_COLORS = [
  '#E31837', // Domino's Red
  '#006491', // Domino's Blue
  '#FFD200', // Pizza Cheese Yellow / Golden
  '#FFFFFF', // Pure White
];

export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let mouse = { x: -100, y: -100, prevX: -100, prevY: -100, speed: 0 };
    let isMoving = false;
    let stopTimeout: NodeJS.Timeout;

    // Smooth window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const spawnParticles = (x: number, y: number, count: number, speedMagnitude: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (speedMagnitude * 0.35 + 1.8);
        const rand = Math.random();
        
        let shape: 'pizza' | 'sparkle' | 'dot' | 'steam' = 'dot';
        if (rand < 0.28) shape = 'pizza';
        else if (rand < 0.6) shape = 'sparkle';
        else if (rand < 0.82) shape = 'steam';

        const color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
        const maxLife = Math.floor(25 + Math.random() * 25);

        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4, // slight upward float
          size: shape === 'pizza' ? 14 + Math.random() * 10 : 4 + Math.random() * 6,
          color,
          alpha: 1,
          life: 0,
          maxLife,
          shape,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.15,
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Playful burst on click
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 5.5;
        const rand = Math.random();
        const shape = rand < 0.4 ? 'pizza' : rand < 0.8 ? 'sparkle' : 'dot';
        const color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: shape === 'pizza' ? 18 + Math.random() * 8 : 6 + Math.random() * 6,
          color,
          alpha: 1,
          life: 0,
          maxLife: 35 + Math.random() * 20,
          shape,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.25,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (mouse.prevX !== -100) {
        const dx = currentX - mouse.prevX;
        const dy = currentY - mouse.prevY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        mouse.speed = dist;

        // Spawn particles based on mouse movement speed
        const particleCount = Math.min(Math.floor(dist / 8) + 1, 4);
        spawnParticles(currentX, currentY, particleCount, dist);
      }

      mouse.prevX = currentX;
      mouse.prevY = currentY;
      mouse.x = currentX;
      mouse.y = currentY;
      isMoving = true;

      clearTimeout(stopTimeout);
      stopTimeout = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    // Draw little stylized pizza slice (triangle + crust + pepperoni)
    const drawPizzaSlice = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rot: number,
      alpha: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rot);
      context.globalAlpha = alpha;

      const r = size * 0.7;

      // Cheese triangle
      context.beginPath();
      context.moveTo(0, r); // slice tip
      context.lineTo(-r * 0.6, -r * 0.6);
      context.lineTo(r * 0.6, -r * 0.6);
      context.closePath();
      context.fillStyle = '#FFD200'; // Cheese
      context.fill();

      // Golden crust arc
      context.beginPath();
      context.moveTo(-r * 0.65, -r * 0.6);
      context.quadraticCurveTo(0, -r * 0.85, r * 0.65, -r * 0.6);
      context.lineWidth = size * 0.22;
      context.strokeStyle = '#D97706'; // baked crust brown
      context.lineCap = 'round';
      context.stroke();

      // Pepperoni / Domino's red dots
      context.beginPath();
      context.arc(-r * 0.15, -r * 0.2, size * 0.14, 0, Math.PI * 2);
      context.fillStyle = '#E31837';
      context.fill();

      context.beginPath();
      context.arc(r * 0.18, 0, size * 0.11, 0, Math.PI * 2);
      context.fillStyle = '#006491'; // Domino's blue touch
      context.fill();

      context.restore();
    };

    // Draw 4-point sparkle star
    const drawSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number,
      rot: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rot);
      context.globalAlpha = alpha;
      context.fillStyle = color;

      context.beginPath();
      for (let i = 0; i < 4; i++) {
        context.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        context.lineTo(
          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.25),
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.25)
        );
      }
      context.closePath();
      context.fill();
      context.restore();
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soft steam puffs if moving slowly
      if (isMoving && Math.random() < 0.25) {
        spawnParticles(mouse.x, mouse.y, 1, 2);
      }

      // Update & Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Fade out smoothly
        const progress = p.life / p.maxLife;
        p.alpha = Math.max(0, 1 - progress);

        if (p.life >= p.maxLife || p.alpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        if (p.shape === 'pizza') {
          drawPizzaSlice(ctx, p.x, p.y, p.size, p.rotation, p.alpha);
        } else if (p.shape === 'sparkle') {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        } else if (p.shape === 'steam') {
          ctx.save();
          ctx.globalAlpha = p.alpha * 0.45;
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (0.8 + progress * 0.8), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Glow dot
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, p.size * (1 - progress * 0.5)), 0, Math.PI * 2);
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        }
      }

      // Limit particle array to prevent memory load
      if (particles.length > 90) {
        particles.splice(0, particles.length - 90);
      }

      animationId = requestAnimationFrame(render);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchmove', handleTouchMove);
      clearTimeout(stopTimeout);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
      style={{ pointerEvents: 'none' }}
    />
  );
};
