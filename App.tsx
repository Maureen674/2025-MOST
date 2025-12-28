import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { AppState, ThemeType, DecorationType } from './types';
import PreviewCanvas from './components/PreviewCanvas';
import ControlPanel from './components/ControlPanel';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    theme: ThemeType.CYBERPUNK,
    paletteIndex: 0,
    image: null,
    imagePosition: { x: 'center', y: 'center' },
    category: '',
    description: '',
    decoration: DecorationType.ROCKET,
    isExporting: false,
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!canvasRef.current) return;

    // 1. Set exporting state to freeze animations (handled in PreviewCanvas)
    setState(prev => ({ ...prev, isExporting: true }));

    // Small delay to allow React to render the "frozen" state (e.g., centering the marquee)
    setTimeout(async () => {
      try {
        if (canvasRef.current) {
          const canvas = await html2canvas(canvasRef.current, {
            scale: 2, // High resolution
            useCORS: true, // Handle cross-origin images if any
            backgroundColor: null,
            logging: false,
          });

          const link = document.createElement('a');
          link.download = `2025-MOST-${state.category || 'Summary'}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      } catch (err) {
        console.error("Export failed", err);
        alert("Failed to export image. Please try again.");
      } finally {
        // Restore animation state
        setState(prev => ({ ...prev, isExporting: false }));
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden font-sans">
       {/* Mobile Header */}
       <div className="md:hidden p-4 bg-slate-900 border-b border-slate-800 text-center">
          <h1 className="text-xl font-bold text-white tracking-wider">2025 GENERATOR</h1>
       </div>

       {/* Canvas Preview Area */}
       <div className="flex-1 overflow-auto p-4 md:p-10 flex items-center justify-center bg-slate-950 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 1px, transparent 1px)', 
                 backgroundSize: '20px 20px' 
               }} 
          />
          
          <div className="shadow-2xl relative">
            <PreviewCanvas ref={canvasRef} state={state} />
          </div>
       </div>

       {/* Controls Sidebar */}
       <ControlPanel state={state} setState={setState} onExport={handleExport} />
    </div>
  );
};

export default App;
