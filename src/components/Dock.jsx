import React from 'react';
import useWindowStore from '../store/window';

const Dock = () => {
  const { openWindow } = useWindowStore();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-2xl flex gap-3 z-[9999]">
      {/* 1. Finder (Only at the start, fully functional) */}
      <button 
        onClick={() => openWindow('finder')} 
        className="w-12 h-12 hover:scale-110 transition-transform cursor-pointer"
        title="Finder"
      >
        <img src="/images/finder.png" alt="Finder" className="w-full h-full" />
      </button>

      {/* 2. Safari */}
      <button 
        onClick={() => openWindow('safari')} 
        className="w-12 h-12 hover:scale-110 transition-transform cursor-pointer"
        title="Safari"
      >
        <img src="/images/safari.png" alt="Safari" className="w-full h-full" />
      </button>

      {/* 3. Photos */}
      <button 
        onClick={() => openWindow('photos')} 
        className="w-12 h-12 hover:scale-110 transition-transform cursor-pointer"
        title="Photos"
      >
        <img src="/images/photos.png" alt="Photos" className="w-full h-full" />
      </button>

      {/* 4. Contacts */}
      <button 
        onClick={() => openWindow('contact')} 
        className="w-12 h-12 hover:scale-110 transition-transform cursor-pointer"
        title="Contacts"
      >
        <img src="/images/contact.png" alt="Contacts" className="w-full h-full" />
      </button>

      {/* 5. Terminal */}
      <button 
        onClick={() => openWindow('terminal')} 
        className="w-12 h-12 hover:scale-110 transition-transform cursor-pointer"
        title="Terminal"
      >
        <img src="/images/terminal.png" alt="Terminal" className="w-full h-full" />
      </button>

      {/* 6. Trash (At the end) */}
      <button 
        onClick={() => openWindow('trash')} 
        className="w-12 h-12 hover:scale-110 transition-transform cursor-pointer"
        title="Trash"
      >
        <img src="/images/trash.png" alt="Trash" className="w-full h-full" />
      </button>
    </div>
  );
};

export default Dock;