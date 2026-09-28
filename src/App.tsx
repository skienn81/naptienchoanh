import React from 'react';
import { FlipbookContainer } from './components/flipbook/FlipbookContainer';
import { CursorTrail } from './components/CursorTrail';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#1e242d] overflow-x-hidden">
      {/* Magic Pizza & Sparkle Cursor Trail */}
      <CursorTrail />

      {/* Interactive Flipbook Magazine Application */}
      <FlipbookContainer />
    </div>
  );
}
