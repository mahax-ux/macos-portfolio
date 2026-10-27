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

    // Draggable setup
    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const handle = el.querySelector('#window-header') || el;
      const isMobile = window.innerWidth < 640;

      if (!isMobile) {
        draggableInstance.current = Draggable.create(el, {
          type: 'x,y',
          trigger: handle,
          zIndexBoost: false,
          bounds: 'body',
          edgeResistance: 0.65,
          onPress: () => focusWindow(windowKey),
        })[0];
      }

      return () => {
        if (draggableInstance.current) {
          draggableInstance.current.kill();
        }
      };
    }, [windowKey, focusWindow]);

    // Handle Maximized State - Fully clear GSAP transforms
    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      if (isMaximized) {
        if (draggableInstance.current) {
          draggableInstance.current.disable();
        }
        // Wipe away all drag/centering transforms that push the window up
        gsap.set(el, { x: 0, y: 0, clearProps: 'transform' });
      } else {
        if (draggableInstance.current) {
          draggableInstance.current.enable();
        }
      }
    }, [isMaximized]);

    // Open / Close / Minimize animation
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      gsap.killTweensOf(el);

      if (!isOpen) {
        gsap.to(el, {
          scale: 0.3,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          pointerEvents: 'none',
          onComplete: () => gsap.set(el, { autoAlpha: 0 }),
        });
        return;
      }

      if (isMinimized) {
        gsap.to(el, {
          scale: 0.25,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          pointerEvents: 'none',
          onComplete: () => gsap.set(el, { autoAlpha: 0 }),
        });
      } else {
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(
          el,
          { scale: 0.85, opacity: 0, pointerEvents: 'none' },
          { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.15)', pointerEvents: 'auto' }
        );
      }
    }, [isOpen, isMinimized]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          visibility: isOpen && !isMinimized ? 'visible' : 'hidden',
          opacity: isOpen && !isMinimized ? 1 : 0,
        }}
        className={`fixed will-change-transform select-none ${
          isMaximized
            ? '!top-8 !left-0 !w-screen !h-[calc(100vh-2rem)] !transform-none !m-0 !p-0'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[96vw]'
        }`}
        onMouseDown={() => focusWindow(windowKey)}
        onTouchStart={() => focusWindow(windowKey)}
      >
        <Component {...props} isMaximized={isMaximized} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
};

export default WindowWrapper;