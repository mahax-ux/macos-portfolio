import React from "react";
import useWindowStore from "../store/window";

const WindowControlls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  return (
    <div className="flex items-center gap-2 relative z-[9999]">
      <button
        type="button"
        title="Close"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          closeWindow(target);
        }}
        className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:brightness-90 cursor-pointer border-none outline-none block p-0"
      />
      <button
        type="button"
        title="Minimize"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          minimizeWindow(target);
        }}
        className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:brightness-90 cursor-pointer border-none outline-none block p-0"
      />
      <button
        type="button"
        title="Maximize"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          maximizeWindow(target);
        }}
        className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:brightness-90 cursor-pointer border-none outline-none block p-0"
      />
    </div>
  );
};

export default WindowControlls;