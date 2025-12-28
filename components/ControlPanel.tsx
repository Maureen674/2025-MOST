import React from 'react';
import { AppState, ThemeType, DecorationType, PositionX, PositionY } from '../types';
import { Upload, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, Palette, Type, Sticker, Download, Ban } from 'lucide-react';
import { THEME_PALETTES } from '../constants';

interface Props {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  onExport: () => void;
}

const ControlPanel: React.FC<Props> = ({ state, setState, onExport }) => {
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updatePos = (axis: 'x' | 'y', val: string) => {
    setState(prev => ({
      ...prev,
      imagePosition: { ...prev.imagePosition, [axis]: val }
    }));
  };

  const currentPalettes = THEME_PALETTES[state.theme];

  return (
    <div className="w-full md:w-96 bg-slate-800 text-white p-6 overflow-y-auto h-full shadow-2xl z-20 flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-400">
          <LayoutGrid size={20} /> Style
        </h2>
        <div className="grid grid-cols-3 gap-2">
           {Object.values(ThemeType).map((t) => (
             <button
               key={t}
               onClick={() => setState(prev => ({ ...prev, theme: t, paletteIndex: 0 }))}
               className={`py-2 text-xs font-bold rounded border transition-all ${state.theme === t ? 'bg-cyan-500 border-cyan-400 text-black' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'}`}
             >
               {t}
             </button>
           ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-pink-400">
          <Palette size={20} /> Palette
        </h2>
        <div className="flex gap-3 flex-wrap">
           {currentPalettes.map((p, i) => (
             <button
               key={i}
               onClick={() => setState(prev => ({ ...prev, paletteIndex: i }))}
               className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${state.paletteIndex === i ? 'border-white scale-110' : 'border-transparent opacity-50'}`}
               style={{ backgroundColor: p.text }}
             >
               {state.paletteIndex === i && <div className="w-2 h-2 bg-white rounded-full shadow-sm" style={{ backgroundColor: p.bg }} />}
             </button>
           ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
          <Upload size={20} /> Content
        </h2>
        
        <div className="mb-4">
           <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Upload Image</label>
           <label className="flex items-center justify-center w-full h-12 border-2 border-dashed border-slate-600 rounded cursor-pointer hover:border-slate-400 transition-colors">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <span className="text-sm text-slate-400 flex items-center gap-2"><Upload size={14}/> Choose File</span>
           </label>
        </div>

        {/* Position Controls */}
        {state.image && (
          <div className="mb-6 p-3 bg-slate-900 rounded border border-slate-700">
            <span className="text-xs text-slate-500 uppercase block mb-2">Image Position</span>
            <div className="grid grid-cols-3 gap-1 w-24 mx-auto">
               <button onClick={() => { updatePos('y', 'top'); updatePos('x', 'left'); }} className={`p-1 rounded ${state.imagePosition.y === 'top' && state.imagePosition.x === 'left' ? 'bg-cyan-500 text-black' : 'bg-slate-700'}`}>↖</button>
               <button onClick={() => { updatePos('y', 'top'); updatePos('x', 'center'); }} className={`p-1 rounded ${state.imagePosition.y === 'top' && state.imagePosition.x === 'center' ? 'bg-cyan-500 text-black' : 'bg-slate-700'}`}><ChevronUp size={14} className="mx-auto"/></button>
               <button onClick={() => { updatePos('y', 'top'); updatePos('x', 'right'); }} className={`p-1 rounded ${state.imagePosition.y === 'top' && state.imagePosition.x === 'right' ? 'bg-cyan-500 text-black' : 'bg-slate-700'}`}>↗</button>
               
               <button onClick={() => { updatePos('y', 'center'); updatePos('x', 'left'); }} className={`p-1 rounded ${state.imagePosition.y === 'center' && state.imagePosition.x === 'left' ? 'bg-cyan-500 text-black' : 'bg-slate-700'}`}><ChevronLeft size={14} className="mx-auto"/></button>
               <button onClick={() => { updatePos('y', 'center'); updatePos('x', 'center'); }} className={`p-1 rounded ${state.imagePosition.y === 'center' && state.imagePosition.x === 'center' ? 'bg-cyan-500 text-black' : 'bg-slate-700'}`}>•</button>
               <button onClick={() => { updatePos('y', 'center'); updatePos('x', 'right'); }} className={`p-1 rounded ${state.imagePosition.y === 'center' && state.imagePosition.x === 'right' ? 'bg-cyan-500 text-black' : 'bg-slate-700'}`}><ChevronRight size={14} className="mx-auto"/></button>

               <button onClick={() => { updatePos('y', 'bottom'); updatePos('x', 'left'); }} className={`p-1 rounded ${state.imagePosition.y === 'bottom' && state.imagePosition.x === 'left' ? 'bg-cyan-500 text-black' : 'bg-slate-700'}`}>↙</button>
               <button onClick={() => { updatePos('y', 'bottom'); updatePos('x', 'center'); }} className={`p-1 rounded ${state.imagePosition.y === 'bottom' && state.imagePosition.x === 'center' ? 'bg-cyan-500 text-black' : 'bg-slate-700'}`}><ChevronDown size={14} className="mx-auto"/></button>
               <button onClick={() => { updatePos('y', 'bottom'); updatePos('x', 'right'); }} className={`p-1 rounded ${state.imagePosition.y === 'bottom' && state.imagePosition.x === 'right' ? 'bg-cyan-500 text-black' : 'bg-slate-700'}`}>↘</button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div>
             <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Yearly Category</label>
             <div className="flex items-center">
                <span className="bg-slate-700 px-2 py-2 rounded-l text-slate-300 text-sm border border-slate-600 border-r-0">年度</span>
                <input 
                  type="text" 
                  maxLength={8}
                  value={state.category}
                  onChange={(e) => setState(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="最佳剧集"
                  className="w-full bg-slate-900 border border-slate-600 rounded-r p-2 text-sm focus:outline-none focus:border-cyan-500 text-white"
                />
             </div>
          </div>
          
          <div>
             <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description (Max 50)</label>
             <textarea 
                maxLength={50}
                value={state.description}
                onChange={(e) => setState(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Why was it the best?"
                className="w-full h-20 bg-slate-900 border border-slate-600 rounded p-2 text-sm focus:outline-none focus:border-cyan-500 text-white resize-none"
             />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-400">
          <Sticker size={20} /> Decoration
        </h2>
        <div className="flex gap-2 flex-wrap">
           {Object.values(DecorationType).map((d) => (
             <button
               key={d}
               onClick={() => setState(prev => ({ ...prev, decoration: d }))}
               className={`min-w-[4rem] flex-1 py-2 rounded border text-xs font-bold transition-all flex items-center justify-center gap-1 ${state.decoration === d ? 'bg-green-500 border-green-400 text-black' : 'bg-slate-700 border-slate-600'}`}
             >
               {d === DecorationType.NONE && <Ban size={12}/>}
               {d === DecorationType.NONE ? 'NONE' : d}
             </button>
           ))}
        </div>
      </div>

      <div className="mt-auto pt-8">
        <button 
          onClick={onExport}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 rounded shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
           <Download size={24} /> Download PNG
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;