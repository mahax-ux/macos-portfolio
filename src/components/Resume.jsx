import React from 'react';
import WindowWrapper from '../hoc/WindowWrapper';
import WindowControlls from './WindowControlls';
import { Download, ExternalLink, FileText } from 'lucide-react';

const Resume = ({ isMaximized }) => {
  // Path to your resume in the public folder
  const resumePdfPath = '/resume.pdf'; 

  return (
    <div
      className={`flex flex-col bg-[#2c2c2e] overflow-hidden rounded-xl shadow-2xl border border-gray-600/50 ${
        isMaximized ? 'w-full h-full' : 'w-[820px] max-w-[95vw] h-[640px] max-h-[88vh]'
      }`}
    >
      {/* macOS Preview Style Header */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2.5 bg-[#3a3a3c] border-b border-black/40 select-none shrink-0"
      >
        <div className="flex items-center gap-4">
          <WindowControlls target="resume" />
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-200">
            <FileText size={14} className="text-gray-400" />
            <span>Resume.pdf — Preview</span>
          </div>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-2">
          <a
            href={resumePdfPath}
            download="Resume.pdf"
            className="flex items-center gap-1.5 text-xs text-gray-200 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded transition-colors"
            title="Download PDF"
          >
            <Download size={13} />
            <span>Download</span>
          </a>
          <a
            href={resumePdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="Open in new tab"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* PDF Viewport */}
      <div className="flex-1 bg-[#1e1e1e] relative">
        <iframe
          src={`${resumePdfPath}#toolbar=0&navpanes=0`}
          title="Resume PDF"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;