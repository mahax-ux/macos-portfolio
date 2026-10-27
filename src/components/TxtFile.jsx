import React from 'react';
import WindowWrapper from '../hoc/WindowWrapper';
import WindowControlls from './WindowControlls';
import useWindowStore from '../store/window';

const TxtFile = ({ isMaximized }) => {
  const { windows } = useWindowStore();
  const fileData = windows?.txtfile?.data;

  const title = fileData?.title || 'manifesto.txt';
  const content = fileData?.content || 'I don’t build trash, I build GOLD. 👑✨';

  return (
    <div
      className={`flex flex-col bg-white overflow-hidden rounded-xl shadow-2xl border border-gray-300 ${
        isMaximized ? 'w-full h-full' : 'w-[480px] max-w-[90vw] h-[260px] max-h-[70vh]'
      }`}
    >
      {/* Window Header */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2.5 bg-[#f0f0f0] border-b border-gray-300 select-none shrink-0"
      >
        <div className="flex items-center gap-4">
          <WindowControlls target="txtfile" />
          <span className="text-xs font-semibold text-gray-700">{title}</span>
        </div>
      </div>

      {/* Golden Manifesto Note */}
      <div className="flex-1 p-6 font-mono font-bold bg-white text-gray-900 select-text flex items-center justify-center text-center">
        <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent text-xl sm:text-2xl drop-shadow-sm leading-relaxed">
          {content}
        </span>
      </div>
    </div>
  );
};

const TxtFileWindow = WindowWrapper(TxtFile, 'txtfile');
export default TxtFileWindow;