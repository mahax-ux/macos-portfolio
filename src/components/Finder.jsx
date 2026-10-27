import React, { useState, useMemo } from 'react';
import WindowWrapper from '../hoc/WindowWrapper';
import WindowControlls from './WindowControlls';
import useWindowStore from '../store/window';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  List, 
  Folder, 
  Clock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

const FINDER_ITEMS = [
  {
    id: 'safari',
    name: 'Safari',
    kind: 'Application',
    icon: '/images/safari.png',
    size: '142 MB',
    dateModified: 'Today, 10:45 AM',
    action: 'safari',
    category: 'Applications',
  },
  {
    id: 'photos',
    name: 'Photos',
    kind: 'Application',
    icon: '/images/photos.png',
    size: '98 MB',
    dateModified: 'Yesterday, 4:12 PM',
    action: 'photos',
    category: 'Applications',
  },
  {
    id: 'contact',
    name: 'Contacts',
    kind: 'Application',
    icon: '/images/contact.png',
    size: '24 MB',
    dateModified: 'Oct 24, 2026',
    action: 'contact',
    category: 'Applications',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    kind: 'Application',
    icon: '/images/terminal.png',
    size: '12 MB',
    dateModified: 'Oct 20, 2026',
    action: 'terminal',
    category: 'Applications',
  },
  {
    id: 'trash',
    name: 'Trash',
    kind: 'System Folder',
    icon: '/images/trash.png',
    size: '42 bytes',
    dateModified: 'Just now',
    action: 'trash',
    category: 'Favorites',
  },
  {
    id: 'manifesto',
    name: 'manifesto.txt',
    kind: 'Plain Text Document',
    icon: '/images/txt.png',
    size: '42 bytes',
    dateModified: 'Today, 2:15 PM',
    action: 'txtfile',
    fileData: {
      title: 'manifesto.txt',
      content: 'I don’t build trash, I build GOLD. 👑✨',
    },
    category: 'Recents',
  },
  {
    id: 'resume',
    name: 'Resume.pdf',
    kind: 'PDF Document',
    icon: '/images/pdf.png',
    size: '1.2 MB',
    dateModified: 'Oct 15, 2026',
    action: 'resume',
    category: 'Favorites',
  },
];

const Finder = ({ isMaximized }) => {
  const { openWindow } = useWindowStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter items by category tab and live search input
  const filteredItems = useMemo(() => {
    return FINDER_ITEMS.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kind.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleLaunch = (item) => {
    if (!item.action) return;
    openWindow(item.action, item.fileData || null);
  };

  return (
    <div
      className={`flex flex-col bg-[#fbfbfb] overflow-hidden rounded-xl shadow-2xl border border-gray-300 ${
        isMaximized ? 'w-full h-full' : 'w-[780px] max-w-[95vw] h-[480px] max-h-[85vh]'
      }`}
    >
      {/* Top macOS Control & Navigation Toolbar */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2.5 bg-[#ebebeb] border-b border-gray-300 select-none shrink-0"
      >
        <div className="flex items-center gap-4">
          <WindowControlls target="finder" />

          {/* History Chevrons */}
          <div className="flex items-center gap-0.5 text-gray-500">
            <button type="button" className="p-1 hover:bg-gray-200 rounded text-gray-400 cursor-not-allowed">
              <ChevronLeft size={16} />
            </button>
            <button type="button" className="p-1 hover:bg-gray-200 rounded text-gray-400 cursor-not-allowed">
              <ChevronRight size={16} />
            </button>
          </div>

          <span className="text-xs font-semibold text-gray-700">
            {selectedCategory === 'All' ? 'Recents & Applications' : selectedCategory}
          </span>
        </div>

        {/* View Mode & Search Input */}
        <div className="flex items-center gap-3">
          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-gray-200/80 p-0.5 rounded-md border border-gray-300/60">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
              title="Icon View"
            >
              <LayoutGrid size={13} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
              title="List View"
            >
              <List size={13} />
            </button>
          </div>

          {/* Spotlight Search Bar */}
          <div className="relative w-44 sm:w-56">
            <Search size={13} className="absolute left-2.5 top-2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps or files..."
              className="w-full pl-7 pr-3 py-1 text-xs bg-white/90 focus:bg-white border border-gray-300 rounded-md outline-none text-gray-700 shadow-inner transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-44 sm:w-48 bg-[#f5f5f7]/80 border-r border-gray-200 p-3 select-none flex flex-col gap-4 shrink-0">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">Favorites</span>
            <div className="mt-1 space-y-0.5 text-xs font-medium text-gray-700">
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                  selectedCategory === 'All' ? 'bg-blue-500 text-white font-semibold' : 'hover:bg-gray-200/60'
                }`}
              >
                <Sparkles size={14} />
                <span>All Items</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('Applications')}
                className={`w-full text-left px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                  selectedCategory === 'Applications' ? 'bg-blue-500 text-white font-semibold' : 'hover:bg-gray-200/60'
                }`}
              >
                <Folder size={14} />
                <span>Applications</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('Recents')}
                className={`w-full text-left px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                  selectedCategory === 'Recents' ? 'bg-blue-500 text-white font-semibold' : 'hover:bg-gray-200/60'
                }`}
              >
                <Clock size={14} />
                <span>Recents</span>
              </button>
            </div>
          </div>
        </div>

        {/* Viewport Content Area */}
        <div className="flex-1 bg-white overflow-y-auto p-4 select-none">
          {filteredItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-xs">
              <Search size={32} className="opacity-25 mb-2" />
              <span>No items matching "{searchQuery}"</span>
            </div>
          ) : viewMode === 'grid' ? (
            /* Icon Grid View */
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {filteredItems.map((item) => {
                const isSelected = selectedItem === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item.id)}
                    onDoubleClick={() => handleLaunch(item)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg text-center cursor-pointer transition-colors group ${
                      isSelected ? 'bg-blue-100/70 border border-blue-300' : 'hover:bg-gray-100'
                    }`}
                    title="Double-click to open"
                  >
                    <div className="w-14 h-14 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-12 h-12 object-contain drop-shadow"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {item.kind}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Table / List View */
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 text-[11px]">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Kind</th>
                  <th className="pb-2 font-medium">Date Modified</th>
                  <th className="pb-2 font-medium text-right">Size</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => {
                  const isSelected = selectedItem === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItem(item.id)}
                      onDoubleClick={() => handleLaunch(item)}
                      className={`cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        isSelected ? '!bg-blue-500 !text-white' : 'text-gray-700'
                      }`}
                    >
                      <td className="py-2 px-1 flex items-center gap-2 font-medium">
                        <img src={item.icon} alt={item.name} className="w-5 h-5 object-contain" />
                        <span className="truncate">{item.name}</span>
                      </td>
                      <td className={`py-2 px-1 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                        {item.kind}
                      </td>
                      <td className={`py-2 px-1 ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                        {item.dateModified}
                      </td>
                      <td className={`py-2 px-1 text-right ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                        {item.size}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="bg-[#f5f5f7] border-t border-gray-200 px-4 py-1.5 text-[11px] text-gray-400 select-none flex justify-between items-center">
        <span>{filteredItems.length} items</span>
        <span className="text-[10px] text-gray-500 flex items-center gap-1">
          <ExternalLink size={11} /> Double-click an item to open
        </span>
      </div>
    </div>
  );
};

const FinderWindow = WindowWrapper(Finder, 'finder');
export default FinderWindow;