import React from 'react';
import WindowWrapper from '../hoc/WindowWrapper';
import { techStack } from '../constants';
import { Check, Flag } from 'lucide-react';
import WindowControlls from '../components/WindowControlls';

const Terminal = ({ isMaximized }) => {
  return (
    <div className={`flex flex-col bg-white overflow-hidden transition-all duration-300 ${isMaximized ? 'h-full' : ''}`}>
      <div id="window-header" className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 select-none">
        <WindowControlls target="terminal" />
        <h2 className="font-bold text-sm text-gray-500 flex-1 text-center -ml-12">Tech Stack</h2>
        <div className="w-12" />
      </div>

      <div className={`techstack overflow-y-auto ${isMaximized ? 'flex-1 p-8' : 'p-5'}`}>
        <p>
          <span className="font-bold">@mahant % </span>
          show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? ',' : ''}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote mt-4">
          <p>
            <Check size={20} /> 5 stacks loaded successfully (100%)
          </p>
          <p className="text-black">
            <Flag size={15} fill="black" />
            Render time : 6ms
          </p>
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal');
export default TerminalWindow;