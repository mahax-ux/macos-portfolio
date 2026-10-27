import React, { useRef, useLayoutEffect, useEffect } from 'react';
import useWindowStore from '../store/window';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const ref = useRef(null);
    const draggableInstance = useRef(null);
    const { focusWindow, windows } = useWindowStore();
    const windowState = windows?.[windowKey];

    const isOpen = Boolean(windowState?.isOpen);
    const isMinimized = Boolean(windowState?.isMinimized);
    const isMaximized = Boolean(windowState?.isMaximized);
    const zIndex = windowState?.zIndex ?? 10;

    // Initialize Draggable once mounted
    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const handle = el.querySelector('#window-header') || el;

      draggableInstance.current = Draggable.create(el, {
        type: 'x,y',
        trigger: handle,
        zIndexBoost: false,
        onPress: () => focusWindow(windowKey),
      })[0];

      return () => {
        if (draggableInstance.current) {
          draggableInstance.current.kill();
        }
      };
    }, [windowKey, focusWindow]);

    // Handle Maximized state with Draggable
    useEffect(() => {
      if (!draggableInstance.current) return;
      if (isMaximized) {
        draggableInstance.current.disable();
        gsap.set(ref.current, { clearProps: 'x,y' });
      } else {
        draggableInstance.current.enable();
      }
    }, [isMaximized]);

    // GSAP Open, Close, and Minimize transitions
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      gsap.killTweensOf(el);

      if (!isOpen) {
        gsap.to(el, {
          scale: 0.3,
          y: 300,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          pointerEvents: 'none',
          onComplete: () => {
            gsap.set(el, { autoAlpha: 0 });
          },
        });
        return;
      }

      if (isMinimized) {
        gsap.to(el, {
          scale: 0.3,
          y: 400,
          opacity: 0,
          duration: 0.22,
          ease: 'power2.in',
          pointerEvents: 'none',
          onComplete: () => {
            gsap.set(el, { autoAlpha: 0 });
          },
        });
      } else {
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(
          el,
          {
            scale: 0.8,
            y: 40,
            opacity: 0,
            pointerEvents: 'none',
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.28,
            ease: 'back.out(1.2)',
            pointerEvents: 'auto',
          }
        );
      }
    }, [isOpen, isMinimized]);

    const maximizeStyles = isMaximized
      ? {
          position: 'fixed',
          top: '32px',
          left: 0,
          width: '100vw',
          height: 'calc(100vh - 32px)',
          maxWidth: '100vw',
          maxHeight: 'calc(100vh - 32px)',
          borderRadius: 0,
          zIndex: 99999,
          transform: 'none',
        }
      : {};

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          visibility: isOpen && !isMinimized ? 'visible' : 'hidden',
          opacity: isOpen && !isMinimized ? 1 : 0,
          ...maximizeStyles,
        }}
        className={`fixed top-1/2 left-1/2 origin-center will-change-transform transform-gpu select-none ${
          isMaximized
            ? '!top-8 !left-0 !w-screen !h-[calc(100vh-2rem)]'
            : '-translate-x-1/2 -translate-y-1/2'
        }`}
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} isMaximized={isMaximized} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
};

export default WindowWrapper;