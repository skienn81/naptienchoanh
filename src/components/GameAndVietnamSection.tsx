import React, { useState, useEffect, useRef } from 'react';
import { ProposalItem } from '../types';
import { Play, RotateCcw, ThumbsUp, Send, MapPin, Sparkles, Shield, Zap, Award, Flame } from 'lucide-react';
import { sounds } from '../utils/audio';

const initialProposals: ProposalItem[] = [
  {
    id: 'prop-1',
    city: 'TP. Hồ Chí Minh',
    street: 'Đường Kha Vạn Cân (Thủ Đức)',
    description: 'Đoạn gần đường ray xe lửa có nhiều ổ gà sâu và ngập khi mưa lớn, làm xóc vỡ pizza khi shipper đi qua.',
    votes: 142,
    status: 'Đã duyệt khảo sát',
    createdAt: 'Hôm nay'
  },
  {
    id: 'prop-2',
    city: 'Hà Nội',
    street: 'Đường Lĩnh Nam (Hoàng Mai)',
    description: 'Đường hẹp nhiều vệt lồi lõm và ổ gà lớn cần Domino\'s tài trợ trải thảm nhựa bảo vệ hộp bánh.',
    votes: 98,
    status: 'Đang chờ duyệt',
    createdAt: '15 phút trước'
  },
  {
    id: 'prop-3',
    city: 'Đà Nẵng',
    street: 'Đường Điện Biên Phủ (Đoạn hầm chui)',
    description: 'Cần lấp ổ gà nhỏ chỗ đoạn rẽ hầm chui để shipper giao bánh Domino\'s giữ chuẩn 5 sao an toàn.',
    votes: 215,
    status: 'Đã lên lịch vá',
    createdAt: '1 giờ trước'
  }
];

export const GameAndVietnamSection: React.FC = () => {
  // Game states
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [health, setHealth] = useState<number>(100);
  const [pavedCount, setPavedCount] = useState<number>(0);
  const [activePowerUp, setActivePowerUp] = useState<string | null>(null);
  const [rankResult, setRankResult] = useState<{ rank: string; color: string } | null>(null);

  // References for mutable game loop state to avoid re-renders during 60fps tick
  const gameStateRef = useRef({
    running: false,
    score: 0,
    health: 100,
    totalPavedCount: 0,
    playerLane: 1, // 0: Left, 1: Middle, 2: Right
    lanes: [80, 200, 320],
    obstacles: [] as Array<{ lane: number; x: number; y: number; repaired: boolean }>,
    powerups: [] as Array<{ type: 'P' | 'E' | 'S' | 'O'; lane: number; x: number; y: number }>,
    activePowerUp: null as string | null,
    powerUpTimer: 0,
    animationFrameId: 0,
  });

  // Vietnam Road Nominations state
  const [proposals, setProposals] = useState<ProposalItem[]>(() => {
    try {
      const saved = localStorage.getItem('dominos_vn_proposals');
      return saved ? JSON.parse(saved) : initialProposals;
    } catch {
      return initialProposals;
    }
  });

  const [formCity, setFormCity] = useState('');
  const [formStreet, setFormStreet] = useState('');
  const [formDesc, setFormDesc] = useState('');

  // Save proposals to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dominos_vn_proposals', JSON.stringify(proposals));
    } catch {
      // ignore
    }
  }, [proposals]);

  // Game Loop initialization & rendering
  const startGame = () => {
    sounds.playClick();
    const g = gameStateRef.current;
    g.running = true;
    g.score = 0;
    g.health = 100;
    g.totalPavedCount = 0;
    g.playerLane = 1;
    g.obstacles = [];
    g.powerups = [];
    g.activePowerUp = null;
    g.powerUpTimer = 0;

    setScore(0);
    setHealth(100);
    setPavedCount(0);
    setActivePowerUp(null);
    setIsPlaying(true);
    setIsGameOver(false);
    setRankResult(null);

    if (g.animationFrameId) {
      cancelAnimationFrame(g.animationFrameId);
    }

    g.animationFrameId = requestAnimationFrame(loop);
  };

  const movePlayer = (dir: -1 | 1) => {
    const g = gameStateRef.current;
    if (!g.running) return;
    g.playerLane = Math.max(0, Math.min(2, g.playerLane + dir));
    sounds.playClick();
  };

  const quickPave = () => {
    const g = gameStateRef.current;
    if (!g.running) return;
    const playerY = 410;
    let hitAny = false;

    g.obstacles.forEach((obs) => {
      if (obs.lane === g.playerLane && obs.y > playerY - 140 && obs.y < playerY + 50 && !obs.repaired) {
        obs.repaired = true;
        hitAny = true;
        g.totalPavedCount++;
        const multiplier = g.activePowerUp === 'E' ? 2 : 1;
        g.score += 200 * multiplier;
      }
    });

    if (hitAny) {
      sounds.playPave();
      setScore(g.score);
      setPavedCount(g.totalPavedCount);
    }
  };

  const loop = () => {
    const canvas = canvasRef.current;
    const g = gameStateRef.current;
    if (!canvas || !g.running) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw Road Canvas
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Curbs
    ctx.fillStyle = '#E31837';
    ctx.fillRect(0, 0, 12, canvas.height);
    ctx.fillRect(canvas.width - 12, 0, 12, canvas.height);

    // Animated Lane Dividers
    ctx.strokeStyle = '#f8fafc';
    ctx.setLineDash([20, 20]);
    ctx.lineDashOffset = -Date.now() / 15 % 40;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(140, 0); ctx.lineTo(140, canvas.height);
    ctx.moveTo(260, 0); ctx.lineTo(260, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]); // reset

    // PowerUp countdown
    if (g.activePowerUp && g.powerUpTimer > 0) {
      g.powerUpTimer--;
      if (g.powerUpTimer <= 0) {
        g.activePowerUp = null;
        setActivePowerUp(null);
      }
    }

    // 2. Spawn Obstacles (Potholes)
    if (Math.random() < 0.035) {
      const laneChoice = Math.floor(Math.random() * 3);
      g.obstacles.push({
        lane: laneChoice,
        x: g.lanes[laneChoice],
        y: -50,
        repaired: false,
      });
    }

    // 3. Spawn PESO Power-ups
    if (Math.random() < 0.008 && g.powerups.length === 0) {
      const types: ('P' | 'E' | 'S' | 'O')[] = ['P', 'E', 'S', 'O'];
      const chosenType = types[Math.floor(Math.random() * types.length)];
      const laneChoice = Math.floor(Math.random() * 3);
      g.powerups.push({
        type: chosenType,
        lane: laneChoice,
        x: g.lanes[laneChoice],
        y: -40,
      });
    }

    // 4. Update & Render Power-ups
    for (let i = g.powerups.length - 1; i >= 0; i--) {
      const p = g.powerups[i];
      p.y += 4;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fillStyle = p.type === 'P' ? '#E31837' : p.type === 'E' ? '#006491' : p.type === 'S' ? '#f59e0b' : '#10b981';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 16px Lexend, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.type, 0, 1);
      ctx.restore();

      // Collect power-up
      if (p.lane === g.playerLane && p.y > 380 && p.y < 450) {
        g.activePowerUp = p.type;
        g.powerUpTimer = 300; // ~5 seconds
        sounds.playPowerup();

        if (p.type === 'S') {
          g.health = Math.min(100, g.health + 20);
          setHealth(g.health);
        }

        setActivePowerUp(p.type);
        g.powerups.splice(i, 1);
        continue;
      }

      if (p.y > canvas.height + 40) {
        g.powerups.splice(i, 1);
      }
    }

    // 5. Update & Render Potholes
    for (let i = g.obstacles.length - 1; i >= 0; i--) {
      const obs = g.obstacles[i];
      obs.y += 5;

      // Steamroller Power-up (P) auto-repairs
      if (g.activePowerUp === 'P' && !obs.repaired && obs.y > 200) {
        obs.repaired = true;
        g.totalPavedCount++;
        g.score += 150;
        setScore(g.score);
        setPavedCount(g.totalPavedCount);
        sounds.playPave();
      }

      if (obs.repaired) {
        // Sealed Domino's Patch
        ctx.fillStyle = '#006491';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(obs.x - 32, obs.y - 18, 64, 36, 8);
        } else {
          ctx.rect(obs.x - 32, obs.y - 18, 64, 36);
        }
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#f59e0b';
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '800 9px Lexend, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('OH YES WE DID', obs.x, obs.y + 4);
      } else {
        // Deep pothole
        ctx.fillStyle = '#030712';
        ctx.beginPath();
        ctx.ellipse(obs.x, obs.y, 28, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ef4444';
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚠️', obs.x, obs.y + 5);
      }

      // Collision detection with scooter
      const playerY = 410;
      if (!obs.repaired && obs.lane === g.playerLane && obs.y > playerY - 25 && obs.y < playerY + 25) {
        if (g.activePowerUp === 'O') {
          // Shielded! Auto repaired
          obs.repaired = true;
          sounds.playPave();
        } else {
          sounds.playHit();
          g.health -= 20;
          setHealth(g.health);
          g.obstacles.splice(i, 1);

          if (g.health <= 0) {
            endGame();
            return;
          }
          continue;
        }
      }

      if (obs.y > canvas.height + 40) {
        if (obs.repaired) {
          const mult = g.activePowerUp === 'E' ? 2 : 1;
          g.score += 50 * mult;
          setScore(g.score);
        }
        g.obstacles.splice(i, 1);
      }
    }

    // 6. Render Player Scooter / Steamroller
    const playerX = g.lanes[g.playerLane];
    const playerY = 410;

    if (g.activePowerUp === 'P') {
      // Steamroller
      ctx.fillStyle = '#E31837';
      ctx.fillRect(playerX - 28, playerY - 20, 56, 45);
      ctx.fillStyle = '#000000';
      ctx.fillRect(playerX - 32, playerY + 15, 64, 18);
      ctx.fillStyle = '#f59e0b';
      ctx.font = '900 9px Lexend, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('STEAMROLLER', playerX, playerY - 5);
    } else {
      // Domino's Scooter Body
      ctx.fillStyle = '#E31837';
      ctx.fillRect(playerX - 16, playerY - 15, 32, 45);

      // Driver Helmet
      ctx.fillStyle = '#006491';
      ctx.beginPath();
      ctx.arc(playerX, playerY - 22, 12, 0, Math.PI * 2);
      ctx.fill();

      // Pizza Box Back
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(playerX - 20, playerY + 15, 40, 16);
      ctx.fillStyle = '#000000';
      ctx.font = '900 8px Lexend, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("DOMINO'S", playerX, playerY + 26);

      // Owned Shield Effect (O)
      if (g.activePowerUp === 'O') {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(playerX, playerY, 35, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    g.animationFrameId = requestAnimationFrame(loop);
  };

  const endGame = () => {
    const g = gameStateRef.current;
    g.running = false;
    setIsPlaying(false);
    setIsGameOver(true);

    let rank = 'S';
    let color = 'text-yellow-400';
    if (g.score < 1000) {
      rank = 'B';
      color = 'text-sky-400';
    } else if (g.score < 2500) {
      rank = 'A';
      color = 'text-emerald-400';
    }

    setRankResult({ rank, color });
    sounds.playWin();
  };

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        movePlayer(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        movePlayer(1);
      } else if (e.code === 'Space') {
        e.preventDefault();
        quickPave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameStateRef.current.animationFrameId) {
        cancelAnimationFrame(gameStateRef.current.animationFrameId);
      }
    };
  }, []);

  // Initial canvas display
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && !isPlaying && !isGameOver) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 400;
        canvas.height = 520;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f59e0b';
        ctx.font = '700 18px Lexend, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Nhấn Bắt Đầu Để Lái Xe Giao Pizza!', canvas.width / 2, canvas.height / 2);
      }
    }
  }, [isPlaying, isGameOver]);

  // Handle Form Submission
  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCity.trim() || !formStreet.trim()) return;

    sounds.playPave();
    const newProp: ProposalItem = {
      id: `prop-${Date.now()}`,
      city: formCity,
      street: formStreet,
      description: formDesc.trim() || 'Cần Domino\'s khảo sát tài trợ dải nhựa vá đường giúp shipper giao bánh an toàn.',
      votes: 1,
      status: 'Mới tiếp nhận',
      createdAt: 'Vừa xong',
      userVoted: true,
    };

    setProposals([newProp, ...proposals]);
    setFormStreet('');
    setFormDesc('');
  };

  const handleUpvote = (id: string) => {
    sounds.playClick();
    setProposals(prev =>
      prev.map(item => {
        if (item.id === id) {
          const already = !!item.userVoted;
          return {
            ...item,
            votes: already ? item.votes - 1 : item.votes + 1,
            userVoted: !already,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* SECTION 1: "POTHOLE HERO" ARCADE RUNNER MINI-GAME */}
      <div className="bg-slate-900 p-4 sm:p-6 rounded-3xl border-4 border-black pop-shadow-lg text-white max-w-5xl mx-auto space-y-5">
        {/* Game Header Banner */}
        <div className="flex flex-wrap items-center justify-between bg-slate-800 p-4 sm:p-5 rounded-2xl border-2 border-slate-700 gap-4">
          <div className="flex items-center gap-3 sm:gap-6">
            <div>
              <span className="text-[10px] sm:text-xs text-slate-400 font-extrabold uppercase tracking-wider block">
                Điểm PR Campaign
              </span>
              <span className="text-2xl sm:text-3xl font-black text-yellow-400 font-heading tabular-nums">
                {score}
              </span>
            </div>

            <div className="border-r-2 border-slate-700 h-10" />

            <div>
              <span className="text-[10px] sm:text-xs text-slate-400 font-extrabold uppercase tracking-wider block">
                Độ Nguyên Vẹn Bánh
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 sm:w-32 bg-slate-700 rounded-full h-4 border border-black overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      health > 60 ? 'bg-emerald-500' : health > 30 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.max(0, health)}%` }}
                  />
                </div>
                <span
                  className={`text-xs sm:text-sm font-black tabular-nums ${
                    health > 60 ? 'text-emerald-400' : health > 30 ? 'text-amber-400' : 'text-red-400'
                  }`}
                >
                  {health}%
                </span>
              </div>
            </div>

            <div className="hidden sm:block border-r-2 border-slate-700 h-10" />

            <div className="hidden sm:block">
              <span className="text-[10px] sm:text-xs text-slate-400 font-extrabold uppercase tracking-wider block">
                PESO Power-Up
              </span>
              <span
                className={`text-xs font-black ${
                  activePowerUp ? 'text-yellow-300 animate-pulse' : 'text-slate-400'
                }`}
              >
                {activePowerUp === 'P' && '🚜 P - Xe Lu Vá Đường (Steamroller)'}
                {activePowerUp === 'E' && '📸 E - Báo Chí Flash (x2 Điểm)'}
                {activePowerUp === 'S' && '❤️ S - Viral Wave (+20% Bánh)'}
                {activePowerUp === 'O' && '🛡️ O - Khiên Pizza Chống Xóc'}
                {!activePowerUp && 'Không có'}
              </span>
            </div>
          </div>

          <button
            onClick={startGame}
            className="bg-[#E31837] hover:bg-red-600 active:scale-95 text-white font-black px-5 py-2.5 rounded-xl border-2 border-black pop-shadow-sm transition-all text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isPlaying ? 'Chơi lại' : 'Bắt đầu Chơi Game'}</span>
          </button>
        </div>

        {/* Game Canvas Screen & Overlay */}
        <div className="relative w-full overflow-hidden rounded-2xl border-4 border-black bg-slate-800 flex justify-center items-center min-h-[440px]">
          <canvas
            ref={canvasRef}
            width={400}
            height={520}
            className="bg-slate-800 max-w-full block shadow-2xl"
          />

          {/* Start Screen Overlay */}
          {!isPlaying && !isGameOver && (
            <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center space-y-4 z-20">
              <div className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 border-black">
                Arcade Mini-Game Tương Tác
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-yellow-300 uppercase font-heading tracking-tight">
                Pothole Hero <br />
                <span className="text-white text-xl sm:text-2xl">Bánh Mịn Đến Tay</span>
              </h3>

              {/* Power Up Tutorial Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-lg text-left text-xs font-medium my-2">
                <div className="bg-red-900/80 border border-red-500 p-2.5 rounded-xl">
                  <span className="font-black text-red-400 text-sm block">P - Paid Media</span>
                  <span className="text-[10px] text-slate-200">Xe Lu bọc thép cán phẳng mọi ổ gà!</span>
                </div>
                <div className="bg-sky-900/80 border border-sky-500 p-2.5 rounded-xl">
                  <span className="font-black text-sky-400 text-sm block">E - Earned Media</span>
                  <span className="text-[10px] text-slate-200">Ống kính báo chí x2 Điểm PR!</span>
                </div>
                <div className="bg-amber-900/80 border border-amber-500 p-2.5 rounded-xl">
                  <span className="font-black text-amber-400 text-sm block">S - Shared Media</span>
                  <span className="text-[10px] text-slate-200">Làn sóng Like/Share hồi 20% bánh!</span>
                </div>
                <div className="bg-emerald-900/80 border border-emerald-500 p-2.5 rounded-xl">
                  <span className="font-black text-emerald-400 text-sm block">O - Owned Media</span>
                  <span className="text-[10px] text-slate-200">Khiên bảo vệ Pizza chống xóc va chạm!</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                Dùng phím <span className="text-yellow-400 font-bold">Mũi tên Trái / Phải</span> để lạng lách. Bấm phím{' '}
                <span className="text-red-400 font-bold">SPACE (hoặc nút Vá Đường)</span> khi đến gần ổ gà để đóng dấu{' '}
                <strong className="text-yellow-300">&ldquo;OH YES WE DID&rdquo;</strong>!
              </p>

              <button
                onClick={startGame}
                className="bg-[#006491] hover:bg-sky-600 active:scale-95 text-white font-black px-8 py-3.5 rounded-2xl border-2 border-black pop-shadow uppercase text-base tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>🚀 Xuất Phát Giao Bánh</span>
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {isGameOver && (
            <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center space-y-4 z-20 animate-fadeIn">
              <div className="text-5xl animate-bounce">🏆🍕</div>
              <h3 className="text-3xl font-black text-yellow-300 uppercase font-heading">
                Hoàn Thành Chuyến Giao Bánh!
              </h3>

              <div className="bg-slate-900/90 border-2 border-slate-700 p-4 rounded-2xl w-full max-w-sm space-y-2.5 text-left text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Xếp hạng giao hàng:</span>
                  <span className={`font-black text-2xl ${rankResult?.color || 'text-yellow-400'}`}>
                    HẠNG {rankResult?.rank || 'S'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Tổng điểm PR Campaign:</span>
                  <span className="font-black text-yellow-400 text-sm tabular-nums">{score} PTS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Số ổ gà đã vá phẳng:</span>
                  <span className="font-black text-emerald-400 text-sm tabular-nums">
                    {pavedCount} Vết Vá
                  </span>
                </div>
              </div>

              <button
                onClick={startGame}
                className="bg-[#E31837] hover:bg-red-600 active:scale-95 text-white font-black px-8 py-3.5 rounded-2xl border-2 border-black pop-shadow uppercase text-sm tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Thử Lại Để Đạt Hạng S</span>
              </button>
            </div>
          )}
        </div>

        {/* On-screen Touch Controls */}
        <div className="flex flex-wrap justify-between items-center gap-3 pt-1">
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => movePlayer(-1)}
              className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-black px-6 py-3 rounded-xl border-2 border-slate-600 text-sm uppercase cursor-pointer"
            >
              👈 Trái
            </button>
            <button
              onClick={() => movePlayer(1)}
              className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-black px-6 py-3 rounded-xl border-2 border-slate-600 text-sm uppercase cursor-pointer"
            >
              Phải 👉
            </button>
          </div>

          <button
            onClick={quickPave}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-black px-8 py-3 rounded-xl border-2 border-black pop-shadow-sm text-sm uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🛠️ Vá Ổ Gà Siêu Tốc (Phím Space)</span>
          </button>
        </div>
      </div>

      {/* SECTION 2: VIETNAM CAMPAIGN LOCALIZATION MODULE */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-black pop-shadow space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-black pb-4">
          <div>
            <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase border border-black inline-block">
              🇻🇳 Bản Địa Hóa Việt Nam
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase mt-1 font-heading">
              Nếu &ldquo;Paving For Pizza&rdquo; Xuất Hiện Tại Việt Nam?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Hãy đề xuất con đường nhiều ổ gà / xuống cấp tại địa phương bạn để Domino&apos;s Việt Nam tài trợ sửa chữa bảo vệ bánh Pizza!
            </p>
          </div>
          <div className="text-4xl">🛵🍕🇻🇳</div>
        </div>

        {/* Form Selection Dropdown for VN Cities */}
        <form
          onSubmit={handleProposalSubmit}
          className="grid md:grid-cols-12 gap-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border-3 border-black"
        >
          <div className="md:col-span-4 space-y-1">
            <label className="block text-xs font-black uppercase text-slate-700">
              1. Chọn Tỉnh / Thành Phố
            </label>
            <select
              value={formCity}
              onChange={(e) => setFormCity(e.target.value)}
              required
              className="w-full bg-white border-2 border-black rounded-xl p-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#E31837] outline-none"
            >
              <option value="">-- Chọn Tỉnh / Thành --</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Bình Dương">Bình Dương</option>
              <option value="Đồng Nai">Đồng Nai</option>
              <option value="Quảng Ninh">Quảng Ninh</option>
              <option value="Khánh Hòa">Khánh Hòa</option>
              <option value="Tỉnh/Thành khác">Tỉnh/Thành khác</option>
            </select>
          </div>

          <div className="md:col-span-5 space-y-1">
            <label className="block text-xs font-black uppercase text-slate-700">
              2. Tên Con Đường / Đoạn Đường Cần Vá
            </label>
            <input
              type="text"
              value={formStreet}
              onChange={(e) => setFormStreet(e.target.value)}
              required
              placeholder="Ví dụ: Đường Nguyễn Trãi, Đoạn ngã tư..."
              className="w-full bg-white border-2 border-black rounded-xl p-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#E31837] outline-none"
            />
          </div>

          <div className="md:col-span-3 flex items-end">
            <button
              type="submit"
              className="w-full bg-[#E31837] hover:bg-red-600 text-white font-black p-3 rounded-xl border-2 border-black pop-shadow-sm uppercase text-sm transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Gửi Đề Xuất 🚀</span>
            </button>
          </div>

          <div className="md:col-span-12 space-y-1">
            <label className="block text-xs font-black uppercase text-slate-700">
              3. Mô tả thêm tình trạng (Tùy chọn)
            </label>
            <input
              type="text"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              placeholder="Ví dụ: Đoạn này ổ gà lớn hay ngập nước làm đổ bánh pizza khi shipper đi qua ban đêm..."
              className="w-full bg-white border-2 border-black rounded-xl p-2.5 text-xs font-medium text-slate-900 outline-none"
            />
          </div>
        </form>

        {/* Live Feed of Proposals */}
        <div className="space-y-3">
          <h3 className="font-black text-lg text-[#006491] uppercase flex items-center gap-2 font-heading">
            <MapPin className="w-5 h-5 text-[#E31837]" />
            Danh Sách Tuyến Đường Được Đề Xuất Bình Chọn ({proposals.length})
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {proposals.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl border-2 border-black pop-shadow-sm space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="bg-red-100 text-[#E31837] text-xs font-black px-2.5 py-0.5 rounded-md border border-black">
                      {item.city}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {item.createdAt}
                    </span>
                  </div>
                  <h4 className="font-black text-base text-slate-900 font-heading">
                    {item.street}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2.5 border-t border-slate-100">
                  <button
                    onClick={() => handleUpvote(item.id)}
                    className={`text-xs font-black px-3 py-1.5 rounded-xl border border-black transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                      item.userVoted
                        ? 'bg-emerald-300 text-emerald-950 font-black'
                        : 'bg-yellow-300 hover:bg-yellow-400 text-slate-900'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Bình chọn ({item.votes})</span>
                  </button>

                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      item.status === 'Đã duyệt khảo sát'
                        ? 'bg-emerald-100 text-emerald-700'
                        : item.status === 'Đã lên lịch vá'
                        ? 'bg-sky-100 text-sky-700'
                        : item.status === 'Mới tiếp nhận'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
