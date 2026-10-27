import React from 'react';
import Navbar from "../src/components/Navbar.jsx";
import Welcome from './components/Welcome.jsx';
import Dock from './components/Dock.jsx';
import Terminal from './windows/Terminal.jsx';
// Capitalized to follow React component naming conventions
import PhotosWindow from './windows/photos.jsx'; 
import SafariWindow from './windows/Safari.jsx';
import ContactWindow from './windows/Contact.jsx';
import TrashWindow from './components/Trash.jsx';
import TxtFileWindow from './components/TxtFile.jsx';
import FinderWindow from './components/Finder.jsx';
import ResumeWindow from './components/Resume.jsx';
import gsap from "gsap"
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      {/* Added the Photos window here */}
      <PhotosWindow />
      <SafariWindow />
      <ContactWindow />
      <TrashWindow/>
      <TxtFileWindow />
      <FinderWindow />
      <ResumeWindow />
    </main>
  );
};

export default App;