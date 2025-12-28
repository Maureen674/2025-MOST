import React, { forwardRef } from 'react';
import { AppState, ThemeType, DecorationType } from '../types';
import { THEME_PALETTES, POSITION_CLASSES, FONTS } from '../constants';
import { Decoration } from './Decorations';

interface Props {
  state: AppState;
}

const PreviewCanvas = forwardRef<HTMLDivElement, Props>(({ state }, ref) => {
  const { theme, paletteIndex, image, imagePosition, category, description, decoration, isExporting } = state;
  const palette = THEME_PALETTES[theme][paletteIndex];
  
  // Combine X and Y for tailwind object position class
  const posKey = `${imagePosition.x}-${imagePosition.y}`;
  const objectPosClass = POSITION_CLASSES[posKey] || 'object-center';

  // --- CYBERPUNK THEME (EVA Style) ---
  if (theme === ThemeType.CYBERPUNK) {
    return (
      <div 
        ref={ref}
        className="w-[375px] h-[667px] relative overflow-hidden flex flex-col shrink-0"
        style={{ backgroundColor: palette.bg }}
      >
        {/* EVA Style Header: Static, Horizontal, High Contrast */}
        <div className="h-[15%] w-full flex flex-col border-b-4 relative" style={{ borderColor: palette.text }}>
           {/* Top small data bar */}
           <div className="h-4 w-full flex items-center justify-between px-2 text-[10px]" style={{ backgroundColor: palette.text, color: palette.bg }}>
              <span className={FONTS.cyberpunk.en}>SYSTEM:NORMAL</span>
              <span className={FONTS.cyberpunk.en}>2025_LOG</span>
           </div>
           
           {/* Main Title Area */}
           <div className="flex-1 flex items-center justify-between px-4">
             <h1 className={`${FONTS.cyberpunk.title} text-6xl tracking-tighter transform scale-y-125`} style={{ color: palette.text }}>
               2025
             </h1>
             <div className="flex flex-col items-end justify-center">
                <h1 className={`${FONTS.cyberpunk.title} text-4xl tracking-widest`} style={{ color: palette.accent }}>
                  MOST
                </h1>
                <div className="h-1 w-full mt-1" style={{ backgroundColor: palette.accent }} />
             </div>
           </div>
           
           {/* Honeycomb pattern overlay (CSS only) */}
           <div className="absolute right-0 top-0 w-24 h-full opacity-10 pointer-events-none" 
                style={{ backgroundImage: `radial-gradient(${palette.text} 2px, transparent 2px)`, backgroundSize: '8px 8px' }} 
           />
        </div>

        {/* Middle: Image Container */}
        <div className="flex-1 relative p-0 flex flex-col">
          {/* The Image */}
          <div className="w-full h-full relative group">
             {image ? (
               <img src={image} alt="User" className={`w-full h-full object-cover ${objectPosClass}`} />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-xl tracking-[1em]" style={{ color: palette.text, backgroundColor: '#000' }}>
                 NO DATA
               </div>
             )}
             
             {/* EVA Frame Corners */}
             <div className="absolute top-4 left-4 w-16 h-16 border-t-[6px] border-l-[6px]" style={{ borderColor: palette.accent }} />
             <div className="absolute top-4 right-4 w-16 h-16 border-t-[6px] border-r-[6px]" style={{ borderColor: palette.accent }} />
             <div className="absolute bottom-4 right-4 w-16 h-16 border-b-[6px] border-r-[6px]" style={{ borderColor: palette.accent }} />
             
             {/* Scanning Line */}
             <div className={`absolute inset-0 bg-white/10 h-[2px] w-full ${!isExporting ? 'animate-scanline' : 'hidden'} opacity-50 pointer-events-none`} style={{ boxShadow: `0 0 10px ${palette.text}` }} />
             
             {/* Giant Icon overlapping image at bottom left */}
             {decoration !== DecorationType.NONE && (
               <div className="absolute -bottom-8 -left-6 z-20 drop-shadow-2xl filter" style={{ filter: `drop-shadow(4px 4px 0px ${palette.bg})` }}>
                  <Decoration type={decoration} theme={theme} color={palette.accent} className="w-40 h-40" />
               </div>
             )}
          </div>
        </div>

        {/* Bottom: Text Area - Larger, Industrial Layout */}
        <div className="h-[25%] w-full flex flex-col relative z-10" style={{ backgroundColor: palette.bg }}>
           <div className="absolute -top-6 right-0 bg-black px-4 py-1 border-t-2 border-l-2 z-10" style={{ borderColor: palette.text, backgroundColor: palette.bg }}>
              <span className={`${FONTS.cyberpunk.en} text-xs`} style={{ color: palette.accent }}>CLASSIFIED</span>
           </div>

           <div className="flex-1 p-5 pl-24 flex flex-col justify-center items-end border-t-4" style={{ borderColor: palette.text }}>
              <div className="flex items-baseline gap-2 mb-1 w-full justify-end">
                <span className={`${FONTS.cyberpunk.cn} text-lg opacity-80`} style={{ color: palette.text }}>年度</span>
                <span className={`${FONTS.cyberpunk.cn} text-5xl leading-none`} style={{ color: palette.text }}>
                   {category || '补全计划'}
                </span>
              </div>
              
              <div className="w-full bg-white/5 p-2 border-r-4 mt-2" style={{ borderColor: palette.accent }}>
                <p className={`${FONTS.cyberpunk.cn} text-lg leading-tight text-right`} style={{ color: palette.accent }}>
                  {description || 'Pattern analysis complete. Sync ratio 400%.'}
                </p>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- MINIMALIST THEME (Refined) ---
  if (theme === ThemeType.MINIMALIST) {
    return (
       <div 
        ref={ref}
        className="w-[375px] h-[667px] relative overflow-hidden flex flex-col items-center justify-between p-8 shrink-0"
        style={{ backgroundColor: palette.bg, color: palette.text }}
      >
         <div className="w-full flex justify-between items-center mt-4">
            <h1 className={`${FONTS.minimalist.main} font-bold text-lg tracking-widest uppercase`}>2025 MOST</h1>
            <div className="w-8 h-[1px]" style={{ backgroundColor: palette.accent }} />
         </div>

         <div className="relative w-full aspect-[3/4] bg-white shadow-xl p-4 transform rotate-1 rounded-sm mt-4 flex flex-col">
            <div className="flex-1 w-full bg-gray-100 relative overflow-hidden mb-4 rounded-sm">
              {image ? (
                 <img src={image} alt="User" className={`w-full h-full object-cover grayscale-[20%] contrast-110 ${objectPosClass}`} />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">image</div>
               )}
            </div>
            
            <div className="flex justify-between items-end pb-2 px-1">
               <div className="flex flex-col">
                  <span className={`${FONTS.minimalist.main} text-xs text-gray-400 uppercase tracking-wide`}>Selection</span>
                  <span className={`${FONTS.minimalist.main} text-xl font-bold`}>年度{category || '...'}</span>
               </div>
               <Decoration type={decoration} theme={theme} color={palette.accent} className="w-6 h-6 opacity-60" />
            </div>
         </div>

         <div className="w-full mt-8 mb-8">
            {/* Increased font size to text-lg and removed the bottom grey bar */}
            <p className={`${FONTS.minimalist.main} text-lg font-normal text-center leading-relaxed`} style={{ color: palette.text }}>
               "{description || 'A minimal reflection of the year.'}"
            </p>
         </div>
      </div>
    );
  }

  // --- VINTAGE THEME (Matisse Style - Refined) ---
  if (theme === ThemeType.VINTAGE) {
    return (
       <div 
        ref={ref}
        className="w-[375px] h-[667px] relative overflow-hidden flex flex-col shrink-0"
        style={{ backgroundColor: palette.bg }}
      >
        {/* Matisse Organic Shapes Background */}
        <div className="absolute top-[-50px] left-[-50px] w-64 h-64 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-80" 
             style={{ backgroundColor: palette.accent }} />
        <div className="absolute bottom-[-20px] right-[-40px] w-80 h-80 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-20" 
             style={{ backgroundColor: palette.text }} />
        <div className="absolute top-[40%] right-[-20px] w-32 h-32 rounded-full opacity-50" 
             style={{ backgroundColor: palette.bg, border: `20px solid ${palette.text}` }} />

        {/* Header - Artistic Layout */}
        <div className="relative z-10 px-6 pt-10">
           <div className="flex flex-col items-start">
             <span className={`${FONTS.vintage.title} text-7xl leading-[0.8] drop-shadow-sm`} style={{ color: palette.text }}>2025</span>
             <span className={`${FONTS.vintage.body} text-4xl italic ml-12 -mt-2`} style={{ color: palette.accent }}>MOST</span>
           </div>
        </div>

        {/* Image Area - Paper Cutout Feel */}
        <div className="relative z-10 flex-1 px-8 py-4 flex items-center justify-center">
            {/* Background shape for image */}
            <div className="absolute w-[90%] h-[95%] bg-black transform -rotate-2 rounded-[2rem_3rem_1rem_4rem]" style={{ backgroundColor: palette.text }} />
            
            <div className="w-full aspect-[4/5] relative overflow-hidden transform rotate-1 rounded-[3rem_1rem_4rem_2rem] border-4" style={{ borderColor: palette.bg, backgroundColor: palette.bg }}>
              {image ? (
                 <img src={image} alt="User" className={`w-full h-full object-cover ${objectPosClass}`} />
               ) : (
                 <div className="w-full h-full flex items-center justify-center opacity-40">IMG</div>
               )}
            </div>

            {/* Decoration as a "Stamp" or "Cutout" */}
            {decoration !== DecorationType.NONE && (
               /* Relocated to Top Right */
               <div className="absolute top-2 right-6 transform rotate-12 z-20">
                  {/* Fixed overlapping: Increased background size slightly relative to icon size, and reduced icon size */}
                  <div className="absolute inset-[-6px] -z-10 rounded-full" style={{ backgroundColor: palette.accent }}></div>
                  <Decoration type={decoration} theme={theme} color={palette.bg} className="w-10 h-10 drop-shadow-md" />
               </div>
            )}
        </div>

        {/* Text Area */}
        <div className="relative z-10 p-6 pb-12">
           <div className="bg-white/80 backdrop-blur-sm p-4 rounded-[2rem_1rem_2rem_1rem] shadow-sm" style={{ backgroundColor: `rgba(255,255,255,0.6)` }}>
              <h3 className={`${FONTS.vintage.artistic} text-3xl mb-1 flex items-center gap-2`} style={{ color: palette.text }}>
                 <span className="text-sm font-sans font-bold bg-black text-white px-2 rounded-full" style={{ backgroundColor: palette.accent }}>No.1</span>
                 年度{category || '____'}
              </h3>
              {/* Optimized Vintage Font: Switched to FONTS.vintage.artistic (Ma Shan Zheng) */}
              <p className={`${FONTS.vintage.artistic} text-2xl leading-tight tracking-wide font-normal`} style={{ color: '#000' }}>
                 {description || 'Artistic composition of the year.'}
              </p>
           </div>
        </div>
      </div>
    );
  }

  return null;
});

PreviewCanvas.displayName = 'PreviewCanvas';
export default PreviewCanvas;