import React from 'react';
import WindowWrapper from '../hoc/WindowWrapper';
import WindowControlls from './WindowControlls';
import useWindowStore from '../store/window';
import { FileText, Trash2 } from 'lucide-react';

const Trash = ({ isMaximized }) => {
  const { openWindow } = useWindowStore();

  const handleOpenFile = () => {
    openWindow('txtfile', {
      title: 'manifesto.txt',
      content: 'I don’t build trash, I build GOLD. 👑✨',
    });
  };

  return (
    <div
      className={`flex flex-col bg-[#fbfbfb] overflow-hidden rounded-xl shadow-2xl border border-gray-300 ${
        isMaximized ? 'w-full h-full' : 'w-[560px] max-w-[95vw] h-[360px] max-h-[80vh]'
      }`}
    >
      {/* Header Bar */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2.5 bg-[#ebebeb] border-b border-gray-300 select-none shrink-0"
      >
        <div className="flex items-center gap-4">
          <WindowControlls target="trash" />
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
            <Trash2 size={13} className="text-gray-500" />
            <span>Trash</span>
          </div>
        </div>
        <div className="text-[11px] text-gray-400 font-medium">1 item</div>
      </div>

      {/* Trash Body */}
      <div className="flex-1 p-6 bg-white flex items-start content-start flex-wrap gap-6 select-none">
        <div
          onDoubleClick={handleOpenFile}
          onClick={handleOpenFile}
          className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-blue-50/80 active:bg-blue-100 cursor-pointer w-24 text-center transition-colors group"
          title="Click to view file"
        >
          <div className="w-14 h-14 bg-amber-50 border border-amber-200/80 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <FileText size={28} className="text-amber-500" />
          </div>
          <span className="text-xs font-medium text-gray-800 break-words leading-tight line-clamp-2">
            manifesto.txt
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#f5f5f7] border-t border-gray-200 px-4 py-1.5 text-[11px] text-gray-400 select-none flex justify-between">
        <span>Trash — Read Only</span>
        <span>1 item, 42 bytes</span>
      </div>
    </div>
  );
};

const TrashWindow = WindowWrapper(Trash, 'trash');
export default TrashWindow;