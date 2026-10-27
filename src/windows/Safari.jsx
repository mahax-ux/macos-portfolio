import React, { useState } from 'react';
import WindowWrapper from '../hoc/WindowWrapper';
import WindowControlls from '../components/WindowControlls';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Lock, 
  Search, 
  Mic, 
  Share, 
  Plus, 
  Copy 
} from 'lucide-react';

const Safari = ({ isMaximized }) => {
  const [url, setUrl] = useState('https://www.google.com');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setIsSearching(true);
    setUrl(`https://www.google.com/search?q=${encodeURIComponent(searchInput)}`);
  };

  const handleResetHome = () => {
    setUrl('https://www.google.com');
    setSearchInput('');
    setIsSearching(false);
  };

  return (
    <div
      className={`flex flex-col bg-white overflow-hidden rounded-xl shadow-2xl border border-gray-200/90 ${
        isMaximized ? 'w-full h-full' : 'w-[680px] max-w-[95vw] h-[480px] max-h-[80vh]'
      }`}
    >
      {/* Safari Window Header & Navigation */}
      <div id="window-header" className="flex flex-col bg-[#ebebeb] border-b border-gray-300/80 select-none shrink-0">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 gap-4">
          <div className="flex items-center gap-4">
            <WindowControlls target="safari" />

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1 text-gray-500">
              <button 
                type="button" 
                onClick={handleResetHome}
                className="p-1 hover:bg-gray-200 rounded text-gray-600 transition-colors"
                title="Back to Google Home"
              >
                <ArrowLeft size={15} />
              </button>
              <button 
                type="button" 
                disabled 
                className="p-1 opacity-30 text-gray-400 cursor-not-allowed"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Central URL & Search Field */}
          <div className="flex-1 max-w-md mx-auto">
            <div className="flex items-center gap-2 bg-white/80 hover:bg-white focus-within:bg-white border border-gray-300 rounded-lg px-3 py-1 shadow-inner text-xs transition-colors">
              <Lock size={12} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-700 text-center font-medium"
                placeholder="Search or enter website name"
              />
              <button type="button" onClick={handleResetHome} title="Reload">
                <RotateCw size={12} className="text-gray-400 hover:text-gray-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 text-gray-600">
            <button type="button" className="p-1 hover:bg-gray-200 rounded transition-colors" title="Share">
              <Share size={14} />
            </button>
            <button type="button" className="p-1 hover:bg-gray-200 rounded transition-colors" title="New Tab">
              <Plus size={15} />
            </button>
            <button type="button" className="p-1 hover:bg-gray-200 rounded transition-colors" title="Tabs Overview">
              <Copy size={13} />
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center px-4 bg-[#dedede] text-xs pt-1 border-t border-gray-300/50">
          <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-t-md border-t border-x border-gray-300 font-medium text-gray-700 shadow-sm">
            <img src="/images/safari.png" alt="icon" className="w-3.5 h-3.5 object-contain" onError={(e) => e.target.style.display = 'none'} />
            <span>{isSearching ? `${searchInput} - Google Search` : 'Google'}</span>
          </div>
        </div>
      </div>

      {/* Safari Viewport Body */}
      <div className="flex-1 overflow-y-auto bg-white flex flex-col justify-between">
        {!isSearching ? (
          <div className="flex flex-col items-center justify-center flex-1 px-4 py-8">
            {/* Google Logo */}
            <div className="mb-7 select-none">
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </h1>
            </div>

            {/* Google Search Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-xl">
              <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-gray-200 hover:border-gray-300 focus-within:border-transparent hover:shadow-md focus-within:shadow-md transition-all bg-white">
                <Search size={18} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search Google or type a URL"
                  className="w-full bg-transparent outline-none text-sm text-gray-800"
                  autoFocus
                />
                <button type="button" className="text-gray-500 hover:text-gray-700" title="Search by voice">
                  <Mic size={18} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 mt-6 select-none">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-xs font-medium text-gray-800 border border-gray-200 rounded-md transition-colors"
                >
                  Google Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("I'm Feeling Lucky");
                    setIsSearching(true);
                  }}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-xs font-medium text-gray-800 border border-gray-200 rounded-md transition-colors"
                >
                  I'm Feeling Lucky
                </button>
              </div>
            </form>

            {/* Google Language Offer */}
            <p className="text-xs text-gray-600 mt-7 select-none">
              Google offered in:{' '}
              <span className="text-blue-800 hover:underline cursor-pointer">हिन्दी</span>{' '}
              <span className="text-blue-800 hover:underline cursor-pointer">ಕನ್ನಡ</span>{' '}
              <span className="text-blue-800 hover:underline cursor-pointer">मराठी</span>
            </p>
          </div>
        ) : (
          <div className="flex-1 p-6 max-w-2xl">
            <div className="text-xs text-gray-500 mb-4 select-none">
              About 1,480,000,000 results (0.34 seconds)
            </div>

            {/* Result Item 1 */}
            <div className="mb-6">
              <p className="text-xs text-gray-600 truncate">{url}</p>
              <h3 
                className="text-base text-blue-800 hover:underline cursor-pointer font-medium"
                onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(searchInput)}`, '_blank')}
              >
                {searchInput} - Open in full browser
              </h3>
              <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                Explore search results, live queries, documentation, and external resources for "{searchInput}". Click this link to open the search directly on Google.
              </p>
            </div>

            {/* Result Item 2 */}
            <div className="mb-6">
              <p className="text-xs text-gray-600 truncate">https://github.com/topics/{searchInput.toLowerCase().replace(/\s+/g, '-')}</p>
              <h3 className="text-base text-blue-800 hover:underline cursor-pointer font-medium">
                Related Repositories & Tools on GitHub
              </h3>
              <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                Discover related open-source projects, developer tools, libraries, and discussions connected to {searchInput}.
              </p>
            </div>
          </div>
        )}

        {/* Google Footer */}
        <div className="bg-[#f2f2f2] border-t border-gray-200 select-none text-[11px] text-gray-500">
          <div className="px-5 py-2 border-b border-gray-300/60">India</div>
          <div className="flex flex-wrap justify-between px-5 py-2">
            <div className="flex gap-4">
              <span className="hover:underline cursor-pointer">About</span>
              <span className="hover:underline cursor-pointer">Advertising</span>
              <span className="hover:underline cursor-pointer">Business</span>
            </div>
            <div className="flex gap-4">
              <span className="hover:underline cursor-pointer">Privacy</span>
              <span className="hover:underline cursor-pointer">Terms</span>
              <span className="hover:underline cursor-pointer">Settings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, 'safari');
export default SafariWindow;