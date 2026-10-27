import React, { useState } from 'react';
import WindowWrapper from '../hoc/WindowWrapper';
import WindowControlls from '../components/WindowControlls';
import { gallery } from '../constants';
import { ExternalLink, Image as ImageIcon, Upload, X } from 'lucide-react';

const Photos = ({ isMaximized }) => {
  const [photosList, setPhotosList] = useState(
    gallery.map((item) => ({
      id: item.id,
      src: item.img,
      title: item.title,
      link: item.link,
    }))
  );

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const newPhotoItem = {
          id: Date.now() + Math.random(),
          src: uploadEvent.target.result,
          title: file.name.split('.')[0],
          link: null,
        };
        setPhotosList((prev) => [newPhotoItem, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCardClick = (photo) => {
    if (photo.link) {
      window.open(photo.link, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedPhoto(photo);
    }
  };

  return (
    <div
      className={`flex flex-col bg-white overflow-hidden rounded-xl shadow-2xl border border-gray-200/90 ${
        isMaximized ? 'w-full h-full' : 'w-[720px] max-w-[95vw] h-[480px] max-h-[80vh]'
      }`}
    >
      {/* Header Bar */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2.5 bg-[#ebebeb] border-b border-gray-300/80 select-none shrink-0"
      >
        <div className="flex items-center gap-4">
          <WindowControlls target="photos" />
          <span className="text-xs font-semibold text-gray-700">Photos</span>
        </div>

        {/* Upload Button */}
        <label className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md cursor-pointer transition-colors shadow-sm">
          <Upload size={13} />
          <span>Upload</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Photos Viewport Body */}
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        <div className="flex items-center justify-between mb-4 select-none">
          <h2 className="text-base font-bold text-gray-800">Library</h2>
          <span className="text-xs text-gray-400 font-medium">{photosList.length} items</span>
        </div>

        {photosList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
            <ImageIcon className="text-gray-300 mb-2" size={36} />
            <p className="text-xs font-medium text-gray-500">No photos</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {photosList.map((photo) => (
              <div
                key={photo.id}
                onClick={() => handleCardClick(photo)}
                className="group relative aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                title={photo.link ? `Visit ${photo.title}` : photo.title}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/600x400/2563eb/ffffff?text=${encodeURIComponent(photo.title)}`;
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-between p-2.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium truncate pr-1">
                    {photo.title}
                  </p>
                  {photo.link && (
                    <span className="flex items-center gap-1 text-[10px] text-white/90 bg-white/20 backdrop-blur-sm px-1.5 py-0.5 rounded">
                      Visit <ExternalLink size={10} />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 select-none">
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors cursor-pointer"
            title="Close"
          >
            <X size={18} />
          </button>
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.title}
            className="max-h-[85%] max-w-[90%] rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

const PhotosWindow = WindowWrapper(Photos, 'photos');
export default PhotosWindow;